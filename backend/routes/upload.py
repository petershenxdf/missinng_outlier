# upload.py ────────────────────────────────────────────────────────────
from flask import Blueprint, request, jsonify, current_app as cap
import pandas as pd
from analysis import inject_missing_values, fit_lof
import backend.data_store as store

bp = Blueprint("upload", __name__)

@bp.route("/upload", methods=["POST"])
def upload():
    """Receive CSV → inject NaNs → split complete rows → fit LOF."""
    file = request.files.get("file")
    if not file:
        return jsonify(error="No file uploaded"), 400
    try:
        df = pd.read_csv(file)
        store.df_missing  = inject_missing_values(df,
                                                  row_frac=0.1,
                                                  max_missing_per_row=2)
        store.df_complete = store.df_missing.dropna()
        store.lof_model, store.lof_scores = fit_lof(store.df_complete)
        store.embeddings_cache.clear()
        return jsonify({"status": "ok"})
    except Exception as exc:
        cap.logger.exception("Upload failed")
        return jsonify(error=str(exc)), 500
