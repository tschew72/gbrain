---
type: concept
title: 'M365 Teams ingest parse error on 2026-07-18 08:03 SGT'
created: '2026-07-18T00:03:44.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-18T00:06:38.624Z'
source_kind: 'mcp:put_page'
tags:
  - ingest
  - m365
  - ops
  - teams
---

The 2026-07-18 08:03 SGT incremental M365 ingest completed with no new email or Teams signal, but the combined runner logged a Teams parse error: `Invalid control character at: line 1 column 201 (char 200)`.

The latest Teams snapshot file at `/root/.openclaw/workspace/memory/.state/m365-teams-latest.json` remained valid JSON and showed `channel_msgs_new: 0` and `chat_msgs_new: 0`.

Likely implication: the Teams helper output parser is intermittently choking on a returned payload or log line even when the downstream snapshot write succeeds. If this repeats, inspect the JSON capture path in the combined ingest runner and the stdout contract of `/root/scripts/m365-teams-delta.py`.
