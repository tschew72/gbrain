---
type: note
title: Phuong Teams helper terminal channel errors
created: '2026-07-21T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-21T12:06:26.929Z'
source_kind: 'mcp:put_page'
---

- The Phuong Teams delta helper was repeatedly logging API errors because it only treated `410 Gone` as terminal for channel polling.
- `403 Forbidden` and `404 Not Found` channel responses must also be marked dead and removed from `channel_deltas`, otherwise inaccessible Teams channels are retried and re-logged on every run.
- The production collector now also prunes any stale dead channel entries before fetching and treats `GraphGoneError` during channel seeding as terminal.
- Fix applied in `/root/scripts/m365-teams-delta.py` and mirrored in `/root/.openclaw/workspace-agents/researcher/tmp_phuong_delta_run.py`.
