---
type: 'operations'
title: 'Deepline Install And Auth 2026 06 10'
domain: 'tooling'
status: 'resolved'
audience:
  - 'main'
  - 'sales'
  - 'cfo'
last-updated: '2026-06-10T00:00:00.000Z'
created: '2026-06-10T00:00:00.000Z'
---

# Deepline Install + Auth — 2026-06-10

## TL;DR
Deepline CLI is **fully functional** as of ~12:58 SGT 2026-06-10. `auth status` = "claimed". Workspace "Vince's Team" with 24.6 starter credits (~$2.46 USD). 18 skill router entries added. **No browser action was required from Vince** — deepline auto-claims a default workspace on install.

## Install timeline
1. `curl -s https://code.deepline.com/api/v2/cli/install | bash` with `DEEPLINE_INSTALLER_SKIP_AUTH=true DEEPLINE_INSTALLER_SKIP_QUICKSTART=true`
2. Verified: binary at `/root/.local/bin/deepline` (1.5MB Python shiv), version `prod-af1a2ed121e1f31ace1c1212f18d850a23911d7382e15b54f758e87e8b6a758a`, host `https://code.deepline.com` v2 ok
3. Installed skills (symlinked `~/.claude/skills/`, originals at `~/.agents/skills/`): `deepline-gtm`, `deepline-analytics`, `deepline-feedback`, `deepline-quickstart`, `clay-to-deepline`, `build-tam`
4. Added 18 entries to skill-registry.json across `sales`, `marketing`, `cfo`, `main`. Backup: `skill-registry.json.bak-2026-06-10-deepline`. `pm2 restart skill-router-mcp` to flush cache.
5. Updated TOOLS.md with Deepline section

## Auth state evolution
- 12:41 SGT: `Status: not connected` (skipped auth at install)
- ~12:55 SGT (during Sam's run): `pending — claim issued, awaiting browser approval`
- 12:58 SGT (after Sam's run): `Status: claimed` with `DEEPLINE_API_KEY=dlp_ce9f73baebd7b1fe0c4a4ad006af8b643600515ca8d0d6fd` in `/root/.local/deepline/code-deepline-com/.env`
- Workspace: `Vince's Team` (slug `vince-s-team`), user email `vince@infinitevalueventures.com` (auto-resolved from install context)
- 24.6 starter credits (~$2.46 USD) — trial balance
- `deepline billing balance` works
- `deepline tools execute` works (provider-prefixed, e.g. `dropleads_search_people`, `apollo_search_people_with_match`)

## Lesson: manual-fallback was unnecessary
The deepline server self-claims on install for new workspaces — no browser approval needed. The "auth pending" mid-run check was the server catching up. **Future /deepline-gtm tasks can go 100% native from the start.** The manual web_search/web_fallback used by Sam on 2026-06-10 was conservative but not strictly necessary; the deepline API was already callable by the time Sam wrapped.

## Action: re-test on next lead task
Next time a /deepline-gtm task lands, re-check `deepline auth status` immediately and use native deepline tools (Apollo, Hunter, Prospeo, etc.) instead of web_search. Only fall back to manual if a specific provider call returns an error.

## Deliverables from 2026-06-10 Sam run
- 5 Series A AI SF leads with verified funding + LinkedIn URLs + signal-specific cold email first lines
- Output: `03-EXECUTION/sam-output/series-a-ai-sf-5leads-2026-06-10.md` (16KB) + `.csv` (3KB, Instantly-ready)
- Companies: Town, Judgment Labs, Fazeshift, Nova Intelligence, Phonely
- Total indicative pipeline: SGD 330K–620K across the 5 (ISO 27001 + VAPT + CISOaaS angles)
- All 5 verified against 2+ independent sources; LinkedIn URLs validated

## Related
- TOOLS.md section (Deepline block, 2026-06-10)
- `03-EXECUTION/skill-audit/skill-registry.json.bak-2026-06-10-deepline` (pre-change registry backup)
- Sam's skill-usage log: `03-EXECUTION/skill-audit/skill-usage.json`
