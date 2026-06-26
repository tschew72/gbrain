---
type: 'entity'
title: 'SGEBIZ VAPT'
sources:
  - 'm365-30min:2026-06-16T1730'
  - 'm365-teams-30min:2026-06-17T1200'
  - 'm365-30min:2026-06-17T1600'
  - 'phuong-30min:2026-06-26T1233'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-17T08:07:56.619Z'
source_kind: 'mcp:put_page'
tags:
  - 'active-engagement'
  - 'client'
  - 'vapt'
created: '2026-06-17T08:07:56.619Z'
---

# SGEBIZ VAPT Project

## Overview
VAPT engagement with SGEBIZ (Singapore e-Business). Cross-entity deal: Evvo Labs Vietnam ↔ Evvo Labs PTE Ltd. Contract No. 31/2026/HĐDV.

## Status & Timeline
- **2026-06-09** — Contract initiated (Loan Nguyen thread)
- **2026-06-11** — Contract finalized (Ryan Villegas)
- **2026-06-09 13:48 SGT** — Web VAPT kickoff: Fang ack'd receipt, PT activities commenced
- **2026-06-12** — Mobile scope reminder: Android + iOS info pending from client
- **2026-06-15** — Client provided mobile app info (1 day late vs internal target)
- **2026-06-16 12:42 SGT** — Revised mobile schedule proposed to client:
  - **23 June**: Finding Tracker submission
  - **24–30 June**: Remediation period
  - **1–7 July**: Retest + Final Report submission
- **2026-06-17 11:37 SGT** — Dung Bui (Andrew) shared **Finding Tracker (Web + Network)** for Vince's review via Teams
- **2026-06-17 15:42 SGT** — Phuong Cao (Fang) submitted **Web App + Network Finding Tracker** to Suyog Bagul (client) via email. Password shared separately for confidentiality

## Finding Tracker Review (2026-06-17)
- **Hardcoded Sensitive Information Exposure in Client-Side JavaScript** — vendor rated **Critical**, Evvo adjusted to **High** (unable to validate direct exploitation of exposed credentials, but disclosed information reveals application architecture, backend services, and trust relationships)
- **AWS Network Assessment** — vendor completed scan, **no findings identified**
- **Web Application Assessment** — findings under review by Vince

## Submission Status (2026-06-17)
- **Web App + Network Finding Tracker:** ✅ submitted to client (Suyog Bagul) by Fang 15:42 SGT
- **Mobile App Finding Tracker:** still pending, due 23 June per revised schedule

## Contact
- **Client**: Suyog Bagul <suyog@sgebiz.com>, Nguyen Pham <nguyen@sgebiz.com>
- **PM (Evvo)**: Phuong Cao (Fang) <phuong.cao@evvolabs.com>
- **SecOps**: secops@evvolabs.com
- **Tech lead**: Kailash Amin <kailash.amin@evvolabs.com>
- **Finding tracker reviewer**: Dung Bui (Andrew)

## So What for Evvo
- Web App + Network Finding Tracker delivered to client — ahead of mobile scope
- Mobile finding tracker still on schedule (23 June)
- Client now has remediation window (24–30 June) to address findings before retest
- Confidentiality via separate password share — secure delivery practice
- Track for client confirmation of remediation and retest engagement start (1 July)

## Open Items
- [x] Web App + Network Finding Tracker submitted to client (Fang, 2026-06-17 15:42 SGT)
- [ ] Mobile app finding tracker due 23 June
- [ ] Remediation period 24–30 June
- [ ] Retest + Final Report 1–7 July
- [ ] Await client confirmation of remediation actions

## Client review update (2026-06-26)
- **2026-06-26 12:17 SGT** - Slack DM relay from Suyog Bagul told Fang not to include `Hardcoded Sensitive Information Exposure in Client-Side JavaScript` in the report because the point was only observed in the test environment.
- **What changed** - This is a report-scope decision on the already-submitted SGEBIZ web finding tracker, not a new vulnerability or new delivery thread.
- **Next step** - Confirm the formal report and tracker remove or explicitly reclassify the point as test-environment-only before final handoff.
