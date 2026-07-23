---
type: concept
title: PM daily report rule - strict age + Teams evidence
created: '2026-07-09T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-09T05:19:01.584Z'
source_kind: 'mcp:put_page'
tags:
  - blocked
  - pm
  - reporting
  - stale
  - teams
---

## Rule

Daily PM reports should use strict age-based ranking across all projects and commercial items. Teams channel messages must be checked as part of the evidence set, not treated as optional. Blocked items must be reported separately from stale items.

## Why

This avoids under-reporting active threads that are moving in Teams, and prevents blocked projects from being mislabeled as stale just because the tracker file has not changed.

## Practical output

- Rank by last touch.
- Flag stale only when the latest client signal is actually old.
- Keep blocked separate.
- Include Teams evidence in the final determination.
