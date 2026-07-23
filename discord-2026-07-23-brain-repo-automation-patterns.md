---
type: concept
title: Brain repo automation patterns
created_at: '2026-07-23T14:53:34.000Z'
source_uri: 'channel:1482902219228708926/message:1529864054246478015'
source_kind: 'mcp:put_page'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-23T14:56:03.775Z'
---

Research summary on how people automate git pushes:
- local cron jobs that run a script to git add/commit/push only when there are diffs
- git hooks for per-repo automation, especially pre-commit and pre-push, with hooks stored in $GIT_DIR/hooks or a custom core.hooksPath
- GitHub Actions scheduled workflows (cron) for repo-hosted automation, with manual workflow_dispatch as a backup

Recommendation for the brain repo:
- simplest fit is a local scheduled script or GitHub Actions schedule, with a guard to skip empty commits
- hooks are better for policy enforcement than for full automation
