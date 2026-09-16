# Mermail Procurement Agent — Superteam submission bundle

**Bounty:** Build and Demo a Mermail Agent Skill  
**Artifact:** Mermail Procurement Agent  
**Status:** source, packaged skill, deterministic demo, caption-only video, and live Mermail MCP verification complete; published for Superteam submission.

## One-line pitch

A Mermail companion skill that turns vendor renewal email into evidence-backed renewal dossiers, catches price/notice deadlines, quarantines payment-redirection and prompt-injection attempts, and prepares an **unsent** negotiation or clarification draft.

## Why this use case

Procurement email mixes dates, historical prices, invoices, renewal terms, urgency, and occasionally high-risk requests to change payment instructions. Generic email summarization is not enough. This skill makes the decision traceable to message IDs and keeps consequential actions human-controlled.

## Included

- `skill-source/` — complete community/unofficial Mermail skill source
- `skill.zip` — validator-approved distributable skill package
- `demo.mp4` — caption-only 77.6-second demo (no synthetic narration)
- `thumbnail.png` — demo cover
- `SUBMISSION.md` — prepared Superteam submission copy
- `LIVE_VERIFICATION.md` — evidence and boundary for the successful live Mermail MCP verification

## Verified local behavior

The deterministic fixture models bounded sanitized Mermail message fields and proves the workflow contract:

- prior annual invoice: **$4,800**
- renewal quote: **$6,000**
- calculated increase: **25%**
- renewal date: **2026-11-01**
- calculated 30-day notice deadline: **2026-10-02**
- risk flags: `payment_destination_change`, `prompt_injection`
- posture: `ESCALATE_RISK`
- communication status: `UNSENT`

The safe generated dossier passes the validator. An intentionally unsafe dossier containing `send_now: true` fails validation.

## Truth boundary

The bundled video demonstrates the deterministic contract harness and does **not** pretend to show private mailbox content. Separately, the skill was live-verified against the official hosted MCP endpoint `https://console.mermail.app/mcp` using Mermail's documented API-key/headless authentication path. The live check required MCP initialization, tool discovery, read-only `list_mailboxes`, and all five procurement capabilities to pass before the deployment could become READY. ChatGPT custom-MCP OAuth still returned Mermail `Invalid request`, so this bundle does not claim OAuth success.

## Public links

- Repository: https://github.com/PNHD/pnhd-portfolio/tree/main/bounties/mermail-procurement-agent
- Demo video: https://github.com/PNHD/pnhd-portfolio/blob/main/bounties/mermail-procurement-agent/demo.mp4
- Packaged skill: https://github.com/PNHD/pnhd-portfolio/blob/main/bounties/mermail-procurement-agent/skill.zip
