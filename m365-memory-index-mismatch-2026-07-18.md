---
type: concept
title: M365 ingest recall unavailable due to memory index mismatch
created_at: '2026-07-18T12:38:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-18T12:39:33.137Z'
source_kind: 'mcp:put_page'
tags:
  - ingest
  - memory
  - ops
---

Memory recall (`openclaw.memory_search`) returned disabled/unavailable because the index was built for `embeddinggemma-300m-qat-Q8_0.gguf` while the runtime expected `text-embedding-3-small`.

Implication: future cron runs cannot rely on memory recall until the index is rebuilt or the embedding settings are aligned.

Action: run `openclaw memory status --index` or `openclaw memory index --force` before the next recall-dependent workflow.
