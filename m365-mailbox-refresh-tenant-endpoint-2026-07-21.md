---
type: concept
title: M365 mailbox refresh must use tenant-specific endpoint
created_at: '2026-07-21T03:30:00.000Z'
source_kind: 'mcp:put_page'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-21T03:33:43.978Z'
---

During the 2026-07-21 incremental M365 + Teams ingest, the mailbox delta refresh failed when using `https://login.microsoftonline.com/common/oauth2/v2.0/token` with error `AADSTS50194`.

Fix: use the tenant-specific token endpoint `https://login.microsoftonline.com/<tenant_id>/oauth2/v2.0/token` for the delegated Outlook app. After switching to the tenant endpoint, the same delta cursors resumed successfully and the run completed with no new mail signal.

So what: future cron runs should default to the tenant-scoped refresh path to avoid repeat auth failures.
