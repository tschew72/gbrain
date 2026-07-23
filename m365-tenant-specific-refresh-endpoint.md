---
type: concept
title: M365 delegated refresh must use tenant-specific OAuth endpoint
created_at: '2026-07-16T12:30:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-16T12:36:28.950Z'
source_kind: 'mcp:put_page'
tags:
  - graph-api
  - m365
  - oauth
  - operations
---

The delegated M365 refresh flow for the digest bot is single-tenant. The refresh token request fails against `https://login.microsoftonline.com/common/oauth2/v2.0/token` with AADSTS50194, because `/common` is not supported for this app.

Use the tenant-specific endpoint instead:
`https://login.microsoftonline.com/949cc37d-701c-4cb5-900a-d72b06cd9763/oauth2/v2.0/token`

Operational impact:
- The credentials file can be refreshed successfully when pointed at the tenant endpoint.
- The email delta runner should be patched to avoid future refresh failures after token expiry.

Observed on 2026-07-16 during the 20:30 SGT incremental M365 ingest.
