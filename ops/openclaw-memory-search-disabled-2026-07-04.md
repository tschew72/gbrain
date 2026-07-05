---
type: concept
title: OpenClaw memory search disabled
date: '2026-07-04T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-04T10:41:30.963Z'
source_kind: 'mcp:put_page'
tags:
  - gbrain
  - memory
  - ops
---

`openclaw.memory_search` returned `disabled=true` / `unavailable=true` because the index was built for `embeddinggemma-300m-qat-Q8_0.gguf` while the runtime expected `text-embedding-3-small`.

Workaround: use `mcp__gbrain.recall` for targeted recall until the memory index is rebuilt.
