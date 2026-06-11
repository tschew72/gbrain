# GBrain Checkout — default source

This is the on-disk working directory for the `default` source in the
GBrain Postgres engine (v0.42.25.0).

The `gbrain dream` overnight cycle uses this path for filesystem phases:
lint, backlinks, sync, synthesize, extract, patterns.

DB is the source of truth (Postgres @ 127.0.0.1:5442/gbrain).
Dream writes processed artifacts here; sync keeps it consistent.
