---
type: architecture
title: Gbrain Capture Chain Design
domain: gbrain
status: active
created: '2026-06-05T00:00:00.000Z'
related:
  - gbrain-postgres-migration-2026-06-05
last-updated: '2026-06-05T00:00:00.000Z'
---

# GBrain Capture Chain — 3 Layers, Only 1 Active

## The 3 layers (verified in code + config 2026-06-05)

### Layer 1 — `agent_end` hook (OpenClaw plugin) 🟡 No-op
- File: `extensions/gbrain/index.js`
- Handler: `api.on("agent_end", async (event) => { return; });`
- The intended auto-capture point exists in the plugin scaffold but is unimplemented
- The plugin only injects directives via `before_prompt_build` — actual capture is LLM's call

### Layer 2 — `brain_capture` MCP tool 🟢 Active, LLM-driven
- Every turn, `before_prompt_build` prepends directive: "After responding: does this exchange contain a decision, key fact, or notable insight worth capturing to GBrain? If yes, use brain_capture."
- The LLM (Max) evaluates each turn and decides. No separate scoring model, no rule-based filter
- Heuristic: decisions with future impact, named facts (people/dates/numbers), lessons, architectural choices. Skip banter, acks, transient state

### Layer 3 — `cycle.conversation_facts_backfill` (autopilot) ⚪ OFF
- Config: `cycle.conversation_facts_backfill.enabled = false` (default OFF)
- When ON: autopilot walks all sources, calls `extractConversationFacts` per source
- Budget caps: $1/source, $5 brain-wide, 20min/source, 30min brain-wide
- `types` default: `["conversation", "meeting", "slack", "email"]` — would walk Discord too
- Related: `autopilot.conversation_parser_probe.enabled` for nightly quality probing

## Vince's question (2026-06-05, #learning)
> "will gbrain evaluate every message and determine if it should be ingested?"

**Answer:** No automated evaluation pipeline runs right now. No scoring model, no LLM-as-judge, no rule engine. Layer 2 is the only thing active, and it's Max's discretion. Layer 3 is the path to true auto-ingestion if wanted.

## Trade-offs for turning on Layer 3
- ✅ Truly hands-off, captures things the LLM would miss
- ✅ Bounded cost (~$5/night default)
- ❌ 20-30min nightly walltime
- ❌ May ingest noise — LLM judgment isn't perfect
- ❌ Needs quarantine/curation workflow for junk pages

## Decision (for now)
Stay on Layer 2 (LLM-driven). Layer 3 is a WI to file for next quarter when there's time to design a curation workflow.
