---
type: concept
title: M365 Later folder absence
created: '2026-07-24T09:00:00+08:00'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-24T01:04:29.376Z'
source_kind: 'mcp:put_page'
tags:
  - cron
  - later-folder
  - m365
  - outlook
---

## Observation
A recursive Microsoft Graph folder walk of the mailbox used by the Later-folder stale-thread cron did **not** find any mail folder named `Later`, including the `includeHiddenFolders=true` view.

## Implication
The recurring stale-thread cron cannot currently execute its intended Later-folder scan against this mailbox state until the folder is restored, renamed, or the target mailbox changes.

## Notes
- Checked both visible and hidden folder listings.
- No folder name containing `later` was returned anywhere in the tree.
