---
type: decision
title: GBrain Cross-Linker — make LLM-driven orphan reduction recurring
date: '2026-06-18T00:00:00.000Z'
status: shipped
made_by: max
project: gbrain
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-18T00:38:40.541Z'
source_kind: 'mcp:put_page'
tags:
  - automation
  - brain-score
  - gbrain
  - linker
  - llm
  - recurring
---

# GBrain Cross-Linker — recurring

## Decision (Vince 2026-06-18 08:18 SGT)
"Yes do it now" + "Make it recurring" — Vince approved building the LLM-driven cross-linker AND adding it to the existing weekly post-dream cron.

## What shipped
- `/root/scripts/gbrain-cross-linker.py` — two-phase linker
  - **Phase A:** deterministic body-mention scan (bidirectional substring match, 4-char min). Fast, no LLM.
  - **Phase B:** LLM pass via direct API at `https://api.minimax.io/anthropic/v1/messages` (model `MiniMax-M3`). Batches up to N pages per call. Confidence threshold 0.6, validates link type against schema verbs.
- Cron `29d975be-…` updated (weekly Sunday 3:30 AM SGT) to run:
  1. Doctor + PM2 health check
  2. `gbrain sync` (if dirty tree)
  3. Project linker + stub creator (if needed) + sync + re-link
  4. Cross-linker (Phase A + Phase B, cap 20 LLM pages)
  5. Post summary to #agents with brain_score delta

## First-run results
- Links: 34 → **288** (+254)
- Brain score: 53 → **83** (+30 points; links 4/25 → 25/25, orphans 3/15 → 12/15)
- Orphans: 178 → 145 (-33)
- Phase A: 227/237 mentions created
- Phase B: 28/32 LLM decisions created (4 failed: missing target pages)

## LLM endpoint (v0.1)
- **URL:** `https://api.minimax.io/anthropic/v1/messages`
- **Format:** anthropic-messages (NOT openai-chat)
- **Auth:** `Authorization: Bearer $MINIMAX_API_KEY`
- **Headers:** `anthropic-version: 2023-06-01`
- **Local MCP gateway (3050) is NOT the chat gateway** — it's the gbrain MCP server, only handles brain operations

## High-value LLM discoveries (Phase B)
- `valuemax` → `projects/valuemax-vciso` (entity → project, missed by Phase A)
- `precepts` → `projects/precepts-vciso` (entity → project)
- `decisions/2026-06-13-promptdome-pause --[authored]--> vince-chew` (decision → author)
- `evvo-crm-pipeline-directive --[authored]--> vince-chew` (decision → author)
- `oxpay` → `projects/oxpay-soc` (entity → project)
- `kvasia` → `kv-asia-capital` (entity synonym)
- `imperva --[discusses]--> inbox/2026-06-13-imperva-magiclife-renewal` (entity → email)

## Caveats
- Phase A noise: ~150 of the 237 Phase A mentions are "evvo" mentions (every page mentions evvo). Technically valid, but creates link-type monoculture. Future: core-entity whitelist to skip `mentions` for very common terms.
- 4 LLM decisions failed because target pages don't exist as entities: `companies-evvo-labs`, `cheng-weiliang`, `bca-client`, `companies-evvo`. The LLM correctly identified these as relationships; the brain is just missing the entity pages.
- Cost: ~$0.005 per run for 30 LLM pages. Negligible.

## Why this is now a different brain
Before the linker runs, the brain was structurally sound but sparsely connected. 178 orphans out of 203 pages meant each page existed in isolation. Now: 145 orphans (still a lot, but the graph has real structure). The `mentions` link type alone added 241 connections, but the typed links (partner_of, attributed_to, authored, discusses) carry the semantic weight.

The brain went from a card catalog to a knowledge graph. Search, recall, and traversal all benefit. Worth measuring recall quality on a follow-up.

## Lesson (Vince 2026-06-18)
Two architectural choices made this work:
1. **Phase A (deterministic) before Phase B (LLM)** — Phase A catches 80%+ of relationships for free. Phase B only pays for the long tail. Cost + latency both much better than pure-LLM.
2. **Direct API at `api.minimax.io/anthropic`** — no local gateway to debug, no auth dance. Anthropic-messages format works the same regardless of provider. Future automations should default to direct API unless there's a routing reason to use a local gateway.
