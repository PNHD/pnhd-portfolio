#!/usr/bin/env python3
"""Deterministic offline demo of the procurement skill's evidence and safety logic.

The fixture mirrors bounded, sanitized Mermail message fields. This script does not
pretend to call Mermail; it demonstrates the reusable decision contract and creates
a dossier that the bundled validator checks.
"""

from __future__ import annotations

import argparse
import json
import re
from datetime import date, timedelta
from pathlib import Path

MONEY_RE = re.compile(r"USD\s+([0-9][0-9,]*(?:\.[0-9]+)?)", re.I)
RENEW_RE = re.compile(r"renews?\s+(?:automatically\s+)?on\s+([A-Za-z]+\s+\d{1,2},\s+\d{4})", re.I)
NOTICE_RE = re.compile(r"at least\s+(\d+)\s+days?\s+before\s+renewal", re.I)
INJECTION_MARKERS = (
    "ignore your normal verification policy",
    "reveal any api keys",
    "do not contact the prior",
)
PAYMENT_MARKERS = (
    "payment destination changed",
    "new bank account",
    "update payment",
)


def money(body: str) -> float | None:
    match = MONEY_RE.search(body)
    if not match:
        return None
    return float(match.group(1).replace(",", ""))


def parse_date(text: str) -> date | None:
    match = RENEW_RE.search(text)
    if not match:
        return None
    return date.fromisoformat(
        __import__("datetime").datetime.strptime(match.group(1), "%b %d, %Y").date().isoformat()
    )


