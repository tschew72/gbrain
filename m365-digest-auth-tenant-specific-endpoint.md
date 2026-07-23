---
type: concept
title: M365 digest auth refresh must use tenant-specific endpoint
created_at: '2026-07-23T11:33:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-23T11:34:12.052Z'
source_kind: 'mcp:put_page'
tags:
  - cron
  - m365
  - oauth
  - operational-fact
  - outlook
---

The delegated Outlook app used by the 30-minute M365 ingest is single-tenant. Refresh-token requests to `https://login.microsoftonline.com/common/oauth2/v2.0/token` fail with `AADSTS50194`. Use the tenant-specific endpoint from `/root/.outlook-mcp/config.json` instead:

`https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/token`

This matters because the cron can otherwise fail the email delta pass even when the stored refresh token is still valid.
