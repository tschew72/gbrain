---
type: 'playbook'
title: 'Deepline Sdk Cli And Quickstart Run 2026 06 10'
domain: 'tooling'
status: 'active'
audience:
  - 'main'
  - 'sales'
  - 'dev'
last-updated: '2026-06-10T00:00:00.000Z'
created: '2026-06-10T00:00:00.000Z'
---

# Deepline Quickstart Run — End-to-End Playbook (2026-06-10)

## TL;DR
The Python CLI install from the deepline quickstart is a **partial install**. The real "plays" and "tools execute" commands live in a **separate SDK CLI** (Node.js, npm-installed). Both CLIs coexist; SDK CLI is the default `deepline` on PATH. The legacy Python CLI is shadowed at `/root/.local/bin/deepline`. Always use the SDK CLI for `/deepline-gtm` execution.

## Install order (MUST be this sequence)
1. `curl -s https://code.deepline.com/api/v2/cli/install | bash` with `DEEPLINE_INSTALLER_SKIP_AUTH=true DEEPLINE_INSTALLER_SKIP_QUICKSTART=true` — installs Python CLI shim at `/root/.local/bin/deepline` and skills at `~/.agents/skills/`
2. `npm install -g deepline@latest` — installs SDK CLI at `/usr/bin/deepline` (v0.1.90 as of 2026-06-10)
3. `npx --yes skills add https://code.deepline.com/.well-known/skills/index.json --agent codex claude-code cursor --global --yes --skill deepline-plays --full-depth` — installs `deepline-plays` skill at `~/.agents/skills/deepline-plays/SKILL.md`
4. Wire `deepline-plays` into skill registry: add `deepline_plays` entry to `sales`, `marketing`, `cfo`, `dev`, `main` agents in `03-EXECUTION/skill-audit/skill-registry.json`. Backup first. Restart `pm2 restart skill-router-mcp` to flush cache.

## Auth state evolution (Vince's "Vince's Team" workspace)
- During install (SKIP_AUTH=true): "not connected"
- ~5 min after first deepline command: "pending — claim issued, awaiting browser approval"
- ~10 min after first deepline command: "claimed" with `DEEPLINE_API_KEY` written to `~/.local/deepline/code-deepline-com/.env`
- **No browser action was required** — deepline auto-claims a default workspace on install. Workspace email auto-resolves from the install context.

## Quickstart GTM Run pattern (worked end-to-end 2026-06-10)

### Phase 0 — Research (manual, deepline not yet auth'd)
- Use `web_search` (perplexity fallback) + `web_fetch` for company/founder/LinkedIn research
- 5 leads × ~30 min total research
- Deliverable: markdown + CSV with `first_name, last_name, company, title, linkedin_url, signal_summary, email_subject, email_first_line`

### Phase A — Enrichment (deepline plays, native)
- Build input CSV: `first_name, last_name, company, linkedin_url, domain` (verify domain from company site)
- Play: `deepline plays run prebuilt/person-linkedin-to-email-waterfall --input <input.csv> --watch`
- Cost: ~0.3-1.0 credits per row (Prospeo cheap, deepline_native more expensive)
- Cap at 5 credits per run to preserve balance
- All 5 emails found in primary providers, no fallback needed

### Phase B — Multi-touch sequences
- 5 leads × 7 touches (LinkedIn connect + 3 LI follow-ups + 3 emails + LI breakup) = 35 messages
- Voice: Hook → Value → Proof → CTA per `outreach-drafter` SKILL
- Each touch signal-specific (no generic opens)
- Deliverables: `.md` (per-lead full packs, 580+ lines) + `.csv` (one row per touch, importable to Instantly/HeyReach/Smartlead)

### Phase C — Instantly push (blocked on API key)
- `INSTANTLY_API_KEY` required (Growth plan+)
- Sam produces `instantly-integration-plan.md` covering: CSV fields, campaign design, webhook reply routing, what's missing
- 5 decision items for Max: API key, campaign structure, LinkedIn scope, lead magnet, warmed sending accounts

## Cost reality (2026-06-10)
- Starting balance: 24.6 credits ($2.46 USD)
- Phase A actual: 2.79 credits (1.5-2.0 expected; deepline_native for Sam Yang = 1.0 credit)
- End balance: 21.81 credits ($2.18 USD)
- Sam Yang's row used deepline_native because Prospeo didn't have him — note for future: Nova Intelligence's domain/team may not be in the cheaper providers yet

## Phase 0 deliverable
- `ops/deepline-install-and-auth-2026-06-10` (this run's auth + manual fallback story)

## Sam's actual outputs (2026-06-10)
- `03-EXECUTION/sam-output/series-a-ai-sf-5leads-2026-06-10.md` (16KB, Phase 0)
- `03-EXECUTION/sam-output/series-a-ai-sf-5leads-2026-06-10.csv` (3KB, Phase 0)
- `03-EXECUTION/sam-output/series-a-ai-sf-5leads-2026-06-10-enrichment-input.csv` (458B)
- `03-EXECUTION/sam-output/series-a-ai-sf-5leads-2026-06-10-enriched.csv` (1KB, with run_ids)
- `03-EXECUTION/sam-output/series-a-ai-sf-5leads-2026-06-10-sequences.md` (26KB, 582 lines)
- `03-EXECUTION/sam-output/series-a-ai-sf-5leads-2026-06-10-sequences.csv` (26KB, 35 touches)
- `03-EXECUTION/sam-output/instantly-integration-plan.md` (15KB, 287 lines)
- `03-EXECUTION/skill-audit/skill-usage.json` (audit log)

## Lesson: deepline auth is a "wait for it" pattern
The deepline server self-claims a default workspace on install. The "auth pending" state is brief (5-10 min). Don't panic if `auth status` returns "pending" right after install — re-check 5-10 min later. The legacy Python CLI's "skip auth" path is safe; the SDK CLI just inherits the claim.

## Lesson: split CLI is by design
The Python CLI is a "lite" CLI (auth, billing, session, customer-db, feedback). The SDK CLI is the "full" CLI (tools, plays, runs, secrets, enrich). The deepline-gtm skill targets the SDK CLI. Install both; use the SDK one for execution.
