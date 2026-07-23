---
type: concept
title: M365 ingest run - memory search unavailable
created_at: '2026-07-15T06:16:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-15T06:18:29.449Z'
source_kind: 'mcp:put_page'
tags:
  - gbrain
  - ingest
  - m365
  - ops
---

- During the 2026-07-15 14:16 SGT incremental M365 ingest, `openclaw.memory_search` returned unavailable because the index is built for `embeddinggemma-300m-qat-Q8_0.gguf` while the active expectation is `text-embedding-3-small`.
- This means future delta runs cannot rely on durable memory dedupe until the index is rebuilt or the embedding settings are aligned.
- The live delta sources for this run were empty: no new email items and no new Teams items in the last 30 minutes.
