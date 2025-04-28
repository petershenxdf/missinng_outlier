# embedding.py ─────────────────────────────────────────────────────────
from flask import Blueprint, jsonify, current_app as cap
import backend.data_store as store
from analysis import compute_dr

bp = Blueprint("embedding", __name__)

@bp.route("/embedding/<method>")
def embedding(method):
    if store.df_complete is None:
        return jsonify(error="No data – upload first."), 400
    try:
        if method not in store.embeddings_cache:
            store.embeddings_cache[method] = compute_dr(method,
                                                        store.df_complete)
        coords = store.embeddings_cache[method]
        points = [{"id": int(store.df_complete.index[i]),
                   "x": float(coords[i, 0]),
                   "y": float(coords[i, 1])}
                  for i in range(coords.shape[0])]
        return jsonify({"points": points})
    except Exception as exc:
        cap.logger.exception("Embedding error")
        return jsonify(error=str(exc)), 500
