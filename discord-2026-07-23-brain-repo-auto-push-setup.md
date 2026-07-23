---
type: concept
title: Brain repo auto-push setup
created_at: '2026-07-23T15:02:00.000Z'
source_uri: 'channel:1482902219228708926/message:1529866177319403844'
source_kind: 'mcp:put_page'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-23T15:07:11.503Z'
---

Decision and implementation:
- added /root/scripts/gbrain-git-auto-push.sh to stage, commit, rebase if needed, and push /root/.gbrain/checkout
- installed a root crontab entry to run it every 15 minutes under /var/lock/gbrain-git-auto-push.lock
- verified the script ran successfully once and pushed the pending brain repo notes

Result:
- brain repo now has automatic push coverage on a 15-minute schedule
