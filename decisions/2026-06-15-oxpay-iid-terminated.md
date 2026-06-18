---
type: decision
title: 2026 06 15 Oxpay Iid Terminated
status: resolved
created: '2026-06-15T03:33:00.000Z'
sources:
  - 'm365-30min:2026-06-15T1130'
  - 'm365-30min:2026-06-12T1719'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-15T03:37:27.313Z'
source_kind: 'mcp:put_page'
tags:
  - contract
  - danang
  - dec
  - oxpay
  - vietnam
---

# Oxpay / IID Contract Termination

## Decision (2026-06-15)
**Evvo Labs has announced contract termination with IID (likely a Vietnamese cyber monitoring/IDS service) for the Oxpay engagement, effective 2026-06-15 morning.**

## Provenance
- **2026-06-15 11:23 SGT** — Nu Nguyen (Anna) to Vince Chew: *"As discussed with Andrew, we already announce contract termination with IID this morning"*
- **2026-06-15 11:12 SGT** — Vince Chew forwarded the original DDS weekly report to Anna: *"Pls check if IID is still required"*
- **2026-06-13 08:51 SGT** — Vince Chew forwarded same report to Dung Bui (Andrew): *"Do we still need IID since we already have moved server"*
- **2026-06-12 17:19 SGT** — Original report from Nguyễn Chánh Nhật Minh (`minhncn@danang.gov.vn`, Da Nang DDS team) — Oxpay weekly ATTT monitoring report Jun 4-10

## Trigger / Context
- Da Nang government (via DDS) provides weekly cybersecurity monitoring reports for Oxpay
- Oxpay server migration was completed — relevance of IID service under question
- Vince's two-layer check (Andrew → Anna) confirmed IID is no longer required
- **Action taken:** IID contract terminated same morning, 2026-06-15

## Why IID (likely)
- IID = Internet/Intrusion Detection/Isolation Device (contextual inference — likely a managed detection / monitoring service for the Evvo-hosted Oxpay infrastructure)
- The Da Nang DDS weekly reports covered ATTT (An toàn thông tin) supervision of Oxpay — a government monitoring activity

## So What for Evvo

- **Cost reduction** — IID was a recurring contract cost; termination saves ongoing spend
- **Compliance signal** — Da Nang government continues to monitor Oxpay via DDS; removing IID doesn't remove oversight, just changes who/what Evvo pays for monitoring
- **Need to confirm with Da Nang DDS (Nguyễn Chánh Nhật Minh)** — the regulator's expectation may need a formal response confirming the change. Anna should send a courtesy notice.
- **Documentation hygiene** — capture the change in Oxpay operational runbook so future audits can see when/why IID was dropped
- **Cross-reference** — the Da Nang DDS weekly cadence continues; if Oxpay's regulatory exposure changes, weekly reports should be archived in gbrain to track incident patterns

## Open Items
- Formal notice to Da Nang DDS not yet sent (Anna to action)
- Oxpay runbook update (Andrew)
- Final invoice/wind-down from IID vendor (Finance/Accounts)
