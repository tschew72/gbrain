---
type: concept
title: Vision Web App finding tracker review
date: '2026-07-17T00:00:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-17T08:05:06.739Z'
source_kind: 'mcp:put_page'
tags:
  - client-delivery
  - teams
  - vapt
  - vision-web-app
---

- Delta signal: Andrew Bui posted in `EVVO PROJECTS | Client - Vision Web App` that the client finding tracker is complete.
- Summary: 5 findings total, split into 2 High and 3 Low.
- Detail: the JWT HS256 observation had its CVSS 3.1 score and CWE vendor mapping adjusted to `N/A` so it better reflects the observation; initial vendor mapping was `CWE-327: Use of a Broken or Risky Cryptographic Algorithm`.
- Action: Vince was asked to review the tracker before it is sent to the client.
- So what: this is a concrete delivery gate, not just FYI chatter. It needs review before client send and may affect the final wording/severity of at least one finding.
