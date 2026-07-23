---
type: note
title: Secops Edr Alert Fa00366 2026 07 14
sources:
  - 'm365-30min:2026-07-14T1100'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-14T03:15:45.661Z'
source_kind: 'mcp:put_page'
---

# Datto EDR Alert - fa00366

Security / triage note for the new EDR host signal.

## Signal 2026-07-14
- `noreply@infocyte.com` sent a high-severity Datto EDR alert for host `fa00366` at `2026-07-14T02:40:11Z`.
- Alert name: `ezcad2.exe`.
- Alert type: `av`.
- No corroborating Teams message landed in the same 30-minute window.

## So what
- This is a new host-level security signal and should be attributed to an asset owner before it is treated as benign.
- It is distinct from the already-known `fa00584` pattern, so it should not be collapsed into the old precedent without a quick legitimacy check.
