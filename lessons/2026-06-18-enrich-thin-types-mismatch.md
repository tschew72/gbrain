---
type: 'lesson'
title: '2026 06 18 Enrich Thin Types Mismatch'
date: '2026-06-18T00:00:00.000Z'
author: 'vince (directed) / max (discovered + fixed)'
status: 'active'
trigger: 'enrich_thin phase running but finding 0 candidates after enabling'
severity: 'high'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-18T01:23:01.351Z'
source_kind: 'mcp:put_page'
created: '2026-06-18T00:00:00.000Z'
---

# Lesson: `enrich_thin` default types are wrong for gbrain-base-v2 data

**Shipped:** 2026-06-18 09:15 SGT

## Symptom

`cycle.enrich_thin.enabled = true` set, but the phase runs in 16ms and reports `candidates_considered: 0`. No pages get enriched. The cycle log shows `[cycle.enrich_thin] start / done` with no metrics between them.

## Root cause

`enrich_thin` phase default `types` is `["person", "company"]` — the v2 pack's primitive types. But the brain's `pages.type` column still has v1 classifications:
- 103 pages typed as `entity`
- 30 as `concept`
- 24 as `note`
- 22 as `decision`
- 18 as `project`
- 1 as `person` (!)
- 0 as `company`

Schema path-prefixes (`people/` → person, `companies/` → company) are not applied retroactively to existing pages' `type` column. So the candidate query `WHERE p.type = ANY($types)` matches only 1 page total (the 1 `person` row).

The schema pack is technically v2 (`gbrain-base-v2@1.0.0+b9bebaa4` per `schema_stats`), but the data is v1. The doctor and the live SQL layer disagree on the active pack — the doctor warns `"pack_upgrade_available: gbrain-base → gbrain-base-v2"` but the schema_stats already reports v2 active. Likely the v1→v2 transition wrote the new pack identity to the schema registry but did NOT migrate the data. The proper fix is a `gbrain migrate` / `gbrain apply-mutations` pass that re-classifies pages. The fast fix is to set the enrich_thin types to the v1 names that match the actual data.

## Fix applied

1. `gbrain config set cycle.enrich_thin.types '["entity","concept","project","note","decision","person","finding","lesson","extract_receipt"]'`
2. `gbrain config set cycle.enrich_thin.max_pages_per_tick 10` (default 3 was trickle; 10 is more useful for first pass)
3. Verified via `gbrain dream --phase enrich_thin --dry-run --json`:
   - **Before:** `candidates_considered: 0, would_enrich: 0`
   - **After:** `candidates_considered: 10, would_enrich: 10`

## What this enables

- Tonight's autopilot cycle (or whenever next 09:30 SGT cycle fires) will pick up to 10 thin pages per tick and call Kimi (via `ANTHROPIC_BASE_URL=https://api.kimi.com/coding/v1` set in the cron wrapper) to enrich them.
- Cost is bounded by `max_cost_usd = $1.00` per source per tick. 10 thin pages should fit comfortably.
- The longer-term fix is to migrate page types v1→v2 properly. Filed mentally; not blocking.

## Cost watch

- 132 orphan pages, of which many are <400 chars (the thin threshold)
- At 10/tick × 1 source × 30-min cadence = ~480 enrichments/day worst case (if all 10 are processed every tick)
- $1/tick cap × 48 ticks/day = $48/day max (won't actually hit this — LLM calls usually cost $0.005-0.05 per page)
- Realistic spend: maybe $1-5/day depending on thin-page count

## Related

- `decisions/2026-06-18-enable-enrich-thin` — the decision to enable the phase
- M3 rollout 2026-06-14 — M3 model is configured but the cron overrides to Kimi via env
- `findings/2026-06-14-gbrain-kimi-anthropic-bridge` — why we route gbrain LLM calls through Kimi

Source: `#vince-digest` 2026-06-18 09:00-09:15 SGT, conversation with V!₦©€
