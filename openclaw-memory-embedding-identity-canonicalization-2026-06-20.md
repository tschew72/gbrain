---
type: 'concept'
title: 'OpenClaw memory embedding identity canonicalization'
date: '2026-06-20T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-20T10:54:00.878Z'
source_kind: 'mcp:put_page'
created: '2026-06-20T00:00:00.000Z'
---

# OpenClaw memory embedding identity canonicalization

## Problem
- Memory search kept tripping over the same embedding model under multiple identities.
- The local embedding file path and the canonical HF-style model identity were drifting apart.
- That drift caused the doctor/index identity check to fail even though the weights were the same.

## Root cause
- The index metadata had been written with the local file path identity.
- The doctor compared against the canonical identity resolved by the provider.
- Same model, different identifiers.

## Fix
- Rebuild the memory index after normalizing metadata to the canonical identity.
- Keep the source-of-truth identity consistent across config, metadata, and doctor checks.

## Operational lesson
- Do not treat embedding file paths as canonical identities.
- Use one normalized identity everywhere, then rebuild the index when upgrading provider identity rules.
