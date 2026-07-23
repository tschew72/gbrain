---
type: concept
title: Later folder check 2026-07-23
created: '2026-07-23T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-23T05:06:10.638Z'
source_kind: 'mcp:put_page'
---

- Graph mailbox inspection for the Later-folder stale check did not expose a top-level or nested folder named `Later`.
- This suggests either a mailbox/account mismatch, a renamed folder, or that the cron prompt is pointing at a container not visible to the current delegated OAuth mailbox.
- Impact: the recurring Later-folder stale check cannot be completed reliably until the correct mailbox/folder path is identified.
