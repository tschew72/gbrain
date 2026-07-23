---
type: concept
title: 'Brain repo push is manual, not automatic'
created_at: '2026-07-23T14:52:23.000Z'
source_uri: 'channel:1482902219228708926/message:1529863757587808258'
source_kind: 'mcp:put_page'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-23T14:53:08.505Z'
---

User asked whether the brain repo push is automatic.

Verified conclusion from observed history:
- the pushes occurred when commits were created and `git push` was run manually during the conversation
- there is no evidence in this exchange of a scheduled auto-push job

Practical answer:
- pushing is manual unless someone explicitly adds automation like cron or a hook
