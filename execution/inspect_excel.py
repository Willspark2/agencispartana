import pandas as pd
import sys

file_path = "/root/.openclaw/media/inbound/file_25---0209c5c1-d040-499e-b521-c87582a99d78.xlsx"

try:
    xl = pd.ExcelFile(file_path)
    print(f"Sheets found: {xl.sheet_names}")
    for sheet in xl.sheet_names:
        df = pd.read_excel(file_path, sheet_name=sheet).head(10)
        print(f"\n--- Sheet: {sheet} ---")
        print(df.to_string())
except Exception as e:
    print(f"Error reading excel: {e}")
