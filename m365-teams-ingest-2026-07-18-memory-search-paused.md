---
type: concept
title: M365 ingest recall note
created: '2026-07-18T14:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-18T14:03:41.032Z'
source_kind: 'mcp:put_page'
tags:
  - cron
  - gbrain
  - m365
  - memory
  - ops
---

Semantic memory search was unavailable during the 2026-07-18 30-minute M365/Teams ingest because the index is built for `/root/.openclaw/embeddings/embeddinggemma-300m-qat-Q8_0.gguf` while the current runtime expects `text-embedding-3-small`.

Impact: future recall steps should treat GBrain/Memory semantic search as paused until the index is rebuilt or the embedding settings are reconciled.

Recommended follow-up: run `openclaw memory status --index` or `openclaw memory index --force` to restore recall.
