---
type: note
title: EDB Baiduspider Bot Access Control Exception
sources:
  - 'm365-30min:2026-06-17T0730'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-16T23:39:49.148Z'
source_kind: 'mcp:put_page'
---

# EDB Baiduspider Bot Access Control Exception

**Context**: EDB (Economic Development Board) China SEO team reported that Baidu Webmaster Tools (WMT) verification was failing. The root cause was identified as Imperva's bot challenge (REQ_CHALLENGE_JAVASCRIPT) being applied to Baiduspider requests, which cannot execute JavaScript.

**Action taken by Evvo SOC team** (Fuad Zulkifli, 2026-06-17 ~07:27 SGT):
1. Created an exception in Bot Access Control settings for `Baiduspider` user-agent
2. Created a rule to allow Baiduspider for the specific verification path: `/baidu_verify_codeva-mgxgIfxZ1.html`
3. Requested EDB team to verify and report any issues

**Stakeholders involved**:
- Max CHUA (EDB) — primary contact
- Fuad Zulkifli (Evvo SOC) — ops lead
- Samuel Ong (Evvo SOC) — earlier log delivery
- Jack Boey, Annabelle LIM, Freddy HO, Wani RAZAK, Meng Li NG (EDB)
- Ishara VIDHANAHENA, Praveen WILSON, Aaron VALLESER (NCS vendor)

**Related systems**: Imperva WAF, EDB website, Baidu WMT
**Request ID**: ##23035##
