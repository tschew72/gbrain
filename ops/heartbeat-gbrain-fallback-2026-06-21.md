---
type: 'note'
title: 'Operational note: when `openclaw.memory_search` is paused because the index/mode'
captured_at: '2026-06-21T00:46:57.058Z'
captured_via: 'capture-cli'
ingested_via: 'put_page'
ingested_at: '2026-06-21T00:47:10.063Z'
source_kind: 'put_page'
created: '2026-06-21T00:47:10.063Z'
---

# Operational note: when `openclaw.memory_search` is paused because the index/mode

Operational note: when `openclaw.memory_search` is paused because the index/model is out of sync, `/root/.bun/bin/gbrain.real search` and `query` can still be used as a direct fallback. For the Hunt heartbeat wake on 2026-06-21, heartbeat-specific GBrain searches returned no results, so there was no new prior decision to recover.
