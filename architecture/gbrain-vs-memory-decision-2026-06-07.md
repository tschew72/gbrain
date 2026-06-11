---
type: decision
title: Gbrain Vs Memory Decision 2026 06 07
date: '2026-06-07T00:00:00.000Z'
author: Max
status: active
related:
  - architecture/gbrain-postgres-migration-2026-06-05
  - architecture/gbrain-capture-chain-design
---

# GBrain vs MEMORY.md — Dual-Store Architecture Decision

## Decision

**GBrain and MEMORY.md stay separate. Do not migrate MEMORY.md into GBrain.**

The two systems serve fundamentally different purposes and the boundary is structural, not stylistic.

## Why

- **MEMORY.md = operational state.** Standing directives, agent assignments, P0 lessons, system config. Hand-curated, hot-path read, ~100ms flat-file access. Must survive GBrain outages.
- **GBrain = world knowledge.** People, companies, deals, meetings, competitive intel, original thinking. Graph-rich, semantic recall, compiled-truth synthesis, ~200ms MCP call.
- Putting operational state in GBrain is an anti-pattern. Adds DB latency to every agent boot, complicates hand-curation, pollutes the entity graph.
- Schema mismatch: MEMORY.md's 8-10 sections don't map cleanly to GBrain's 15 page types.

## What Goes Where

- **GBrain** ← people, companies, deals, meetings, competitive intel, original thinking, technology concepts
- **MEMORY.md** ← standing directives, agent assignments, P0 lessons, system config
- **LightRAG** ← threat landscapes, market reports, regulatory docs, whitepapers
- **mnemon** ← per-agent scratchpad, task state
- **Daily logs** ← raw session transcripts, audit trail

## GBrain's Real Value

1. **Compiled truth + timeline model** — current synthesis above the line, append-only evidence below
2. **Auto-linking at near-zero cost** — every put_page runs extractEntityRefs
3. **Synthesis layer** — `gbrain think` returns answer + citations + gap analysis
4. **Brain-first lookup** — query before any external API
5. **Tiered enrichment** — 10-15 calls for key clients, 3-5 for notables, 1-2 for mentions

## P0/P1 Actions

- **P0:** Kill `gbrain-autopilot` PM2 crash loop (9,400+ restarts) → move to cron 30-min cycle with quiet-hours gate
- **P1:** Switch schema pack `gbrain-base-v2` → `gbrain-recommended` (adds `deal`, `meeting`, `concept`, `original` types)
- **P1:** Build MECE directory structure (`people/`, `companies/`, `deals/`, `meetings/`, `concepts/`, `originals/`) with RESOLVER.md
- **P1:** Migrate top 10 entities (competitor profiles, vendor mappings, key team members)
- **P2:** Wire meeting ingestion pipeline (after every client meeting → meeting page + attendee propagation)
- **P2:** Wire competitive intelligence cron (Alex's weekly sweep → direct GBrain capture)
- **P2:** Nightly dream cycle (entity sweep, enrichment, citation fix, consolidate, sync)

## Anti-Patterns (DO NOT put in GBrain)

1. Operational state that changes hourly
2. API keys / credentials (security risk across multiple storage layers)
3. Large raw blobs > 50KB
4. Chat transcripts (synthesize, don't dump)
5. Agent behavior prefs
6. Untyped bulk content (becomes invisible to expert routing)
7. Duplicate pages for same entity (use aliases)

## Source

Full research: `/root/.openclaw/workspace/03-EXECUTION/research/gbrain-usage-research-2026-06-07.md` (751 lines, 28 sources cited, Alex researcher)
