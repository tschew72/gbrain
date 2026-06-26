---
type: 'concept'
title: 'Memory search paused due embedding mismatch'
updated: '2026-06-20T00:00:00.000Z'
enriched_at: '2026-06-20T18:30:59.693Z'
enriched_by: 'cli:enrich'
ingested_at: '2026-06-20T18:31:04.417Z'
source_kind: 'put_page'
ingested_via: 'put_page'
created: '2026-06-20T18:31:04.417Z'
---

## Overview

`openclaw.memory_search` returned disabled/unavailable during the 2026-06-21 Teams ingest run due to an embedding model mismatch. The index was built for a local GGUF embedding model while the runtime expected an OpenAI embedding model. [Source: ameliamemory-search-paused-2026-06-21]

## Technical Details

- **Expected runtime model:** `text-embedding-3-small` (OpenAI) [Source: ameliamemory-search-paused-2026-06-21]
- **Actual indexed model:** `embeddinggemma-300m-qat-Q8_0.gguf` (local GGUF at `/root/.openclaw/embeddings/embeddinggemma-300m-qat-Q8_0.gguf`) [Source: ameliamemory-search-paused-2026-06-21]

## Impact

Semantic search via `memory_search` was paused for the ingest run. No automated vector-based retrieval was available for that session. [Source: ameliamemory-search-paused-2026-06-21]

## Remediation

The tool suggested `openclaw memory status --index` or `openclaw memory index --force` as remediation. [Source: ameliamemory-search-paused-2026-06-21]

## Fallback

Direct file access remained functional through `openclaw.memory_get`, which performed file reads from the local filesystem path:

- `/root/.openclaw/workspace-agents/amelia/memory/2026-06-18.md` [Source: ameliamemory-search-paused-2026-06-21]

## Status

Future runs should not rely on semantic memory search until the index is rebuilt. [Source: ameliamemory-search-paused-2026-06-21]
