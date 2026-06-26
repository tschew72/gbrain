---
type: 'note'
title: '2026 06 15 Received Pos Batch Mtech Connectivity'
sources:
  - 'm365-30min:2026-06-15T1631'
  - 'm365-30min:2026-06-15T1628'
  - 'm365-30min:2026-06-15T1624'
effective_date: '2026-06-15T08:31:00.000Z'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-15T08:40:40.091Z'
source_kind: 'mcp:put_page'
created: '2026-06-15T08:40:40.091Z'
---

# PO Batch — 2026-06-15 (M.Tech + Connectivity Global channel)

Michelle Then processed 3 channel-partner POs on 2026-06-15, all in the 16:24–16:31 SGT window. These are Evvo-distribution POs where a channel partner (M.Tech or Connectivity Global) has won an end-customer deal and is placing the procurement order through Evvo.

## POs Received

| PO # | Channel Partner | End User | EU Account / Address | Processed |
|---|---|---|---|---|
| ELPO260606 | Connectivity Global | KLASS Engineering & Solutions Pte Ltd | (KLASS Sg address) | 16:24 SGT |
| ELPO260607 | M.Tech Products | Ministry of Social and Family Development (MSF) | MSF account ID 2324088 | 16:28 SGT |
| ELPO260608 | M.Tech Products | Majlis Ugama Islam Singapura (MUIS) | Process to 1572885 (Umbrella Acc) — EVVO Labs Pte Ltd C/O MUIS | 16:31 SGT |

## Key People
- **Michelle Then** (michelle.then@evvolabs.com) — Evvo distribution admin, processed all 3 POs
- **Audrey Teo** (audrey@evvolabs.com) — also handling KLASS renewal admin (separate thread 16:04 SGT, internal renewal)

## So What for Evvo
- **Distribution revenue**: 3 channel POs cleared in <10 min window. MUIS + MSF are SG government bodies — recurring SG gov distribution pipeline.
- **MUIS + MSF end users are NOT in gbrain yet** — could become strategic government customers worth tracking if volume grows.
- **KLASS is a repeat customer** (renewal + new PO) — already in pipeline for ongoing product/managed service.
- Channel-partner revenue is different from GeBIZ-issued POs (2 GeBIZ POs CDVHQ0ECI26001100 + MUI000ECI26000218 came in earlier 16:00 SGT window via Audrey's forwarding). Combined 5 POs in 30 min = healthy distribution velocity.

## Cross-references
- Audrey Teo — 16:00 SGT sweep captured GeBIZ CDV HQ + MUI POs
- KLASS renewal PO thread (16:04 SGT, Audrey) — separate admin flow
- GeBIZ CDVHQ0ECI26001100 + MUI000ECI26000218 (16:00 SGT) — direct government procurement POs

## Open Items
- [ ] Track if MUIS / MSF / KLASS become repeat end-user customers (would warrant entity pages)
- [ ] Confirm ELPO order numbers are registered in Odoo / accounting for revenue recognition
