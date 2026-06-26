---
type: 'decision'
title: 'M365 Teams Chat Polling Fix — Graph $filter Limitation + Priority Chats'
date: '2026-06-16T00:00:00.000Z'
status: 'shipped'
sources:
  - 'm365-30min:2026-06-16T0950'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-16T01:51:49.843Z'
source_kind: 'mcp:put_page'
created: '2026-06-16T00:00:00.000Z'
---

# M365 Teams Chat Polling Fix — 2026-06-16 09:50 SGT

## Trigger
Vince asked in #vince-digest: "did you saw the message from kailash this morning" then shared a specific Teams chat URL. Direct Graph query showed Kailash posted at 08:47 SGT — but the 09:04 SGT cron run reported `chat_msgs_new: 0`. Two pre-existing bugs, both dating to the 2026-06-15 20:15 SGT ship of the Teams polling fix.

## Root cause #1 — Graph API doesn't support $filter on createdDateTime
`/chats/{id}/messages` endpoint returns **HTTP 400** for any `$filter` on `createdDateTime` — `"The entity property 'createdDateTime' and operationKind 'GreaterThan' is not allowed in $filter query"`. The script had been trying to filter at the API level. The 2026-06-15 20:15 "Teams fix shipped" HEARTBEAT entry tested with `0 new msgs` and didn't catch this — the 0 was a silent failure, not an empty result.

## Root cause #2 — Chat polling budget + stale lastUpdatedDateTime
- 1 worker / 120s budget for 1,710 chats
- Active-chats filter (`lastUpdatedDateTime > now - 30min`) was also dropping chats with stale `lastUpdatedDateTime` (the Kailash chat was 3 days stale even with a fresh message this morning)

## Fixes (all in `/root/scripts/m365-teams-delta.py`)

1. **Drop `$filter` from URL**, fetch `$orderby=createdDateTime desc&$top=50`, filter client-side by `chat_last_seen` state. Each poll returns 50 most recent; client filters to new ones.
2. **Chat budget 120s → 240s** (cron timeout 1800s, last run 368s — plenty of headroom).
3. **Priority chats config** at `/root/.outlook-mcp/teams-priority-chats.json` — JSON list of `{id, label, reason}`. Priority chats **bypass the active-chats filter** AND get polled first. Seeded with the Kailash sales/project tracking chat `19:9027b777de3b4daa923522978b9071fd@thread.v2`.
4. **Surface poll failures in stats**: `chat_polls_failed` count + `chat_poll_failures[]` array in the JSON output + a CRITICAL stderr line. Future cron runs can detect silent failures.
5. **Client-side tag in chat_messages**: `priority: bool`, `priority_label: str` so downstream agent can see priority messages.
6. **load_creds ISO-string robustness** (the `m365-teams-seed-chat-last-seen.py` writer dumps `expires_at` as ISO string, not float). Script now coerces; previously crashed with TypeError on `str < float` comparison.

## Verified 09:49 SGT
Smoke test caught Kailash's 08:47 SGT "MMP / Majutech / Vision Tech" project update. `chat_poll_failures: []`. Total runtime ~3 min.

## Lessons

- **"0 results" ≠ "0 attempts succeeded"** — the script swallowed HTTP 400 errors and reported `chat_msgs_new: 0`. Downstream agent had no way to distinguish "no new messages" from "all polls failed." **Always surface poll-level failures in output, not just zero counts.**
- **Read Graph API error messages carefully** — the original error said "orderby 'CreatedDateTime' in 'Ascending' direction is not supported." I changed asc→desc, but the real error was `$filter` on createdDateTime, not orderby direction. Spent an extra smoke test cycle chasing a phantom. **Always read the FULL error body and check ALL the constraints mentioned.**
- **Stale `lastUpdatedDateTime` is a real edge case** — Microsoft can lag this field behind actual message timestamps. Don't rely on it for important chats.
- **Cross-script format coupling** — one script (`m365-teams-seed-chat-last-seen.py`) writing credentials in a different format broke the main script. **Shared data files need format contracts; readers should be tolerant of writer variations.**

## Outstanding hardening
**Graph API change-notifications (webhooks) instead of polling** — LOGGED. Requires public HTTPS endpoint, subscription lifecycle management (subscriptions expire), state sync, missed-notification handling. Not a quick fix. Webhooks are real-time, no budget concerns, no `lastUpdatedDateTime` lag. Bead for Bea/Dev to scope.
