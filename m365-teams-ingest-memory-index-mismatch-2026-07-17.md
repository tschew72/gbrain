---
type: concept
title: M365 ingest note - memory recall paused
created: '2026-07-17T13:33:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-17T13:34:57.910Z'
source_kind: 'mcp:put_page'
---

- GBrain/memory recall was attempted before the delta sweep.
- `openclaw.memory_search` returned unavailable because the memory index is built for a different embedding model/provider than the current runtime expects.
- Operational impact: future cron runs cannot rely on semantic memory recall until the index is rebuilt or the embedding settings are aligned.
- No new M365 signal was found in this 30-minute window.
