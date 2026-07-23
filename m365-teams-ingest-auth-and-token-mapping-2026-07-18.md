---
type: concept
title: M365 ingest auth and delta token mapping fixes
created: '2026-07-18T00:00:00.000Z'
source_kind: 'mcp:put_page'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-18T04:07:06.006Z'
tags:
  - auth
  - delta-tokens
  - ingest
  - m365
  - teams
---

## What mattered

- The delegated OAuth refresh flow for the M365 ingest app must use the tenant-specific token endpoint:
  `https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/token`
- Using `/common` fails with `AADSTS50194` because the app is tenant-scoped, not multi-tenant.
- The persisted email delta token key for Sent Items is `email_sentitems` (all lowercase), not `email_sentItems`.
- A key mismatch here makes the cron think the state is corrupt and fall back into the wrong first-run path.

## Why this matters

- This is a recurring 30-minute cron, so a small auth or key-mapping bug can silently break incremental ingestion and force unnecessary fallback behavior.
- Fixing both issues keeps the delta path stable and avoids reprocessing windows unnecessarily.

## Operational note

- Confirmed working run on 2026-07-18 produced no new email or Teams signal in the last 30 minutes after the fix.
