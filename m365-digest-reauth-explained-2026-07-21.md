---
type: note
title: M365 digest reauth explained - 2026-07-21
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-21T01:15:26.498Z'
source_kind: 'mcp:put_page'
tags:
  - digest
  - m365
  - oauth
  - operations
  - reauth
---

Reauth on Vince's M365 digest is not evidence that he changed anything locally.

Observed/remembered root cause pattern:
- The digest bot uses a delegated, tenant-bound OAuth flow.
- Refresh can fail if the app is pointed at `/common` instead of the tenant-specific token endpoint.
- A stale or rotated client secret can also force reauth / invalid_client behavior.
- In both cases, the failure is on the connector/auth path, not because the user edited settings.

Operational takeaway:
- First suspect token expiry, tenant endpoint mismatch, or stale secret.
- Do not assume user action when reauth suddenly appears.

Related prior notes:
- M365 delegated refresh must use tenant-specific OAuth endpoint
- M365 digest auth fallback
