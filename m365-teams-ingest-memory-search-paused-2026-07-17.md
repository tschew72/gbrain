---
type: concept
title: M365 Teams Ingest Memory Search Paused 2026 07 17
created: '2026-07-17T12:03:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-17T12:03:50.069Z'
source_kind: 'mcp:put_page'
tags:
  - ingest
  - memory
  - openclaw
  - operational-note
---

# Memory search paused during m365 ingest

During the 2026-07-17 20:00 SGT m365 + Teams ingest run, `openclaw.memory_search` returned an availability error:

- `index was built for model /root/.openclaw/embeddings/embeddinggemma-300m-qat-Q8_0.gguf, expected text-embedding-3-small`
- Suggested remediation from the tool: run `openclaw memory status --index` or `openclaw memory index --force`

Implication: the ingest cron cannot currently use memory recall for dedup/context checks until the index is rebuilt or the embedding configuration is aligned.
