---
type: 'decision'
title: 'SGEBIZ Test Environment Finding Exclusion 2026 06 26'
sources:
  - 'phuong-30min:2026-06-26T1233'
ingested_via: 'manual:cron-fallback'
ingested_at: '2026-06-26T04:33:45Z'
source_kind: 'manual:cron-fallback'
tags:
  - 'sgebiz'
  - 'vapt'
  - 'report-scope'
  - 'test-environment'
created: '2026-06-26T04:33:45Z'
---

# SGEBIZ test-environment finding exclusion

Suyog Bagul instructed Fang to leave a named SGEBIZ web finding out of the client report because it only existed in the test environment.

## Signal 2026-06-26 12:17 SGT
- Slack direct-message notification from Suyog Bagul to Fang carried this instruction:
  `For the Point - Hardcoded Sensitive Information Exposure in Client-Side JavaScript - Pl don't include it in the Report as this was in the Test environment for Testing purpose only.`
- The note came from the Ezyprocure Slack workspace and referenced the already-tracked SGEBIZ VAPT web finding tracker.

## What This Changes
- The submitted SGEBIZ web report/finding tracker should exclude `Hardcoded Sensitive Information Exposure in Client-Side JavaScript` from the formal client report unless Evvo intentionally keeps it as a non-production observation outside the final report body.
- This is a review-stage report-scope change on an active deliverable, not a new vulnerability, new engagement, or commercial state change.

## Notes
- Relevance: explicit client review decision on a named finding.
- Next step: Fang should confirm the tracker/report is revised and that any retained internal record clearly marks the issue as test-environment-only.
- Outlook evidence: https://outlook.office365.com/owa/?ItemID=AAMkAGFmNzJlMGI4LTc2NzAtNGQ1My05YmExLTg4ZmYzZDMyNGY5ZgBGAAAAAACHS31FtxaYSKyJHdwdC0XUBwC3a%2BcK0siASLZKmQDX%2F7SpAAAAAAEMAAC3a%2BcK0siASLZKmQDX%2F7SpAAD1UIw5AAA%3D&exvsurl=1&viewmodel=ReadMessageItem
