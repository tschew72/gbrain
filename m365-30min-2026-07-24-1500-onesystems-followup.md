---
type: concept
title: M365 30min 2026 07 24 1500 Onesystems Followup
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-24T07:03:53.429Z'
source_kind: 'mcp:put_page'
---

---
title: M365 delta: OneSystems compromise follow-up
created_at: '2026-07-24T15:00:00+08:00'
tags:
  - m365
  - email
  - security-incident
  - one-systems-technologies
  - bec
source_kind: m365-30min
---

## Signal

Fresh inbox follow-up in the existing OneSystems suspected CEO compromise thread.

## Details

- Subject: `Re: [EXT] Re: Urgent Assistance Required – Suspected Compromise of CEO’s Email Account`
- Sender: `Mazy Yeoh <Mazy.Yeoh@onesystemstech.com>`
- Timestamp: `2026-07-24T06:49:08Z` / `2026-07-24 14:49 SGT`
- The reply says the team will continue monitoring the CEO account for 14 days.
- The sender reports:
  - no information disclosure found
  - mailbox audit logs reviewed with nothing obvious so far
  - no forwarding email found, but many mailbox rules exist and one suspicious rule cannot yet be isolated
  - MFA remains enabled and authentication methods were reduced to the latest set
  - CEO mobile device is still under control and no device loss is reported
  - CEO laptop hostnames noted: `FA00545`, `FA00590`

## Why it matters

This is a meaningful follow-up to the prior suspected BEC case, but it does not close the issue. The open risk is still mailbox-rule abuse or delegated/app access, so the practical next step is continued containment plus deeper review of hidden rules, delegation, and app permissions.

## Relation to prior page

- Follows the earlier incident note: `m365-30min-2026-07-23-2330-onesystems-compromise`
- The thread is still active; no new exfiltration evidence is reported in this follow-up.
