---
type: 'entity'
title: 'Nyk Group'
sources:
  - 'm365-30min:2026-06-16T1500'
  - 'm365-30min:2026-06-16T1530'
  - 'm365-30min:2026-06-16T1600'
  - 'm365-30min:2026-06-16T1700'
  - 'm365-30min:2026-06-17T0600'
  - 'm365-30min:2026-06-25T1300'
  - 'm365-30min:2026-06-26T0600'
  - 'm365-30min:2026-06-26T0937'
ingested_via: 'mcp:put_page'
ingested_at: '2026-06-16T22:08:26.195Z'
source_kind: 'mcp:put_page'
tags:
  - 'client'
  - 'enterprise'
  - 'lead'
  - 'maritime'
  - 'nyk-group'
  - 'vapt'
created: '2026-06-16T22:08:26.195Z'
---

# NYK Group

## Overview
NYK Group is a client with an ongoing Annual VAPT (Vulnerability Assessment and Penetration Testing) engagement with EVVO Labs in 2026.

## Engagement Details
- **Service**: Annual VAPT Project 2026 (NBSSA FY2026 VA/PT)
- **Status**: Active / ongoing coordination — quote preparation, deadline June 18, 2026 EOD
- **Team**: Kailash Amin (lead), Ryan Villegas, Nu Nguyen (Anna), Vince Chew
- **Client Contact**: Efren Adia (efren.adia@nykgroup.com)

## Scope Details (as of 2026-06-16 17:00 SGT)
- **Option 1**: 3 entities (Entity-01 through Entity-03) under volume discount
- **Option 2**: 4 entities (Entity-01 through Entity-04) under volume discount — broader scope
- **Entity-01 Scope**: Confirmed no changes from previous scope (Ryan, 2026-06-16 14:37 + 15:16 SGT)
- **Entity-02 Scope**: **Revised scope received 2026-06-16.** Kailash flagged changes — client claims no effort impact. Anna confirmed no change in qty, just more details for web app. Costing remains unchanged.
- **Entity-04 Scope**: Web Apps VAPT (1 URL, 110 fields, 2k functions, 200 dynamic pages), Code Review (Ruby 3.2.2, PostgreSQL 16.11, 36k LOC), Cloud VAPT (10 IPs, 30 IAM, 10 services)
- **Quote Deadline**: June 18, 2026 EOD

## Resourcing & Cost Structure
- **Onsite pentester**: Partner pentester (primary), SDC as backup for internal VAPT
- **SDC cost**: 10% of Nicholas' (onsite pentester) costing for report review & project management (as per Anna, 2026-06-16 16:01 SGT)
- **SDC role**: Report review + PM for jobs assigned to Nicholas. Activate "depending on situation."
- **Costing status**: Anna confirmed unchanged despite Entity-02 scope revision (2026-06-16 16:38 SGT)

## Timeline
- **2026-06-13 17:45 SGT** — RFP/RFQ received from Efren Adia (NYK Group)
- **2026-06-14 12:28 SGT** — Option 1 Entity-03 quotation received
- **2026-06-14 12:31 SGT** — Option 2 Entity-03 quotation received (adds Entity-04)
- **2026-06-14 15:57 SGT** — Option 2 Entity-04 quotation received. Confirms Option 2 scope.
- **2026-06-16 10:58 SGT** — Kailash updated Vince/Ryan/Anna on Entity-04 scope (36k LOC Ruby code review added). SDC cost added for Nicholas.
- **2026-06-16 14:37 SGT** — Ryan Villegas confirmed SOC-1 review complete, Entity-01 scope confirmed (no changes)
- **2026-06-16 15:16 SGT** — Ryan confirmed no change from previous scope for Entity-01
- **2026-06-16 16:34 SGT** — Kailash flagged Entity-02 scope changes to Anna; asked if costing unchanged
- **2026-06-16 16:38 SGT** — Anna confirmed costing unchanged, no qty changes, just added web app details
- **2026-06-16 16:01 SGT** — Anna clarified SDC cost = 10% of Nicholas costing for report review & PM
- **2026-06-17 06:00 SGT** — Ongoing coordination: Nu Nguyen, Kailash Amin, Ryan Villegas actively exchanging emails on project status and next steps

## Decisions
- **Vince directive**: "Let's win this guys" (2026-06-16)
- **Resourcing**: SDC to quote for internal VAPT + report review/PM. Onsite partner backup. Activate "depending on situation."

## So What (2026-06-16 17:00 update)
- Entity-02 scope revision is the latest risk — client says no impact, but Kailash flagged it for confirmation. Anna confirmed no cost impact. Monitor if further scope creep emerges before June 18 deadline.
- SDC cost structure now locked: 10% of Nicholas for PM + report review.
- All four entities (01-04) now have scope status: 01 confirmed no change, 02 revised but cost-neutral, 03/04 quotes received.

## Related
- Annual VAPT engagement
- Kailash Amin
- Ryan Villegas
- Pacific International Lines (related entity in NYK Group — PIL is a subsidiary)

## Update 2026-06-25 12:57-13:02 SGT
- Efren Adia sent proposal-clarification questions on the NBSSA FY2026 Entity-01 and Entity-03 quotations.
- Entity-01 questions focused on the man-day basis for External Web Apps VAPT and an additional AD Assessment point.
- Entity-03 questions focused on network-VAPT throughput per day and why the 14-IP versus 63-IP pricing appeared close.

## So What 2026-06-25
- The deal has moved into detailed commercial and scope scrutiny, which is a positive buying signal but raises the need for crisp effort-and-pricing justification.
- A weak or slow answer here could erode confidence across both the VAPT pack and the bundled Red Team workstream.

## Update 2026-06-25 23:17-23:41 SGT
- Kailash Amin replied inline to Efren Adia's Entity-01 and Entity-03 quotation questions.
- Efren said he understood Evvo's methodology on Entity-03, which suggests the network-VAPT throughput and pricing concern there has been answered.
- Efren kept Entity-01 open by asking for an explicit External Web Apps VAPT testing/report man-day breakdown and continuing the AD Assessment clarification thread.

## So What 2026-06-25 23:41 SGT
- NYK's scrutiny has narrowed from two questioned entities to one remaining effort-model clarification on Entity-01.
- A crisp E1 man-day breakdown should help keep the bundled VAPT and Red Team motion moving without reopening the E3 pricing discussion.

## Update 2026-06-26 09:15 SGT
- Kailash Amin asked Nu Nguyen (Anna) to confirm whether the Entity-01 AD Assessment should be treated as `Blackbox` or `Greybox`.
- He said the client prefers `Greybox` and can provide `1 test credential with admin level`.
- This gives Evvo a clearer execution preference on the still-open Entity-01 clarification thread while the explicit External Web Apps VAPT testing/report man-day breakdown remains outstanding.

## So What 2026-06-26 09:15 SGT
- NYK is moving from generic quote scrutiny into specific delivery-assumption shaping on Entity-01.
- Evvo should answer the remaining man-day question quickly and align the AD assessment assumption toward a credentialed / greybox path so the bundled VAPT and Red Team motion keeps moving.
