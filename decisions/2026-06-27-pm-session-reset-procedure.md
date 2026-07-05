---
type: note
title: 'Pat session reset on #project-management'
captured_at: '2026-06-27T04:34:09.441Z'
captured_via: capture-cli
ingested_via: put_page
ingested_at: '2026-06-27T04:34:14.753Z'
source_kind: put_page
---

# Pat session reset on #project-management

**When:** 2026-06-27 12:32 SGT
**Trigger:** Vince said "Reset <#1514753100630593687>" in #general
**Agent:** Pat (`pm`)
**Channel:** #project-management (id 1514753100630593687)

## Procedure (now the canonical pattern)
1. Identify active session key: `sessions_list agentId=pm search=project-management`
2. Confirm sessionId is the right one (check status=done, runtimeMs recent, totalTokens non-zero)
3. Backup ALL sidecars before deletion:
   - `{sessionId}.jsonl` (main transcript)
   - `{sessionId}.jsonl.codex-app-server.json` (codex harness state)
   - `{sessionId}.trajectory.jsonl` (post-run trajectory)
   - `{sessionId}.trajectory-path.json` (trajectory metadata)
   Backup pattern: `.bak-reset-YYYYMMDD-HHMMSS` suffix
4. Delete the live files (NOT the .bak files)
5. Post status notice in the reset channel (use `target: channel:{id}`, not `channel`)
6. Next inbound message → fresh session on current model chain

## Context on this reset
- Session had 288 lines / 949KB / 184k tokens — heavy bloat from long-running cron work + daily chase passes
- New model chain (just applied 2026-06-27 09:00 SGT): primary per agent, fallbacks uniform `sonnet-4-6 → M3`
- Active cron jobs (Daily Commercial Tracker, Daily PMO Status, PMO Chase Pass) intentionally NOT reset — only the chat session was cleared

## Gotcha:  action send target
- `channel` param = SOURCE channel (defaults to current session's channel = #general for Max)
- `target` param = DESTINATION — must be prefixed `channel:` for Discord
- Got bitten by this once — first reset notice went to #general instead of #project-management
