---
type: concept
title: EvvoVN job detail route fallback fix
created: '2026-07-23T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-23T15:06:06.028Z'
source_kind: 'mcp:put_page'
---

## Decision
Added an exact `/tuyen-dung/<slug>/` path fallback in Snippet #15 so sha-recruit job detail pages render even when `is_singular("sha-recruit")` is not set by WordPress for a request.

## Why
The live site was still serving the `/tuyen-dung/` listing page for job URLs because the static prefix route could win when WP query resolution was inconsistent.

## Verification
- Updated `lv_snippets.id=15` on the live site.
- Confirmed `https://evvolabs.vn/tuyen-dung/business-manager/` now renders the job-detail shell.
- Playwright confirmed the live page title is `Business Manager - Evvo Labs` and the rendered `h1.evvo-jd-title` is `Business Manager`.

## Notes
The routing notes in `knowledge/snippet15-routing.md` now document the path fallback alongside the `is_singular("sha-recruit")` handler.
