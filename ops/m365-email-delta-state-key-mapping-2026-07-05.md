---
type: concept
title: M365 Email Delta State Key Mapping
created_at: '2026-07-05T08:34:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-05T08:38:37.924Z'
source_kind: 'mcp:put_page'
tags:
  - delta
  - email
  - m365
  - ops
---

# M365 Email Delta State Key Mapping

The incremental M365 email delta job uses these saved state keys:
- `email_inbox`
- `email_sentitems`
- `email_archive`

During the 2026-07-05 16:30 SGT ingest, a casing mismatch on `sentItems` caused the code to miss the saved cursor, fall back to a seed URL, and hit HTTP 400 on the Graph delta endpoint.

Keep the folder-to-state mapping exact. `sentItems` must resolve to `email_sentitems`.
