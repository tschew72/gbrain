---
type: concept
title: Weekly Evvo blog cron status
created: '2026-07-23T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-23T14:07:17.138Z'
source_kind: 'mcp:put_page'
tags:
  - blog
  - cron
  - evvolabs.vn
  - status
---

- The weekly Evvo blog job (`Weekly Evvo blog research-and-publish`) is enabled and scheduled for `30 8 * * 1` in `Asia/Singapore`.
- It has published successfully in prior runs.
- Latest run failed at startup with `CronSessionLifecycleClaimError: Session "agent:main:cron:e0465ff8-7695-474b-a674-2925bf4d4973" changed while starting work. Retry.`
- The failure looks like a session-claim/lifecycle issue, not a content or WordPress publishing failure.
