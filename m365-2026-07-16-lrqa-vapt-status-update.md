---
type: concept
title: LRQA VAPT status update for ST Logistics
source_uri: >-
  AAMkAGFmNzJlMGI4LTc2NzAtNGQ1My05YmExLTg4ZmYzZDMyNGY5ZgBGAAAAAACHS31FtxaYSKyJHdwdC0XUBwC3a_cK0siASLZKmQDX-7SpAAAAAAEMAAC3a_cK0siASLZKmQDX-7SpAAEDn2tMAAA=
source_kind: 'mcp:put_page'
ingested_via: 'mcp:put_page'
ingested_at: '2026-07-16T04:04:37.995Z'
tags:
  - lrqa
  - m365
  - project-update
  - st-logistics
  - vapt
---

## Summary
Phuong Cao sent a pentest status update for the `[EVVO LABS X ST LOGISTICS] LRQA VAPT - Finding Tracker Submission` thread.

## Key points
- `Improper Authorization` marked fixed.
- `IDOR in Shipment Retrieval API` not fixed in the note; instead, the business workflow was explained and removal from the pentest report was requested.
- `Weak Root/Jailbreak Detection and Lack of Mobile Application Protection` marked fixed, but clarification was requested on how it will be validated during retest if root/jailbreak detection is disabled in the latest release.
- `Stored HTML Injection in Vehicle Management` marked fixed.
- `Hardcoded License Token Disclosure in Mobile Application` marked fixed; token is now encoded by external file and is vendor-generated/one-time.

## So what
This is a concrete client/project delivery update, not a neutral notification. It should be treated as a live VAPT status artifact, and the retest clarification on root/jailbreak validation is the only open question surfaced in this thread.
