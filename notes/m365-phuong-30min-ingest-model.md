---
type: note
title: m365-phuong-30min-ingest model resolution
created: '2026-07-23T00:00:00.000Z'
updated: '2026-07-23T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-23T14:01:07.466Z'
source_kind: 'mcp:put_page'
---

## Note

The live `m365-phuong-30min-ingest` cron now has an inlined prompt payload instead of a runtime file read. The prompt and cron config were aligned to use `minimax/MiniMax-M3` as the primary model with `openai/gpt-5.4-mini` as fallback. The `researcher` agent default was also updated to match.

## Implication

The cron no longer depends on a missing `read` tool at runtime, and future runs will use the intended model order without inheriting the stale researcher default.
