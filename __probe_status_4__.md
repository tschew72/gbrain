---
type: 'concept'
title: 'probe 4'
enriched_at: '2026-06-21T03:32:00.755Z'
enriched_by: 'cli:enrich'
ingested_at: '2026-06-21T03:32:07.561Z'
source_kind: 'put_page'
ingested_via: 'put_page'
created: '2026-06-21T03:32:07.561Z'
---

## Overview

Probe 4 is a **nightly quality probing** function configured within the GBrain capture chain's autopilot system, specifically as part of **Layer 3** (`cycle.conversation_facts_backfill`) [Source: __probe_status__]. It is currently **disabled by default** and not actively running as part of the capture pipeline [Source: __probe_status__].

## Role in Capture Chain Architecture

The probe exists as a component of **Layer 3**, controlled by the configuration setting `autopilot.conversation_parser_probe.enabled` [Source: __probe_status__]. This setting would trigger automated quality evaluation as part of the autopilot's backfill process if enabled [Source: __probe_status__].

The active capture mechanism remains **Layer 2** (`brain_capture` MCP tool), which relies on the LLM's discretionary judgment rather than automated evaluation [Source: __probe_status__].

## Current Status

Layer 3 — including the probe — is **OFF** [Source: __probe_status__]. No automated evaluation pipeline runs: neither the probe nor any scoring model, LLM-as-judge, or rule engine is active [Source: __probe_status__].

## Relationship to Auto-Ingestion

The probe represents a potential path toward "true auto-ingestion" if Layer 3 were enabled [Source: __probe_status__]. However, this has been deliberately deferred: Layer 3 remains a **work item to file for next quarter**, pending design of a quarantine/curation workflow for potentially noisy auto-captured content [Source: __probe_status__].

## Context of Discussion

The probe was discussed in response to a question about whether "gbrain evaluate[s] every message and determine[s] if it should be ingested" [Source: __probe_status__]. The confirmed answer is that no such automated evaluation currently occurs [Source: __probe_status__].
