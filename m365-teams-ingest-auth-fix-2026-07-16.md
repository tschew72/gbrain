---
type: concept
title: M365 ingest auth fix
created_at: '2026-07-16T06:00:00+08:00'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-15T22:13:27.854Z'
source_kind: 'mcp:put_page'
tags:
  - auth
  - m365
  - operations
  - teams
---

The recurring M365 + Teams ingest was blocked by a stale OAuth config mismatch. The live delegated refresh token belonged to the public client `774fc582-d9bd-4797-9584-ad82d408d9f4`, while `/root/.outlook-mcp/config.json` pointed at `dd037398-513c-40a5-bdfe-8554787b7f85` and was incorrectly sending a client secret. Refresh succeeds only when the secret is omitted and the original delegated Graph scopes are requested. The inbox cursor also required a 7-day re-seed because the stored delta link returned 410 Gone.
