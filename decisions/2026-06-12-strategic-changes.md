---
type: decision
title: 2026 06 12 Strategic Changes
date: '2026-06-12T00:00:00.000Z'
domain: strategic
source: vince-direct
status: active
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-12T00:51:37.919Z'
source_kind: 'mcp:put_page'
tags:
  - feed
  - product
  - promptdome
  - vietnam
---

# Strategic decisions — 2026-06-12

Three decisions confirmed by Vince in #pr-headroom (channel 1514404036600795157), 08:48 SGT.

## 1. PromptDome — end as product and service

Evvo Labs will no longer offer PromptDome as a product or service.

**Open scope questions (pending Vince confirmation):**
- Full wind-down (kill all crons, archive repos, sunset website, exit clients) — vs —
- Stop new sales only (keep infra + existing clients, just stop pitching)
- Timeline: immediate / 30-day / 90-day

**Downstream surface area (mapped, awaiting scope):**
- promptdome.cyberforge.one (port 3011) — live
- GitHub repos: tschew72/promptdome (Next.js), tschew72/shield-engine-core (engine)
- 4 active crons: Shield Engine Morning (08:05 SGT), Gap Research (Mon/Wed/Fri 14:00), Auto-test (23:45), Nightly Full Regression (23:30)
- 6-reviewer PR gate (Umi, Bea, Kai, Quinn, Rex, Arsen) on shield-engine-core
- TestForge shield-engine integration
- Website copy: promptdome.cyberforge.one, infinitecybersecurity.com
- Consulting catalog: any PromptDome service entries
- Marketing/blog: existing content

## 2. Feeds — narrow to VN-SEA-OPPORTUNITIES

Of the 3 monitors proposed earlier (evvo-sg-cyber, promptdome-threats, vn-sea-opportunities):
- promptdome-threats: dropped (PromptDome ending)
- evvo-sg-cyber: dropped/deprioritized
- **vn-sea-opportunities: the focus** — single monitor going forward

This is the combined scope of the prior aileen-vn-bd + anna-vn-ops monitors. Briefs at `/root/.newsjack/monitors/aileen-vn-bd/brief.md` and `/root/.newsjack/monitors/anna-vn-ops/brief.md` will be merged into a new `vn-sea-opportunities` brief.

## 3. Feed delivery — Microsoft Teams chat, not Discord

Tested and confirmed working:
- Chat ID: `19:a376f196711f4ca4bfdac53988158e50@thread.v2`
- Chat topic: "Do less, Think BIG, Execute flawlessly"
- Chat type: group (likely Vince + Vietnam team — Aileen, Anna, Loan)
- Test message sent (id 1781225368845) as part of this turn
- Token: `/root/.outlook-mcp/credentials.json` (Chat.ReadWrite scope, 87-min lifetime, refresh available via o365-token-manager.py)

Channel is NOT #pr-headroom. Discord is for Max/Vince internal coordination; Teams is the Vietnam-team operational surface.

## Cross-references
- prior monitor briefs: `/root/.newsjack/monitors/{aileen-vn-bd,anna-vn-ops}/brief.md`
- prior cron (now removed): `d1c41937-…` (aileen), `d11aa035-…` (anna)
- M365 token manager: `/root/projects/max-workspace/sysadmin/o365-token-manager.py`
- existing Teams-posting patterns: `/root/projects/max-workspace/teams_channels_digest.py`, `m365_digest/digest_engine.py`

## Source
- Direct conversation with Vince, #pr-headroom, 2026-06-12 08:48 SGT
- Confirmation message_id: 1514793405945741485
