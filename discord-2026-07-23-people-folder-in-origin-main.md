---
type: concept
title: People folder is in origin main
created_at: '2026-07-23T14:44:32.000Z'
source_uri: 'channel:1482902219228708926/message:1529861783097966713'
source_kind: 'mcp:put_page'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-23T14:45:04.239Z'
---

User reported they could not find the people folder in the remote repo.

Verified state:
- branch: main
- origin/main contains people/ at the repo root
- repo root also contains other knowledge folders like companies/, facts/, decisions/, events/, findings/, extracts/, notes/, memory/, projects/

Practical answer:
- open the repo root on branch main; people/ is a top-level directory, not nested under another brain/ folder
