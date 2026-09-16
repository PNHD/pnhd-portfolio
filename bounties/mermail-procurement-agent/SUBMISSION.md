# Prepared Superteam submission

## Title
Mermail Procurement Agent — evidence-backed SaaS renewal intelligence

## Short description
I built a reusable Mermail companion skill for procurement and vendor renewals. It finds renewal/invoice evidence, calculates compatible price changes and notice deadlines, preserves message-level provenance, flags suspicious payment-detail changes and prompt-injection attempts, and prepares an UNSENT negotiation or clarification draft. External effects remain human-controlled.

## What to review
- Reusable Skill package with OpenAI MCP metadata
- Exact Mermail inbox/compose tool contract references
- Procurement-specific renewal dossier format
- Strict untrusted-email / payment-redirection / prompt-injection boundary
- Deterministic demo harness and dossier validator
- Video demo

## Demo result
The caption-only video demonstrates the deterministic workflow fixture. Live Mermail connectivity and required tool availability were separately verified against the official hosted MCP using the documented API-key/headless path (see `LIVE_VERIFICATION.md`).

The included synthetic Mermail-shaped fixture produces:
- $4,800 -> $6,000 annual renewal (+25%)
- Nov 1, 2026 renewal
- Oct 2, 2026 notice deadline
- HIGH payment destination change
- HIGH prompt injection
- ESCALATE_RISK posture
- UNSENT draft

The safe dossier validates. A deliberately unsafe `send_now` dossier fails mechanically.

## Public links
Repository: https://github.com/PNHD/pnhd-portfolio/tree/main/bounties/mermail-procurement-agent
Video: https://github.com/PNHD/pnhd-portfolio/blob/main/bounties/mermail-procurement-agent/demo.mp4
Packaged skill: https://github.com/PNHD/pnhd-portfolio/blob/main/bounties/mermail-procurement-agent/skill.zip

## Disclosure
The packaged video is an offline deterministic contract demo, not a fabricated mailbox recording. Separately, the official hosted Mermail MCP was live-verified with a workspace API key: MCP initialization, tool discovery, read-only `list_mailboxes`, and the five required procurement capabilities all passed. ChatGPT OAuth itself returned Mermail `Invalid request`, so the submission does not claim OAuth success.
