---
type: 'entity'
title: 'St Engineering'
sources:
  - 'm365-30min:2026-06-16T1630'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-16T08:35:41.457Z'
source_kind: 'mcp:put_page'
tags:
  - 'client'
  - 'sensor-buoy'
  - 'ssp'
  - 'st-engineering'
created: '2026-06-16T08:35:41.457Z'
---

# ST Engineering

ST Engineering Unmanned & Integrated Systems Pte. Ltd. — client for the Sensor Buoy Cybersecurity Project.

## Key Contacts
- Liew Jia Ying <jiaying.liew@stengg.com>
- Lim Yi Shu Brien <Brienlim@stengg.com> — UUS Department Manager / Project Manager
- Marco Nathaniel Lu Ng <marconathaniellu.ng@stengg.com>

## Active Projects

### Sensor Buoy Cybersecurity Project
- **Scope:** System Security Plan (SSP) for MPA's Sensor Buoy system
- **Classification:** Low-Risk Cloud, Official (Open), Non-Sensitive
- **Status:** SSP draft in progress — clarifications exchanged

#### 2026-06-16 Updates (from Jia Ying response)
Key clarifications received:
- ESP & RMP systems: Developed and owned by MPA
- Buoy System CSCI: Developed and maintained by STE; patch updates by STE post-handover
- API keys: Only certificate authority keys exist; API keys may not be required
- **Data Logger encryption gap:** Currently NO AES-256 encryption for data at rest. STE asked Evvo for recommendations
- Customer-managed keys: Required by MPA
- Shore Site scope: STE manages Shore Site system + Data Logger-to-Shore Site connection
- Post-handover: Security monitoring → MPA; patch updates → STE; STE has no log visibility unless authorized

#### Open Items
- [ ] Provide AES-256 encryption recommendations for Data Logger
- [ ] Finalize SSP Section E (Application Security) applicability notes
- [ ] Address IM8 control gaps identified in questionnaire

## Notes
- SSP classification confirmed as Low-Risk Cloud / Official (Open), Non-Sensitive
- TeamViewer remote access flagged as risk — needs formal risk assessment if required
