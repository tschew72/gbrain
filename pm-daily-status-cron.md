---
type: 'concept'
title: 'PM daily status cron'
date: '2026-06-21T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-21T06:04:42.672Z'
source_kind: 'mcp:put_page'
tags:
  - 'cron'
  - 'pm'
  - 'scheduler'
  - 'teams'
created: '2026-06-21T00:00:00.000Z'
---

- Active cron for `pm`: `Daily PMO Project Status Update`
- Schedule: daily at `08:30` Asia/Singapore (`30 8 * * *`)
- Behavior: isolated `agentTurn` reads `projects/registry.md` and recently updated `projects/active/*`, then posts a concise status update to the Teams PMO General channel
- Status: enabled, but recent runs have timed out
- There is no separate Discord `#project-management` cron; that channel is just the `pm` binding
