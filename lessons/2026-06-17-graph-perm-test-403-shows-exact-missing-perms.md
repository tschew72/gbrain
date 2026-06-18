---
type: lesson
title: 2026 06 17 Graph Perm Test 403 Shows Exact Missing Perms
date: '2026-06-17T00:00:00.000Z'
domain: m365-graph
status: active
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-17T13:25:41.326Z'
source_kind: 'mcp:put_page'
---

# Graph API 403 errors tell you exactly which perms are missing

## What I learned (2026-06-17 21:23 SGT)

When a user with a too-narrow Graph scope hits a protected endpoint, the **403 response includes the exact list of perms that would have worked**. Don't guess — read the error.

Example, Phuong's refreshed 4-perm token hitting `/me/chats`:
```
403: Missing scope permissions on the request.
API requires one of 'Chat.ReadBasic, Chat.Read, Chat.ReadWrite'.
Scopes on the request 'Calendars.Read, Mail.Read, Team.ReadBasic.All, User.Read, profile, openid, email'
```

The error gave the full set of acceptable perms + the user's current scopes side-by-side. I can map the gap in 2 seconds.

## How to use this

- **For perm audits**: hit the 5 key endpoints (`/me/messages`, `/me/joinedTeams`, `/me/chats`, `/teams/{id}/channels`, `/teams/{id}/channels/{id}/messages`) with the target user's token, and let the 403s enumerate the gaps
- **For new user onboarding**: do this test BEFORE running 6mo backfill, to avoid silent failures
- **For clients/consent screens**: copy the 403 message verbatim into the consent screen so the user knows exactly what they're approving

## Caveats

- `$filter` and `$top` query params fail BEFORE the perm check on some endpoints. The 400 vs 403 distinction matters: 400 = malformed query, 403 = perm denied. Don't conflate them.
- `/me/joinedTeams` does NOT support `$top`. Use plain `?$select=` if you need field subset.
- Refresh tokens can refresh, but they can NOT escalate scope. The 4-perm user stays at 4 perms even after refresh. Re-consent is required for new perms.
