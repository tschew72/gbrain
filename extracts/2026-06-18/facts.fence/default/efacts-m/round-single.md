---
type: 'extract_receipt'
title: 'facts.fence — single — default'
kind: 'facts.fence'
round: 'single'
run_id: 'efacts-mqirkd92-defa'
cost_usd: 0
source_id: 'default'
total_rows: 28
enriched_at: '2026-06-21T05:00:35.804Z'
enriched_by: 'cli:enrich'
extracted_at: '2026-06-18T00:30:41.942Z'
dream_generated: true
ingested_via: 'put_page'
ingested_at: '2026-06-21T05:00:36.849Z'
source_kind: 'put_page'
created: '2026-06-21T05:00:36.849Z'
---

## Overview

The `facts.fence` module is a system component used across multiple operational contexts at Evvo Labs, including cron management, JSON message ingestion, and shell script execution.

## Module Appearances

### Cron Management
The module appears in crontab backup operations. On 2026-06-17, it was used in conjunction with `/tmp/crontab.backup-2026-06-17` during a standup digest cron removal decision. [Source: decisions/2026-06-17-standup-digest-cron-removed]

### PM2 Process Management
Used to restart and inspect the `gbrain-jobs-supervisor` service. The specific commands executed were:
- `pm2 restart gbrain-jobs-supervisor`
- `pm2 logs gbrain-jobs-supervisor --lines 30 --nostream` [Source: decisions/2026-06-14-gbrain-supervisor-pm2]

### Teams Channel Ingestion
The module processes JSON payloads from Microsoft Teams channels. One recorded instance captured a message from the "YL Integrated Checkpoint Notification" channel in the "SOC Operations" team, containing an attachment with ID `1a315c0401d94077af5ac137f758fe71`. [Source: yl-checkpoint-notification]

## Extraction Metadata

- **Facts reconciled:** 28 (28 deleted)
- **Pages scanned:** 203
- **Run ID:** `efacts-mqirkd92-defa`
- **Round:** single
- **Extracted:** 2026-06-18T00:30:41.942Z
