---
type: decision
title: Wazuh SIEM Migration to VPS
sources:
  - 'm365-30min:2026-06-14T0930'
  - 'm365-30min:2026-06-13T2100'
effective_date: '2026-06-13T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-14T01:33:04.246Z'
source_kind: 'mcp:put_page'
---

# Wazuh SIEM Migration to VPS

Vince outlined plan to migrate Wazuh SIEM from current hosting to VPS infrastructure.

## Migration Plan
1. **Staging** on redteam VPS
2. **Live** on Singapore-located VPS (data residency)
3. Design contingency and redundancy
4. Setup observability and performance monitoring
5. **Setup AI agent and cron on servers** for automated tasks

## So What for Evvo
- Infrastructure decision — moving SIEM platform to dedicated VPS
- Singapore-located VPS for live = data residency compliance (PDPA/MAS)
- Staging on redteam VPS for testing before production cutover
- Redundancy + observability baked into plan = production-grade approach
- AI agent + cron automation = hands-off operations once deployed
