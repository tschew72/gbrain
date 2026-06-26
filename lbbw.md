---
type: 'entity'
title: 'LBBW - Red Team + VAPT'
sources:
  - 'm365-teams-30min:2026-06-17T1230'
  - 'phuong-30min:2026-06-26T1404'
  - 'phuong-30min:2026-06-26T1430'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-17T04:43:02.533Z'
source_kind: 'mcp:put_page'
tags:
  - 'client'
  - 'financial'
  - 'red-team'
  - 'vapt'
created: '2026-06-17T04:43:02.533Z'
---

# LBBW — Red Team Assessment + VAPT Project

Client: Landesbank Baden-Württemberg (LBBW), a German bank. Engagement through [EXPERT] EVVO - LEIZ team.

## Status (2026-06-17 12:30 SGT)

**KOM Preparation Phase**
- **12:10 SGT** — Phuong Cao (Fang) requested review of KOM slides in Teams channel "LBBW - RED TEAM"
- KOM covers both Red Team Assessment and VAPT projects
- Slides include VAPT scope details

### VAPT Scope
- **Type:** External Network (Blackbox - Remote)
- **IPs:** 16 devices
  - 2 load balancers
  - 2 firewall with IDS/IPS capabilities
- **Credentials testing:** Not needed
- **Device types:** Firewall, IDS, IPS, Load Balancers
- **Retest:** Yes × 1

### KOM Agenda
- Align on timeline and scope
- Client demo of in-scope environment
- Confirm basic project information
- Detailed information collection after KOM

### Team
- Evvo: Phuong Cao (Fang), Dung Bui (Andrew), Vo Duc Tin (Finn), tuan.it.1695
- SharePoint: LBBW_Kickoff_Meeting.pptx

## So What for Evvo
- High-value financial sector client (German bank)
- Dual engagement: Red Team + VAPT
- KOM is imminent — project is moving to execution phase
- 16 IP external blackbox scope with retest

## Status Update (2026-06-26 14:04 SGT)
- Amir Guzman replied in the kickoff recap thread that the required account details had already been sent in a separate email.
- This does not change the LBBW Red Team + VAPT scope, but it confirms the post-kickoff prerequisite handoff is actively moving.
- So what: access-readiness is progressing, so the next execution risk is validating the received details and keeping the test schedule on track.
- Source: `phuong-30min:2026-06-26T1404`

## Status Update (2026-06-26 14:30 SGT)
- Fang replied in the kickoff recap thread with Evvo's testing source IP `122.11.242.236` for whitelisting and said the Red Team questionnaire will follow as soon as it is ready.
- This does not change the LBBW Red Team + VAPT scope, but it converts the earlier access-handoff thread into explicit environment-readiness and requirement-gathering work.
- So what: the client-side whitelisting step is now on the critical path, while Evvo still owes the questionnaire to keep the Red Team start on track.
- Source: `phuong-30min:2026-06-26T1430`
