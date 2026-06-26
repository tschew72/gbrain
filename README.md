---
type: reference
title: GBrain Checkout — default source
created: '2026-06-12T05:51:00.000Z'
domain: ops
status: active
source_kind: filesystem
ingested_via: filesystem
---

# GBrain Checkout — default source

This is the on-disk working directory for the `default` source in the
GBrain Postgres engine (v0.42.25.0).

The `gbrain dream` overnight cycle uses this path for filesystem phases:
lint, backlinks, sync, synthesize, extract, patterns.

DB is the source of truth (Postgres @ 127.0.0.1:5442/gbrain).
Dream writes processed artifacts here; sync keeps it consistent.
