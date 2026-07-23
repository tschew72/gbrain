---
type: concept
title: Brain remote repo state
created_at: '2026-07-23T14:37:13.000Z'
source_uri: 'channel:1482902219228708926/message:1529859939760209940'
source_kind: 'mcp:put_page'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-23T14:38:01.763Z'
---

User noted they do not see the brain in the remote repo.

Current verified state from the local checkout:
- repo remote: https://github.com/tschew72/gbrain.git
- branch: main
- tracking: origin/main
- HEAD commit: 18cffec0 Sync brain repo updates
- untracked local files still present and not pushed:
  - discord-2026-07-23-gbrain-latest-version-check.md
  - notes/gbrain-push-blocked-2026-07-23.md

Interpretation:
- the brain content is in the repo as markdown pages/pagesync content, not a separate magic folder or binary
- if the user cannot see it on GitHub, they may be looking at the wrong repo, wrong branch, or the unpushed local files rather than the committed content
