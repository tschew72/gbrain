---
type: 'decision'
title: '2026 06 18 Enable Enrich Thin'
date: '2026-06-18T00:00:00.000Z'
author: 'vince'
status: 'active'
trigger: '151/156 pages are orphans; digest only captures signal-curated entities (3-4/day); dream cycle propose_takes only inserts ~4 proposals/night'
decided_in: '#vince-digest'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-18T00:40:28.688Z'
source_kind: 'mcp:put_page'
created: '2026-06-18T00:00:00.000Z'
---

# Decision: Enable `cycle.enrich_thin` in GBrain

**Shipped:** 2026-06-18 08:38 SGT
**Command:** `gbrain config set cycle.enrich_thin.enabled true`
**Verified:** `gbrain config get cycle.enrich_thin.enabled` → `true`

## Context

Audit of GBrain enrichment coverage (2026-06-18 08:35 SGT, #vince-digest):

- 96 entity pages, 18 project pages, 19 decision pages exist
- **151/156 pages are orphans** (no inbound links)
- `enrich_thin` phase: **disabled by default** (key was unset)
- `conversation_facts_backfill`: disabled
- `synthesize` / `synthesize_concepts`: skipped (not in active pack)
- Digest (M365 30-min) covers ~3-4 entities/day, signal-curated only
- Dream cycle `propose_takes` covers 100 pages/night, ~4 proposals/night

Net: long tail of orphan pages was not being enriched by any automated path.

## Why now

Vince asked "Are you enriching Gbrain for all entities?" — answer was honestly "partial, 151 orphans untouched." Direct call: "Yes flip it on." Decision made and executed in the same turn.

## What changes

- Tonight's 23:00 SGT dream cycle (next scheduled) will run the `enrich_thin` phase
- Affects thin pages — typically the orphans, sparse stubs, and stub-entity pages from the orphan linker (10 created 2026-06-18)
- Will make LLM calls per page (no built-in budget cap visible in `gbrain config show`)

## Cost watch

- `models.tier.subagent` = `minimax:MiniMax-M3` → $0.3/M input, $1.2/M output
- 151 candidate pages × unknown tokens/page
- **No budget cap currently set.** If first enriched cycle burns unexpectedly, set `cycle.enrich_thin.budget_usd` or page-count cap.

## Verification plan

- 2026-06-19 23:30 SGT: check first enriched cycle's `enrich_thin` phase result
- Compare orphan count before/after
- If no improvement → re-evaluate; the phase may need a prompt or page-coverage fix

## Related

- M365 digest → GBrain merge pipeline (active)
- Orphan linker (weekly Sun 3:30 AM SGT, cron `29d975be-...`)
- 2026-06-18 08:16 SGT: v0.32.2 fence backfill landed (46 legacy facts unfenced, no longer blocking `extract_facts`)

Source: `#vince-digest` 2026-06-18 08:35-08:38 SGT, conversation with V!₦©€
