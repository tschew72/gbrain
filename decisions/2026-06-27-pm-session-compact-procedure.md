---
type: note
title: 'Session compaction procedure (Pat #project-management, 2026-06-27)'
captured_at: '2026-06-27T04:47:13.048Z'
captured_via: capture-cli
ingested_via: put_page
ingested_at: '2026-06-27T04:47:17.150Z'
source_kind: put_page
---

# Session compaction procedure (Pat #project-management, 2026-06-27)

**When:** 2026-06-27 12:43 SGT (compact) → 12:45 SGT (hard reset)
**Trigger:** Vince said "Context too large in <#1514753100630593687>. Please compact"
**Agent:** Pat (`pm`)
**Channel:** #project-management (id 1514753100630593687)

## Problem
- Session `agent:pm:discord:channel:1514753100630593687` (id d99ff87c…) at **184k/200k tokens (92%)**
- Triggered when bootstrap files + tool results pushed the session past the context budget
- Status check: `openclaw status` → `agent:pm:discord:c … 184k/200k (92%) · 🗄️ 100% cached`
- Vince's "What is status of sgebiz" attempts were erroring out (screenshot captured at 12:44)

## First attempt: `--max-lines 50` compact
- Ran `openclaw sessions compact "agent:pm:discord:channel:1514753100630593687" --agent pm --max-lines 50`
- Result: `{ok:true, compacted:true, kept:50, archived: "<path>"}`
- Transcript went from 288 lines / 949 KB → 50 lines / 225 KB
- **BUT: still errored** on next message ("Context too large and auto-compaction could not recover")

### Why compact alone wasn't enough
- 50-line transcript was ~57k tokens (raw JSON chars / 4)
- Add pm bootstrap files (~30k) + system prompt + tool definitions (~50k) = ~137k tokens
- Apparently still tripped the threshold on the model side, or had cached values from before
- The compact RPC returned ok but didn't propagate cleanly to runtime context

## Second attempt: hard reset (delete transcript)
- `rm /root/.openclaw/agents/pm/sessions/d99ff87c-…jsonl`
- Kept `.bak.2026-06-27T04-43-18.600Z` from the compact as recovery
- Next inbound to the channel spawns a fully fresh session: 0 transcript + ~30k bootstrap = ~15% of budget
- **This is the fix** — confirmed in #general

## Procedure (corrected order)

### When to use which
- **`openclaw sessions compact --max-lines N`** (truncate-to-tail): rarely enough on its own;
  leaves transcript bytes that still count toward context. Use only when you're sure the
  remaining transcript is small (<10k tokens).
- **`openclaw sessions compact` (LLM summarize, no `--max-lines`)**: produces a digest of
  older context; slower, costs tokens; smarter but still leaves transcript bytes.
- **Hard reset (delete transcript)**: the **most reliable** fix. Use this when:
  - The agent has been failing repeatedly with context errors
  - You don't care about preserving old context (it's a chat, not a long-running state)
  - You want predictable, guaranteed-fresh state

### Canonical hard-reset recipe
```bash
SESSION_ID="<from `openclaw sessions`>"
DIR="/root/.openclaw/agents/<agent>/sessions"
# 1. Backup before delete
cp "${DIR}/${SESSION_ID}.jsonl" "${DIR}/${SESSION_ID}.jsonl.bak-hardreset-$(date -u +%Y%m%d-%H%M%S)"
# 2. Delete live transcript (sidecars are optional — clean them if you want a total reset)
rm "${DIR}/${SESSION_ID}.jsonl"
# 3. Verify
openclaw sessions --agent <agent> --limit 3
# 4. Don't post anything to the channel — wait for the user's next inbound to test
```

### Recovery
- Archive files at `.bak-reset-…`, `.bak.2026-…`, `.bak-hardreset-…` are kept on disk
- Restoring = `cp <backup> <live>`
- Index (`sessions.json`) updates lazily on next session touch

## Related: prior procedure capture
- See `decisions/2026-06-27-pm-session-reset-procedure` — original reset flow + the
  `channel` vs `target` gotcha for `message send`.

## Files / commands reference
- Compact CLI: `openclaw sessions compact` (gateway RPC backed)
- Hard reset: filesystem delete of `<sessionId>.jsonl`
- Status: `openclaw status`, `openclaw sessions --agent <id>`
- Session files: `/root/.openclaw/agents/<agent>/sessions/<sessionId>.jsonl`
- Index: `sessions.json` (auto-refreshed on session touch — may show stale tokens after delete)
