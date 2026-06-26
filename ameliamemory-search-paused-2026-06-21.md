---
type: 'concept'
title: 'Memory search paused due to embedding mismatch'
date: '2026-06-21T00:00:00.000Z'
enriched_at: '2026-06-20T18:30:38.864Z'
enriched_by: 'cli:enrich'
ingested_at: '2026-06-20T18:30:41.385Z'
source_kind: 'put_page'
ingested_via: 'put_page'
tags:
  - 'memory'
  - 'openclaw'
  - 'ops'
created: '2026-06-21T00:00:00.000Z'
---

## Overview

`openclaw.memory_search` returned disabled/unavailable during the 2026-06-21 Teams ingest run due to an embedding model mismatch. The index was built for a local GGUF embedding model while the runtime expected an OpenAI embedding model.

## Technical Details

- **Expected runtime model:** `text-embedding-3-small` (OpenAI)
- **Actual indexed model:** `embeddinggemma-300m-qat-Q8_0.gguf` (local GGUF at `/root/.openclaw/embeddings/embeddinggemma-300m-qat-Q8_0.gguf`)

## Impact

Semantic search via `memory_search` was paused for the ingest run. No automated vector-based retrieval was available for that session.

## Fallback

Direct file access remained functional through `openclaw.memory_get`, which performed file reads from the local filesystem path:

- `/root/.openclaw/workspace-agents/amelia/memory/2026-06-18.md`
