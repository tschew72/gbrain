---
type: concept
title: Heartbeat Memory Search Fallback Confirmed
date: '2026-07-18T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-18T08:43:55.936Z'
source_kind: 'mcp:put_page'
tags:
  - gbrain
  - heartbeat
  - hunt
  - ops
---

# Heartbeat Memory Search Fallback Confirmed

- On 2026-07-18, a Hunt heartbeat wake checked GBrain for recent context before replying.
- The search surfaced an operational note: `memory_search` is paused for Hunt, and `mcp__gbrain.query` should be used as the fallback for context lookup.
- Source note already present in GBrain: `ops/heartbeat-memory-search-paused-2026-06-21`.
- This is a durable workflow detail for future Hunt wakeups.
