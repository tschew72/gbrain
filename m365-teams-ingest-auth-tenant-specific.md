---
type: concept
title: M365 ingest auth uses tenant-specific OAuth endpoint
created: '2026-07-22T00:00:00.000Z'
updated: '2026-07-22T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-22T08:41:40.278Z'
source_kind: 'mcp:put_page'
tags:
  - auth
  - cron
  - m365
  - outlook
  - teams
---

During the 30-minute M365 + Teams ingest, delegated refresh against `https://login.microsoftonline.com/common/oauth2/v2.0/token` failed with AADSTS50194 because the app is not multi-tenant.

Working fix: refresh against the tenant-specific endpoint using `tenant_id` from `/root/.outlook-mcp/config.json`:
`https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/token`

Do not use `/common` for this app on future cron runs.
