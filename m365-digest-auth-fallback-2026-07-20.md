---
type: concept
title: M365 digest auth fallback
created: '2026-07-20T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-20T06:59:46.719Z'
source_kind: 'mcp:put_page'
---

Fixed the recurring M365 digest auth failure by making the shared refresh helper retry without `M365_CLIENT_SECRET` when Microsoft returns `invalid_client` / `AADSTS7000215` / invalid client secret errors. Updated both `phuong_digest.py` and `vince_digest.py` to use the shared helper, and added regression tests covering the no-secret path and the retry-without-secret path.

Key outcome: a rotated or stale client secret no longer bricks the digest cron if the tenant is configured for public-client refresh flows.

## Facts

<!--- gbrain:facts:begin -->
| # | claim | kind | confidence | visibility | notability | valid_from | valid_until | source | context |
|---|-------|------|------------|------------|------------|------------|-------------|--------|---------|
| 1 | M365 digest bot uses a delegated, tenant-bound OAuth flow | fact | 0.9 | private | low | 2026-07-21 |  | mcp:put_page |  |
| 2 | Refresh can fail if the app is pointed at /common instead of the tenant-specific token endpoint | belief | 0.9 | private | low | 2026-07-21 |  | mcp:put_page |  |
| 3 | A stale or rotated client secret can force reauth / invalid_client behavior | belief | 0.9 | private | low | 2026-07-21 |  | mcp:put_page |  |
| 4 | When reauth suddenly appears, first suspect token expiry, tenant endpoint mismatch, or stale secret | belief | 0.9 | private | medium | 2026-07-21 |  | mcp:put_page |  |
| 5 | Do not assume user action when reauth suddenly appears | belief | 0.85 | private | medium | 2026-07-21 |  | mcp:put_page |  |
| 6 | Applied fix for digest reauth behavior in the legacy standup path | event | 1.0 | private | low | 2026-07-21 |  | mcp:put_page |  |
| 7 | user_standup_digest.py now uses oauth_flow.refresh_access_token(...) instead of a raw httpx.post(...) refresh call | fact | 1.0 | private | low | 2026-07-21 |  | mcp:put_page |  |
| 8 | Legacy standup path now aligned with shared helper already used by vince_digest.py, phuong_digest.py, and api_server.py | fact | 1.0 | private | low | 2026-07-21 |  | mcp:put_page |  |
| 9 | Added regression test in tests/test_user_standup_digest.py proving the helper is called and the refreshed token is persisted | event | 1.0 | private | low | 2026-07-21 |  | mcp:put_page |  |
| 10 | pytest run across test_oauth_flow.py, test_user_standup_digest.py, test_token_manager.py resulted in 9 passed | fact | 1.0 | private | low | 2026-07-21 |  | mcp:put_page |  |
| 11 | Future reauth prompts on this digest path should be treated as tenant/token state issues, not a user-side change | belief | 0.9 | private | medium | 2026-07-21 |  | mcp:put_page |  |
| 12 | Code path now inherits the shared invalid_client fallback for stale or rotated client secrets | fact | 0.9 | private | low | 2026-07-21 |  | mcp:put_page |  |
<!--- gbrain:facts:end -->
