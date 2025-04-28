# table.py ─────────────────────────────────────────────────────────────
from flask import Blueprint, jsonify
import backend.data_store as store
import pandas as pd

bp = Blueprint("table", __name__)

@bp.route("/table")
def table():
    if store.df_missing is None:
        return jsonify(error="No data – upload first."), 400
    rows = []
    for idx, row in store.df_missing.iterrows():
        rows.append({
            "id": int(idx),
            "missing": int(row.isna().sum()),
            "values": {c: None if pd.isna(row[c]) else row[c]
                       for c in store.df_missing.columns}
        })
    return jsonify({"rows": rows})
