---
type: concept
title: M365 Teams 30-min ingest current failure mode
created: '2026-07-20T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-20T06:34:54.572Z'
source_kind: 'mcp:put_page'
---

- The old prompt-file bug was a real root cause: the cron failed when it tried to read an external prompt file inside ACP.
- Current live runs show a different symptom: `cron: isolated agent setup timed out before runner start`.
- Recent history also shows many runs exiting because `Previous run still in progress`, so overlap/cleanup is still part of the operational picture.
- Net: the cron is no longer just the old prompt-file issue; it now appears to be wedged by bootstrap/setup timeouts and run-overlap protection.
