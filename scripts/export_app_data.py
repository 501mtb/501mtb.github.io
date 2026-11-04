#!/usr/bin/env python3
"""Export the public 501MTB workbook sheets used by the Android app to JSON."""
from datetime import date, datetime
from pathlib import Path
import json
from openpyxl import load_workbook

SOURCE = Path("Classeur_501MTB_V2.xlsx")
OUTPUT = Path("data/app-data.json")
SHEETS = {
    "Events", "Riders", "Leaders",
    "MemberRides", "Member Rides", "Member_Rides",
    "RideLog", "Ride Log", "RideRegistry", "Ride Registry",
}

def clean(value):
    if isinstance(value, (datetime, date)):
        return value.isoformat()
    if value is None:
        return ""
    if isinstance(value, (str, int, float, bool)):
        return value
    return str(value)

def main():
    if not SOURCE.exists():
        raise SystemExit(f"Workbook not found: {SOURCE}")
    workbook = load_workbook(SOURCE, data_only=True, read_only=True)
    sheets = {}
    for sheet_name in workbook.sheetnames:
        if sheet_name not in SHEETS:
            continue
        sheet = workbook[sheet_name]
        rows = sheet.iter_rows(values_only=True)
        headers = next(rows, ())
        keys = [str(value).strip() if value is not None else "" for value in headers]
        records = []
        for values in rows:
            if not any(value is not None and str(value).strip() for value in values):
                continue
            record = {}
            for index, key in enumerate(keys):
                if key:
                    record[key] = clean(values[index] if index < len(values) else None)
            records.append(record)
        sheets[sheet_name] = records
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "source": "Classeur_501MTB_V2.xlsx",
        "generated_at": datetime.now().astimezone().isoformat(timespec="seconds"),
        "sheets": sheets,
    }
    OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("Exported sheets:", ", ".join(f"{name}={len(rows)}" for name, rows in sheets.items()))

if __name__ == "__main__":
    main()
