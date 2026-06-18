---
type: entity
title: Psac Tender 4018931 Amendment1
sources:
  - 'm365-30min:2026-06-15T1637'
  - 'm365-30min:2026-06-15T1657'
  - 'm365-30min:2026-06-15T1641'
effective_date: '2026-06-15T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-15T09:07:27.379Z'
source_kind: 'mcp:put_page'
tags:
  - db-monitoring
  - decision
  - inbox
  - pam
  - psac
  - psa-corporation
  - remote-access
  - skip
  - tender
---

# PSAC Tender 4018931 — Amendment 1 (PAM, Remote Access, DB Monitoring Renewals)

**Tender:** 2026/ICP/CS/PSAC/4018931 — PAM, REMOTE ACCESS AND DB MONITORING RENEWALS
**Amendment:** 1
**Source:** Oracle Cloud workflow email (JASMINE CHUA via emft.fa.sender@workflow.email.ap-singapore-1.ocs.oraclecloud.com)
**End customer:** PSA Corporation (port operator)
**Channel:** Direct (PSAC government tender)

## Timeline
- **2026-06-12 10:17 SGT:** Amendment 1 notification received via Oracle procurement workflow
- **2026-06-13 22:11 UTC (06:11 SGT 2026-06-14):** Vince forwarded the amendment asking "Anything we have to follow up on?"
- **2026-06-14 06:30 SGT:** Delta ingest confirms Vince is awaiting team response on follow-up actions
- **2026-06-15 16:41 SGT:** **Kailash Amin (Evvo)** replied to Vince — confirmed no action needed, project is license renewal with incumbent-protected pricing, no chance of winning.
- **2026-06-15 16:57 SGT:** **Ryan Villegas (Evvo)** replied to Vince — confirmed they had decided not to participate; incumbent partner is currently protected + price-protected on these renewals.

## Status
✅ **DECIDED: SKIP** (2026-06-15 16:57 SGT)
- Both Kailash and RV independently confirmed no-bid
- Reason: incumbent partner is protected on renewals + has price protection
- Amendment 1 = standard renewal-cycle paperwork, not a new bid opportunity

## Context
Government tender (PSAC) for renewal of:
- PAM (Privileged Access Management)
- Remote Access solutions
- Database Monitoring

## So What
- **Saved bid-cost.** Confirming no-go on a protected renewal means Evvo didn't burn team hours on a no-bid scenario.
- **Lessons:** PSAC Amendment 1s are typically admin-style renewals, not new opportunities. Worth filtering out at the workflow-email layer in future.
- **End-customer context:** PSA Corporation is a port operator — Evvo's no-bid here means we're not exposed to port-critical-infrastructure wins (which is a gap if we want broader SG critical-infra footprint).
- **Vince action:** No reply needed. Archive thread. Move on.

## Open Items
- [x] Vince reply not needed — both Kailash and RV confirmed
- [ ] Archive thread after audit window
- [ ] Future: tag PSAC emails as "likely-incumbent-protected" if pattern repeats
