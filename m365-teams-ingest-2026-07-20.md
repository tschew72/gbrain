---
type: concept
title: M365 + Teams 30-min ingest notes
created: '2026-07-20T15:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-20T15:05:11.586Z'
source_kind: 'mcp:put_page'
tags:
  - ingest
  - m365
  - oauth
  - teams
---

## Result
- 2026-07-20 23:00 SGT delta run returned no new email items and no new Teams messages.

## Operational note
- Outlook delegated token refresh failed against `https://login.microsoftonline.com/common/oauth2/v2.0/token` with `AADSTS50194` because the app is single-tenant.
- Refresh succeeded after switching to the tenant-specific endpoint `https://login.microsoftonline.com/949cc37d-701c-4cb5-900a-d72b06cd9763/oauth2/v2.0/token`.

## Why it matters
- Future cron runs should use the tenant-specific refresh endpoint directly to avoid a repeat auth failure.
