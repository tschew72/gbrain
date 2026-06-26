---
type: 'note'
title: 'GBrain Checkout — default source'
enriched_at: '2026-06-18T10:01:34.076Z'
enriched_by: 'cli:enrich'
ingested_via: 'put_page'
ingested_at: '2026-06-18T10:01:34.301Z'
source_kind: 'put_page'
created: '2026-06-18T10:01:34.301Z'
---

## Overview

This is the on-disk working directory for the `default` source in the GBrain Postgres engine (v0.42.25.0). [Source: readme]

## Dream Cycle Integration

The `gbrain dream` overnight cycle uses this path for filesystem phases: lint, backlinks, sync, synthesize, extract, patterns. [Source: readme]

## Source of Truth

DB is the source of truth (Postgres @ 127.0.0.1:5442/gbrain). Dream writes processed artifacts here; sync keeps it consistent. [Source: readme]
