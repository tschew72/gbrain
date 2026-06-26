---
type: 'decision'
domain: 'ai-security'
status: 'resolved'
created: 2026-06-27
triggered_by: 'Vince "Fix it" in'
related:
  - 'memory/MEMORY.md "propose_takes 2049 STILL recurred 3 nights"'
  - 'memory/HEARTBEAT.md 2026-06-27 entry'
  - 'decision/2026-06-25-gbrain-propose-takes-2049-third-plane-endpoint'
title: 'propose_takes 2049 — DEEPER FIX — autopilot call path uses loadConfig() not loadConfigWithEngine'
---

# propose_takes 2049 — DEEPER FIX — autopilot call path uses loadConfig() not loadConfigWithEngine

## Symptom
For 3 nights in a row (Jun 24, 25, 26) the gbrain dream summary in #agents flagged
`propose_takes: [chat(minimax:MiniMax-M3)] invalid api key (2049)` on 16-17 pages per run.
The 2026-06-25 fix that put `provider_base_urls.minimax = https://api.minimax.io/v1` in the DB
appeared to verify clean (CLI `gbrain dream` showed 0 failures), but the nightly cron dream
kept 2049'ing — and every subsequent autopilot-cycle run also failed.

## Root cause
**4th config dimension — call-path plane.** `core/cycle.ts:873` calls `loadConfig()`,
which is file+env only. The autopilot-cycle handler (`src/commands/jobs.ts:1622`) inherits
this. So all worker-spawned cycles (autopilot cron, minions queue, `gbrain jobs work`)
**never see DB-plane keys** including `provider_base_urls`. They fall back to the recipe
default `api.minimaxi.com/v1` and get 2049.

The CLI `gbrain dream` path uses `loadConfigWithEngine` (file + DB merge), so the
2026-06-25 DB-only fix was effective there but invisible to workers.

## Why the Jun 25 verification missed it
I ran `gbrain dream` directly to verify the fix. That's the CLI path = `loadConfigWithEngine`
= sees DB. The cron dream and all worker-spawned cycles use `core/cycle.ts:873` which
calls `loadConfig()` (file-only). I never tested the worker path end-to-end.

## Fix applied (2026-06-27 06:13 SGT)

1. `~/.gbrain/config.json` — added file-plane entry:
   ```json
   "provider_base_urls": {
     "minimax": "https://api.minimax.io/v1"
   }
   ```
2. Fixed file-plane drift: `models.tier.subagent` was `anthropic:claude-sonnet-4-6` →
   `minimax:MiniMax-M3` (DB had it right; file had drifted back somehow).
3. Fixed DB-plane drift: `chat_model` was `anthropic:claude-sonnet-4-6` →
   `minimax:MiniMax-M3` (`gbrain config set chat_model minimax:MiniMax-M3`).
4. `pm2 restart gbrain-jobs-supervisor` to clear in-memory gateway config cache.

## Verification

**Direct CLI dream after fix:**
- `propose_takes: ✓ scanned 30 pages, 11 cached, 0 new proposals (run propose-20260626221700-0c6873f7)`
- No 2049 errors in any phase output
- Exit 0, cycle 86s (above 30s worker force-evict deadline but didn't get evicted — fluke)

**Autopilot cron log after fix:**
- Subsequent `[cycle.propose_takes] start` / `done` pairs: zero 2049 mentions
- Worker PID 2971393 (started 06:00 SGT, pre-fix) re-reads `loadConfig()` per cycle so
  picks up new file config on next cycle call

## Durable rule (extends existing 3-plane rule to 4 dimensions)

GBrain config has FOUR dimensions that must agree:

1. **File plane** — `~/.gbrain/config.json`. Read by `loadConfig()` (file+env only).
2. **DB plane** — Postgres `config` table. Read by `loadConfigWithEngine` (file+DB+env).
3. **Endpoint plane** — recipe `base_url_default` vs. `provider_base_urls`. Must match
   the credential's intended host.
4. **Call-path plane** — CLI (`loadConfigWithEngine`, sees DB) vs. worker
   (`loadConfig()`, file-only, NEVER sees DB).

**Action rule:** Any config key that needs to affect worker-spawned cycles (autopilot
cron, minions queue, `gbrain jobs work`) must be set in the **FILE plane**. DB-plane-only
fixes will silently no-op for workers. For runtime-tunable knobs (`models.tier.*`, search
flags) DB is fine; for keys that change behavior on every cycle (`provider_base_urls`,
`chat_model`, `embedding_model`, `expansion_model`) prefer file plane.

## Open follow-up (not blocking)

`src/core/cycle.ts:873` should probably use `loadConfigWithEngine` (or at least a DB-fallback
for `provider_base_urls`) so DB-plane-only config actually reaches workers. Currently it's a
hidden trap: any operator who fixes something via `gbrain config set …` expects it to apply
everywhere; in practice it only applies to CLI invocations.

Possible code fix:
```typescript
// In core/cycle.ts runCycle(), replace:
//   const cfg = loadConfig();
// With:
const cfg = await loadConfigWithEngine(engine, loadConfig()) ?? loadConfig();
```

This is a small change but it touches a hot path; flagging for next refactor window, not
today.

## Files touched
- `~/.gbrain/config.json` — added `provider_base_urls`, fixed `models.tier.subagent`
- DB `config` table — `chat_model` re-set to `minimax:MiniMax-M3`
- `~/.openclaw/workspace/MEMORY.md` — extended 3-plane rule with call-path dimension
- `~/.openclaw/workspace/HEARTBEAT.md` — 2026-06-27 entry
- PM2 `gbrain-jobs-supervisor` restarted (PID 3010370, online)