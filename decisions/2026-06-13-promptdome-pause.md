---
type: decision
title: 2026 06 13 Promptdome Pause
date: '2026-06-13T00:00:00.000Z'
status: wind-down-uniform
made_by: vince
project: promptdome
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-13T07:43:39.211Z'
source_kind: 'mcp:put_page'
tags:
  - freeze
  - promptdome
  - strategic-decision
  - structured-retirement
  - uniform
  - wind-down
---

# PromptDome Wind-Down — 2026-06-13 (uniform)

## Decision Trail
- **15:30 SGT** (msg 1515257128070287473) — "we will stop promptdome project for now"
- **15:35 SGT** (msg 1515258192169406555) — "wind down promptdome" → structured retirement confirmed
- **15:39 SGT** (msg 1515259366620659823) — "wind down for all" → apply uniformly, no customer segmentation

## Scope (ratified)
- **Wind down** PromptDome product (the Next.js wrapper at promptdome.cyberforge.one, port 3011)
- **`shield-engine-core` STAYS** — powers max-dashboard (dash.vincechew.me, port 3010). NOT a PromptDome component.
- **All customers treated uniformly** — no special handling, no segmentation
- All PromptDome-specific code/infra to be retired over a structured timeline

## Proposed Timeline (default; Bea's spec may adjust)
- **Day 0 (now):** Stop new sales + active dev. Code freeze. Customer notification begins.
- **Day 0-7:** Customer outreach (Maya to draft template) + data export/migration support.
- **Day 7-30:** Maintenance mode — security patches only, no new features.
- **Day 30:** Full decommission (DNS release, cert expiry, infra teardown, data deletion).

## In-Flight
- **Bea** writing wind-down spec at `/root/.openclaw/workspace/decisions/2026-06-13-promptdome-winddown-spec.md` — got the "for all" clarification mid-task. ETA ~3-5 min from update.

## Held (pending spec)
- **Pat** — WI status updates (cancel vs. freeze-on-maintenance)
- **Dev** — code freeze, tag last release, branch `maintenance/`, handoff runbook
- **Dex** — PM2 retention, DNS/cert for promptdome.cyberforge.one, cron retirement
- **Maya** — customer outreach template (now needed for all customers uniformly)

## Config Gotcha
- **ba agent's "max" thinking tier isn't supported by zai/glm-5.1** (max supported is "high"). Workaround: spawn with `thinking: "high"`. First spawn attempt failed; second with "high" succeeded (or in progress). Worth a config audit to fix the default — `openclaw config get agents.list` likely has ba misconfigured. Don't conflate with worker floor (which is `adaptive`).

## Linked
- MEMORY.md "PromptDome WIND-DOWN" section
- HEARTBEAT.md "🛑 PromptDome WIND-DOWN" section
- `shield-engine-core` (powers both PromptDome + max-dashboard)
- `max-dashboard` (dash.vincechew.me, port 3010)
- PromptDome infra: `promptdome.cyberforge.one` (port 3011)
- Surface area: 4 crons (Shield Engine Morning 08:05, Gap Research MWF 14:00, Auto-test 23:45, Nightly Full Regression 23:30), 2 repos (tschew72/promptdome + tschew72/shield-engine-core), 6-reviewer PR gate (Umi/Bea/Kai/Quinn/Rex/Arsen)
