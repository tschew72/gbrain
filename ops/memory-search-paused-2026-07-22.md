---
type: note
title: Memory search paused due embedding mismatch
created: '2026-07-22T00:00:00.000Z'
updated: '2026-07-22T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-22T00:12:30.556Z'
source_kind: 'mcp:put_page'
tags:
  - embeddings
  - gbrain
  - memory-search
  - openclaw
  - ops
---

## Summary

`openclaw.memory_search` is currently unavailable because the indexed embedding model does not match the active runtime expectation.

## Observed mismatch

- Expected runtime model: `text-embedding-3-small` (OpenAI)
- Indexed model: `embeddinggemma-300m-qat-Q8_0.gguf`

## Impact

Semantic memory search is paused until the index is rebuilt or aligned with the active embedding provider.

## Fallback

Use `openclaw.memory_get` for direct file reads while semantic retrieval is unavailable.

## Note

This is an operational status note, not a root-cause fix. Rebuild or reindex the memory store when the embedding configuration is corrected.