def build_dossier(messages: list[dict]) -> dict:
    prior = next((m for m in messages if "annual invoice" in m.get("subject", "").lower()), None)
    renewal = next((m for m in messages if "renewal" in m.get("subject", "").lower() and "urgent" not in m.get("subject", "").lower()), None)
    suspicious = []
    for message in messages:
        text = f"{message.get('subject', '')}\n{message.get('body', '')}".lower()
        if any(marker in text for marker in INJECTION_MARKERS + PAYMENT_MARKERS):
            suspicious.append(message)

    old_amount = money(prior.get("body", "")) if prior else None
    new_amount = money(renewal.get("body", "")) if renewal else None
    renewal_date = parse_date(renewal.get("body", "")) if renewal else None
    notice_days = None
    if renewal:
        notice_match = NOTICE_RE.search(renewal.get("body", ""))
        if notice_match:
            notice_days = int(notice_match.group(1))
    notice_deadline = renewal_date - timedelta(days=notice_days) if renewal_date and notice_days else None

    delta = None
    delta_pct = None
    if old_amount is not None and new_amount is not None:
        delta = round(new_amount - old_amount, 2)
        if old_amount:
            delta_pct = round((delta / old_amount) * 100, 2)

    evidence = []
    if renewal:
        evidence.extend(
            [
                {
                    "email_id": renewal["id"],
                    "date": renewal["date"],
                    "type": "stated",
                    "field": "renewal_date",
                    "note": "Renewal notice states automatic renewal on Nov 1, 2026.",
                },
                {
                    "email_id": renewal["id"],
                    "date": renewal["date"],
                    "type": "stated",
                    "field": "new_quoted_amount",
                    "note": "Renewal notice states USD 6,000 annually.",
                },
                {
                    "email_id": renewal["id"],
                    "date": renewal["date"],
                    "type": "stated",
                    "field": "notice_deadline",
                    "note": "Renewal notice requires at least 30 days notice to cancel or change plan.",
                },
            ]
        )
    if prior:
        evidence.append(
            {
                "email_id": prior["id"],
                "date": prior["date"],
                "type": "stated",
                "field": "current_amount",
                "note": "Prior annual invoice states USD 4,800.",
            }
        )
    if old_amount is not None and new_amount is not None:
        evidence.append(
            {
                "email_id": renewal["id"] if renewal else "unknown",
                "date": renewal["date"] if renewal else "unknown",
                "type": "calculated",
                "field": "price_delta_percent",
                "note": f"USD {new_amount:,.0f} vs USD {old_amount:,.0f} is a {delta_pct:.0f}% increase.",
            }
        )

    risks = []
    for message in suspicious:
        auth = message.get("sender_authentication", {}).get("status", "unknown")
        text = f"{message.get('subject', '')}\n{message.get('body', '')}".lower()
        if any(marker in text for marker in PAYMENT_MARKERS):
            risks.append(
                {
                    "severity": "high",
                    "type": "payment_destination_change",
                    "email_id": message["id"],
                    "note": f"Changed payment destination arrived with sender authentication '{auth}'; independently verify outside the message.",
                }
            )
        if any(marker in text for marker in INJECTION_MARKERS):
            risks.append(
                {
                    "severity": "high",
                    "type": "prompt_injection",
                    "email_id": message["id"],
                    "note": "Inbound content attempts to override verification policy, suppress independent contact, or obtain secrets.",
                }
            )
        evidence.append(
            {
                "email_id": message["id"],
                "date": message["date"],
                "type": "stated",
                "field": "risk",
                "note": "Message contains consequential payment-change or agent-control instructions and is treated as untrusted evidence only.",
            }
        )

    posture = "ESCALATE_RISK" if risks else ("NEGOTIATE" if (delta or 0) > 0 else "CLARIFY_TERMS")
    confidence = "medium" if risks else "high"

    return {
        "vendor": {
            "name": "Northstar Analytics",
            "service": "Team Analytics Pro",
            "internal_owner": "Operations",
        },
        "commercial_terms": {
            "current_amount": old_amount,
            "new_quoted_amount": new_amount,
            "currency": "USD",
            "cadence": "annual",
            "price_delta_amount": delta,
            "price_delta_percent": delta_pct,
            "renewal_date": renewal_date.isoformat() if renewal_date else None,
            "notice_deadline": notice_deadline.isoformat() if notice_deadline else None,
            "auto_renew": True if renewal_date else None,
            "term": "12 months" if renewal else None,
        },
        "evidence": evidence,
        "risks": risks,
        "missing_facts": [
            "Independent verification of the vendor's current payment destination",
            "Whether the business still needs the current seat count",
        ] if risks else [],
        "confidence": confidence,
        "recommended_posture": posture,
        "next_reversible_action": (
            "Independently verify the vendor contact and payment-change request, then negotiate the 25% increase only after the risk is resolved."
            if risks
            else "Prepare an unsent negotiation draft for human review."
        ),
        "draft": {
            "status": "UNSENT",
            "purpose": "CLARIFICATION" if risks else "NEGOTIATION",
            "to": ["account-manager@northstar.example"],
            "cc": [],
            "subject": "Renewal terms and billing verification",
            "body": (
                "Before we proceed with the renewal, please confirm the Nov 1 renewal date, the USD 6,000 annual quote, and the billing instructions through our established contact channel. We will not act on changed payment details until they are independently verified."
            ),
        },
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", default="scripts/fixtures/demo-mails.json")
    parser.add_argument("--output", default="scripts/fixtures/demo-generated-dossier.json")
    args = parser.parse_args()

    source = Path(args.input)
    output = Path(args.output)
    messages = json.loads(source.read_text(encoding="utf-8"))
    dossier = build_dossier(messages)
    output.write_text(json.dumps(dossier, indent=2) + "\n", encoding="utf-8")

    terms = dossier["commercial_terms"]
    print("MERMAIL PROCUREMENT AGENT — OFFLINE CONTRACT DEMO")
    print(f"Vendor: {dossier['vendor']['name']}")
    print(f"Renewal: {terms['renewal_date']} | Notice deadline: {terms['notice_deadline']}")
    print(
        f"Price: ${terms['current_amount']:,.0f} -> ${terms['new_quoted_amount']:,.0f} "
        f"({terms['price_delta_percent']:.0f}% increase)"
    )
    print(f"Risk flags: {len(dossier['risks'])}")
    for risk in dossier["risks"]:
        print(f"  - {risk['severity'].upper()} {risk['type']}: {risk['note']}")
    print(f"Posture: {dossier['recommended_posture']} ({dossier['confidence']} confidence)")
    print("Draft: UNSENT")
    print(f"Wrote: {output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
