---
type: concept
title: M365 Outlook token refresh must use tenant-specific endpoint
created_at: '2026-07-22T10:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-22T10:04:48.363Z'
source_kind: 'mcp:put_page'
tags:
  - auth
  - cron
  - m365
  - outlook
---

- During the 2026-07-22 30-minute M365 ingest run, the delegated Outlook refresh flow failed against `https://login.microsoftonline.com/common/oauth2/v2.0/token` with `AADSTS50194`.
- The fix was to use the tenant-specific endpoint `https://login.microsoftonline.com/<tenant_id>/oauth2/v2.0/token` for the `M365 Digest Bot` app.
- After switching endpoints, the refresh succeeded and the mail delta run completed normally.
- Operational implication: future cron runs should use the tenant-scoped token endpoint when refreshing `/root/.outlook-mcp/credentials.json`.
