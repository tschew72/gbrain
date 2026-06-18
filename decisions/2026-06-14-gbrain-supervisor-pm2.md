---
type: decision
title: 2026 06 14 Gbrain Supervisor Pm2
date: '2026-06-14T00:00:00.000Z'
vince: general
status: shipped
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-14T03:16:31.778Z'
source_kind: 'mcp:put_page'
tags:
  - gbrain
  - lesson
  - ops
  - pm2
  - supervisor
---

# 2026-06-14: gbrain jobs supervisor → PM2

## Context

Vince noticed memory_search was feeling slow in Discord replies. Doctor check on the
gbrain instance returned `unhealthy 55/100` with a `wedged_queue` failure — the
`gbrain jobs supervisor` daemon was alive but had not claimed work for **28 minutes**.

## Root cause

`gbrain jobs supervisor` is the long-running worker process that drains the
`default` queue (sync / embed / lint / autopilot-cycle jobs). It had no autostart
mechanism — not in PM2, not in systemd, not in cron. It died sometime before
08:35 SGT, nobody restarted it, and the queue just sat.

This was likely the second time this has caused user-visible pain — previous
"memory_search slow" complaints in HEARTBEAT probably had the same root cause
and we never dug deep enough.

## Fix (shipped 2026-06-14 11:13 SGT)

Added PM2 fork service `gbrain-jobs-supervisor` (id 16) with **explicit
`--interpreter bun`**. `pm2 save` done, persists across reboot.

```bash
pm2 start /root/.bun/bin/gbrain.real \
  --name gbrain-jobs-supervisor \
  --interpreter bun \
  --cwd /root \
  --output /root/.gbrain/supervisor.out.log \
  --error /root/.gbrain/supervisor.err.log \
  --merge-logs --time \
  -- jobs supervisor start
```

## Lessons (2026-06-14)

### L1: PM2 default `node` breaks gbrain

`gbrain.real` is a TypeScript file with shebang `#!/usr/bin/env bun`. PM2's
default fork-mode interpreter is `node` and it does NOT respect the shebang.
Node 22's strip-only TypeScript mode rejects `public code: ErrorCode`
parameter properties in `/root/gbrain/src/core/operations.ts:77` with
`ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`.

Symptom: PM2 process restarts 5+ times in seconds, exits code 1, log full of
"TypeScript parameter property is not supported in strip-only mode" stack
traces.

**Rule:** always pass `--interpreter bun` when running gbrain under PM2.

### L2: gbrain wrapper has 10-min watchdog

`/root/.bun/bin/gbrain` is a serializing bash wrapper (`gbrain-lock-wrapper.sh`)
with `OPERATION_TIMEOUT=600`. It's designed for **one-shot** operations
(doctor, pages list, capture). The supervisor is a long-running daemon and
must be invoked via `gbrain.real` directly, not through the wrapper.

If you ever see "Watchdog: gbrain.real PID N hung (>600s) — killing" + "ERROR:
gbrain lock timeout after 600s" in `/root/.gbrain/supervisor.log`, that's the
wrapper killing your supervisor. Run via `gbrain.real` directly, or use PM2
with the command above.

## Verification

- supervisor PID 3236981, worker 3237005, online in PM2
- doctor re-check: `wedged_queue: ok`, `queue_health: ok`, `ops: 100/100`, `health_score: 75` (was 55)
- `pm2 list` shows 0 restarts after 30+ minutes
- 3 previously-wedged jobs (sync #422–#424) are now completing

## Runbook

If `gbrain doctor` ever reports `wedged_queue: fail` again:

```bash
pm2 restart gbrain-jobs-supervisor
pm2 logs gbrain-jobs-supervisor --lines 30 --nostream
```

If that doesn't work:

```bash
pm2 delete gbrain-jobs-supervisor
rm -f /root/.gbrain/supervisor.pid
# Re-run the pm2 start command above
pm2 save
```

## Related

- HEARTBEAT.md entry: "✅ gbrain Supervisor → PM2 — 2026-06-14 11:13 SGT"
- MEMORY.md entries: "PM2 + gbrain = `--interpreter bun`" + "gbrain supervisor needs PM2"
- AGENTS.md entry: meta-question exception to Memory-First (same conversation)
