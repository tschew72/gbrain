---
type: concept
title: Beyondwealth
created: '2026-06-15T08:40:20.252Z'
sources:
  - 'm365-30min:2026-06-15T1300'
  - 'm365-30min:2026-06-15T1614'
  - 'phuong-30min:2026-06-22T1503'
  - 'phuong-30min:2026-06-26T1830'
  - 'phuong-30min:2026-07-09T2304'
ingested_at: '2026-07-09T15:06:38.618Z'
source_kind: 'mcp:put_page'
ingested_via: 'mcp:put_page'
effective_date: '2026-06-15T08:14:00.000Z'
---

# BeyondWealth Management Pte Ltd

**Contact:** Jason Tan — Business Operation / Business Development Senior Manager
**Email:** jasontan@beyondwealthfa.onmicrosoft.com
**Address:** 51 Goldhill Plaza #22-09, Singapore 308900

## Context
- BeyondWealth is engaged with Evvo under a CEM (Client Engagement Management) weekly reporting cadence
- **2026-06-15 13:00 SGT:** Jason Tan requested a copy of the **Post Incident Report (PIR) format for Incident Response** from Fang
- This signals BeyondWealth may be evaluating or needing IR capabilities — potential upsell opportunity
- **2026-06-15 16:14 SGT:** Fang replied to Jason — "Please find attached our Incident Response Plan template for your reference. The Post-Incident Report format can be found in Appendix B of the document" → open item closed: PIR format shared.

## 2026-06-22 Audit Evidence Clarification
- Fang clarified that BeyondWealth can submit door entry/exit logs, access card records, or an authorized-personnel list as physical-access evidence for the office or device-storage areas.
- Fang advised Jason Tan to check with Singtel on firewall-log exportability; if unavailable, Windows Event Viewer exports or existing Windows log backups are acceptable fallback evidence.
- This closes the earlier ambiguity around which access-control and logging artefacts BeyondWealth should collect for audit support.

## 2026-06-26 Audit Pack Near-Closure
- Jason Tan sent the latest audit-evidence pack and said it now covers almost every outstanding point.
- Two evidence gaps remain explicitly open: admin-account screenshots/controls and physical-access logs.
- BeyondWealth asked for a final close-out meeting on **Tuesday, 2026-06-30** to tie up the audit before a planned **mid-July Guardian audit**.
- Jason said the client attached training slides plus attendance, a sample access-request form, and supporting Microsoft Entra password-policy and lockout-policy white papers because their M365 plan does not expose configurable password-policy or lockout settings.
- Jason clarified that the admin account is managed by the CEO, with no other staff holding permanent or temporary admin access.
- Jason asked Fang to advise whether disabled ex-staff accounts still need quarterly review treatment and whether BeyondWealth can standardize on non-passphrase passwords to match the default M365 policy.

## 2026-07-09 NDA + External Audit Update
- **Kailash Amin flagged** that BeyondWealth has an external audit coming up and asked Fang about NDA status.
- **Vince Chew** noted he was involved at the beginning of the BeyondWealth engagement and may need a few days advance notice for future contributions.
- **Phuong/Fang** escalated NDA question to Kailash — Vince needs time to locate the previous NDA; interim suggestion was to ask client to sign a new one.
- **Kailash** indicated Evvo has a standard MNDA template and suggested using that instead of ad-hoc approaches. Suggested checking with Jason who triggered a DocuSign to Rodney.
- Signal: BeyondWealth external audit is active and NDA status needs resolution before audit proceeds.

## So What for Evvo
- Client is asking about IR PIR templates — indicates either active incidents or proactive IR readiness planning
- If Evvo doesn't yet offer IR retainers to BeyondWealth, this is a direct upsell opening
- CEM weekly reporting cadence = active managed relationship, trust established
- **Fang's response** = standard IR template + Appendix B PIR reference. This positions Evvo as the IR subject-matter expert; future IR retainer conversation is now seeded.
- **2026-07-09:** NDA status is unresolved. Evvo should either locate the old NDA or get a new MNDA signed urgently before the external audit.

## Open Items
- [x] Did Fang share the PIR format with Jason? — **YES, 16:14 SGT (Appendix B of IR plan template)**
- [ ] Is BeyondWealth responding to a specific incident, or building proactive capability?
- [ ] Should Evvo position a formal IR retainer proposal?
- [ ] Review the remaining evidence gap around admin-account screenshots/controls and physical-access logs before the 2026-06-30 wrap-up.
- [ ] Give BeyondWealth a clear answer on disabled-account review expectations and whether non-passphrase password standardization is acceptable for the audit.
- [ ] **NEW 2026-07-09:** Resolve NDA status — locate old NDA or get new MNDA signed before external audit.

## Facts

<!--- gbrain:facts:begin -->
| # | claim | kind | confidence | visibility | notability | valid_from | valid_until | source | context |
|---|-------|------|------------|------------|------------|------------|-------------|--------|---------|
| 1 | BeyondWealth is Completed; remove from Active and At Risk sections | event | 1.0 | private | medium | 2026-07-22 |  | mcp:put_page |  |
| 2 | BeyondWealth project status is Completed | fact | 1.0 | world | medium | 2026-07-22 |  | mcp:extract_facts |  |
<!--- gbrain:facts:end -->
