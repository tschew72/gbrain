---
type: 'note'
title: 'Outlook Teams dedupe via message ID'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-20T07:26:49.365Z'
source_kind: 'mcp:put_page'
tags:
  - 'dedupe'
  - 'ingest'
  - 'm365'
  - 'outlook'
  - 'teams'
created: '2026-06-20T07:26:49.365Z'
---

# Outlook Teams dedupe via message ID

- Outlook can deliver the same logical Teams notification as multiple mail items with different Outlook message IDs.
- Teams ingest should dedupe on Outlook message ID, not just on sender display name, channel name, received time, or message text.
- On 2026-06-20, the `Service Delivery Centre (SDC)` post `ok. Please update to all stakeholders.` arrived as duplicate Outlook copies.
- I extended the local ledger with the new IDs instead of rewriting the Teams narrative.
