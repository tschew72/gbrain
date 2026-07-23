---
type: note
title: GBrain push blocked
source: 'discord:#2ndbrain'
created: '2026-07-23T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-23T14:31:43.966Z'
source_kind: 'mcp:put_page'
---

Local commit created in `/root/.gbrain/checkout`:
- commit: `18cffec` (`Sync brain repo updates`)

Push attempt result:
- remote: `https://github.com/garrytan/gbrain.git`
- error: `Permission to garrytan/gbrain.git denied to tschew72`
- status: 403 forbidden

Conclusion:
- The commit is ready locally, but the authenticated GitHub identity does not have push access to the upstream repository.
