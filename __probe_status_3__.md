---
type: 'concept'
title: 'probe 3'
enriched_at: '2026-06-21T03:31:44.685Z'
enriched_by: 'cli:enrich'
ingested_at: '2026-06-21T03:31:50.815Z'
source_kind: 'put_page'
ingested_via: 'put_page'
created: '2026-06-21T03:31:50.815Z'
---

## Overview

**Probe 3** is a quality-checking mechanism related to the GBrain capture chain's autopilot system. It is currently configured but not actively running as part of the default capture pipeline [Source: __probe_status_2__].

## Role in Capture Chain Architecture

The probe exists as a component of **Layer 3** (`cycle.conversation_facts_backfill`), which is currently **disabled by default** [Source: architecture/gbrain-capture-chain-design]. Specifically, the configuration `autopilot.conversation_parser_probe.enabled` controls a **nightly quality probing** function that would run as part of the autopilot's backfill process [Source: architecture/gbrain-capture-chain-design].

## Current Status

Layer 3 — including the probe — is **OFF**. The active capture mechanism remains **Layer 2** (`brain_capture` MCP tool), which relies on the LLM's discretionary judgment rather than automated evaluation [Source: architecture/gbrain-capture-chain-design].

## Relationship to Auto-Ingestion

The probe is part of the potential path toward "true auto-ingestion" if Layer 3 were enabled. However, a deliberate decision was made to defer this: Layer 3 remains a **work item to file for next quarter**, pending design of a quarantine/curation workflow for potentially noisy auto-captured content [Source: architecture/gbrain-capture-chain-design].

## Context

The probe was discussed in the context of Vince's question about whether "gbrain evaluate[s] every message and determine[s] if it should be ingested." The answer: no automated evaluation pipeline runs — neither the probe nor any scoring model, LLM-as-judge, or rule engine is active [Source: architecture/gbrain-capture-chain-design].
