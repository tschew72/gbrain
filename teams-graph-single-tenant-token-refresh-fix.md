---
type: concept
title: Teams Graph single-tenant token refresh fix
created: '2026-07-17T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-17T06:53:08.866Z'
source_kind: 'mcp:put_page'
---

## Finding
The PMO and commercial Teams posting scripts were still refreshing OAuth tokens against `https://login.microsoftonline.com/common/oauth2/v2.0/token`.

## Root Cause
The registered Microsoft app is single-tenant, so `/common` is not supported. Azure returned `AADSTS50194` and blocked token refresh before any Teams post was attempted.

## Fix
Use the tenant-specific endpoint from `/root/.outlook-mcp/config.json`:

`https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/token`

This was applied to:
- `scripts/daily_pmo_status.py`
- `scripts/daily_commercial_tracker.py`

## Verification
- Direct refresh-token request to the tenant-specific endpoint returned `200`.
- `pytest -q tests/test_daily_pmo_status.py` passed.
- The refreshed PMO post successfully published to Teams.
