---
type: note
title: M365 digest reauth fix - 2026-07-21
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-21T01:35:40.253Z'
source_kind: 'mcp:put_page'
tags:
  - digest
  - fix
  - m365
  - oauth
  - regression-test
---

Applied fix for digest reauth behavior in the legacy standup path.

What changed:
- `user_standup_digest.py` now uses `oauth_flow.refresh_access_token(...)` instead of a raw `httpx.post(...)` refresh call.
- This aligns the legacy path with the shared helper already used by `vince_digest.py`, `phuong_digest.py`, and `api_server.py`.
- Added a regression test in `tests/test_user_standup_digest.py` proving the helper is called and the refreshed token is persisted.

Verification:
- `pytest -q /root/projects/max-workspace/m365_digest/tests/test_oauth_flow.py /root/projects/max-workspace/m365_digest/tests/test_user_standup_digest.py /root/projects/max-workspace/m365_digest/tests/test_token_manager.py`
- Result: 9 passed

Operational takeaway:
- Future reauth prompts on this digest path should be treated as tenant/token state issues, not a user-side change.
- The code path now inherits the shared invalid_client fallback for stale or rotated client secrets.
