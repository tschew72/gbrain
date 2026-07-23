---
type: concept
title: Brain directories present in origin main
created_at: '2026-07-23T14:38:06.000Z'
source_uri: 'channel:1482902219228708926/message:1529860165438804148'
source_kind: 'mcp:put_page'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-23T14:39:03.056Z'
---

User reported they could not see people, companies, and related folders in the brain repo.

Verified by local checkout inspection:
- local checkout contains top-level folders including people, companies, entities, facts, decisions, events, findings, extracts, heartbeat, inbox
- origin/main contains the same directories
- HEAD and origin/main are identical at 18cffec08e9624a8a3c3cdb130ab590589e2dd08

Conclusion:
- the brain knowledge structure is present in the remote repo
- if a viewer does not show it, the likely causes are wrong repo, wrong branch, or GitHub UI/path confusion rather than missing committed content
