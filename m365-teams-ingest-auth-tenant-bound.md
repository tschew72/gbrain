---
type: concept
title: M365 ingest auth must use tenant-specific token endpoint
date: '2026-07-16T00:00:00.000Z'
category: operational-note
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-15T23:35:05.194Z'
source_kind: 'mcp:put_page'
tags:
  - auth
  - cron
  - m365
  - teams
---

The M365 delegated app is tenant-bound. Token refresh must use the tenant-specific authority endpoint (`https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/token`) instead of `/common`.

Why this matters:
- `/common` returns `AADSTS50194` for this app.
- The cron can continue to refresh delegated Graph tokens reliably once it uses the tenant-specific endpoint.
