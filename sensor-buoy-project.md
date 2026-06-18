---
type: entity
title: Sensor Buoy Project
sources:
  - 'm365-30min:2026-06-16T1630'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-16T08:35:57.843Z'
source_kind: 'mcp:put_page'
tags:
  - mpa
  - project
  - sensor-buoy
  - ssp
  - st-engineering
---

# Sensor Buoy Cybersecurity Project

Cybersecurity consulting engagement for MPA's Sensor Buoy system, delivered via ST Engineering.

## Scope
- Develop System Security Plan (SSP) for Sensor Buoy system
- IM8 controls compliance for Low-Risk Cloud classification
- Classification: Official (Open), Non-Sensitive

## System Components
- **ESP & RMP systems:** Developed and owned by MPA
- **Buoy System CSCI:** Developed and maintained by STE
- **Data Logger:** Windows 11 processor — currently lacks AES-256 encryption at rest
- **Shore Site:** Managed by STE (firewall, L3VPN, 5G router)

## Status
- SSP draft in progress
- Clarification questionnaire exchanged (2026-06-09 from Kailash, 2026-06-16 response from Jia Ying)

## Critical Gaps Identified (2026-06-16)
1. **Data Logger encryption:** No AES-256 for data at rest — Evvo needs to provide recommendations
2. **Application Security (Section E):** STE marked as N/A — Evvo flagged this would block MPA/CSA review
3. **TeamViewer remote access:** Additional 3rd party remote path over public Internet — needs formal risk assessment

## Timeline
- Kick-off: ~April 2026
- Questionnaire: 2026-04-24 (Kailash)
- Clarification round 1: 2026-06-09 (Kailash)
- Response received: 2026-06-16 (Jia Ying)
