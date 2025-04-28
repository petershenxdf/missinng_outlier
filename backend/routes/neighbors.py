# neighbors.py ─────────────────────────────────────────────────────────
from flask import Blueprint, jsonify, current_app as cap
import backend.data_store as store
from analysis import find_neighbors

bp = Blueprint("neighbors", __name__)

@bp.route("/neighbors/<int:row_id>")
def neighbors(row_id):
    if store.df_missing is None:
        return jsonify(error="Data not loaded."), 400
    try:
        nbrs = find_neighbors(row_id,
                              store.df_missing,
                              store.df_complete,
                              store.lof_scores,
                              k=5)
        return jsonify({
            "neighbors": nbrs,
            "mean_outlier_score": float(store.lof_scores.mean())
        })
    except Exception as exc:
        cap.logger.exception("Neighbor lookup failed")
        return jsonify(error=str(exc)), 500
