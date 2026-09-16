# Mermail Procurement Agent

Community/unofficial Mermail companion skill for evidence-backed vendor renewal and procurement work.

It turns renewal notices, invoices, quotes, cancellation terms, and related email threads into a traceable renewal dossier, then prepares an **unsent** negotiation/cancellation/clarification draft when useful.

## What makes it different

- procurement-specific evidence model instead of a generic inbox summary;
- explicit notice-deadline and price-delta reasoning;
- sender/payment-change and prompt-injection risk checks;
- reversible-by-default next actions;
- deterministic JSON dossier validator;
- no wallet/payment/cancellation execution and no autonomous email sending.

## Example

```text
Use $mermail-procurement-agent to find vendor renewals due in the next 90 days,
show the evidence for each deadline and price change, flag risky payment-detail
changes, and draft negotiation replies without sending anything.
```

## Local validation demo

```bash
python scripts/demo_procurement.py
python scripts/validate_dossier.py scripts/fixtures/demo-generated-dossier.json
python scripts/validate_dossier.py scripts/fixtures/invalid-auto-send.json
```

The harness deterministically extracts the demo renewal, computes the price delta and notice deadline, flags payment redirection plus prompt injection, and writes a machine-readable dossier. The safe dossier must pass. The final command must fail because that fixture contains an execution flag (`send_now`) that is forbidden in a procurement dossier.

See `DEMO.md` for the live-MCP success contract and video flow.

## Mermail

This is a community/unofficial companion. Install or consult the official Mermail skills for core workflows:

```bash
npx skills add Nudgen-Marketing/mermail-skills
```

Hosted Mermail MCP endpoint used by the OpenAI metadata: `https://console.mermail.app/mcp`.
