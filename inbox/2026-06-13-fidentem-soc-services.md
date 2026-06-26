---
type: 'concept'
title: '2026 06 13 Fidentem Soc Services'
sources:
  - 'm365-30min:2026-06-13T2000'
  - 'm365-30min:2026-06-15T1400'
  - 'm365-30min:2026-06-15T1635'
effective_date: '2026-06-15T08:35:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-15T08:40:08.169Z'
source_kind: 'mcp:put_page'
created: '2026-06-15T08:40:08.169Z'
---

# Fidentem SOC Services — SDC/Supplier Role Discussion

## Context
Internal discussion (Kailash, Anna) about SOC service tier model for Fidentem. Key questions:
1. Would SDC (Evvo's VN SOC) configure the tenant, deploy collectors/agents, and configure storage requirements based on Evvo SG-provided infrastructure?
2. Anna confirmed: SDC configures tenant, suppliers provide support

## Key People
- **Kailash Amin** — driving commercial/scope clarification
- **Nu Nguyen (Anna)** — clarifying SDC role vs supplier role
- **Jerome Briggs** (Fidentem side, jerome.briggs@fidentem.com) — technical reviewer driving deployment questions

## Status
- Anna answered Kailash's questions on Jun 10
- Kailash acknowledged: "Thanks, that helps me"
- Next step: Kailash to formalize SOC service tiers for Fidentem proposal
- **2026-06-15 14:35 SGT:** Jerome Briggs sent follow-up technical questions on Wazuh agent deployment scope (modules per host: log collection only, or also FIM, SCA, vulnerability detection?). Indicates deal is moving to technical scoping phase.
- **2026-06-15 16:35 SGT:** Kailash replied to Jerome — "Noted and thanks for the details. Allow me to get back to you with our response on these questions along with the revised proposal." (CC Ravi Kannusamy, Jerome Briggs) → Kailash is now drafting the revised Fidentem proposal, due back to Jerome.

## So What
This is about productizing the SOC tier model — SDC (Vietnam SOC) handles tenant setup/config, while Evvo SG provides infrastructure. Important for scaling SOC services to new clients.

Wazuh module scope question = deal progressing past commercial into technical deployment design. Kailash needs to answer what modules are "in scope" for the Fidentem service tier — this directly shapes the SOC pricing model and SDC's operational load.

**2026-06-15 16:35 update:** Deal is now in active proposal-revision phase. Kailash's commitment to deliver "revised proposal" indicates the Fidentem SOC engagement is being actively scoped for commercial close. Watch for next inbound (revised proposal from Kailash → Jerome).

## Cross-references
- Wazuh SIEM Migration to VPS (`sent/2026-06-13-wazuh-vps-migration`) — infrastructure backbone for Fidentem SOC
- Kailash Amin (need to confirm slug) — owner
