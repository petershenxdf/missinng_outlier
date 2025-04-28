"""Nearest-neighbour lookup for *incomplete* rows."""

import numpy as np
import pandas as pd


def find_neighbors(row_id: int,
                   df_missing: pd.DataFrame,
                   df_complete: pd.DataFrame,
                   lof_scores,
                   k: int = 5):
    """
    For an incomplete row, compute distances on *observed* columns
    and return its k nearest complete neighbours plus their LOF scores.
    """
    if row_id not in df_missing.index:
        raise KeyError(f"Row {row_id} not found in DataFrame")

    target = df_missing.loc[row_id]
    mask = ~target.isna()            # columns we can compare on

    if mask.all():                   # nothing missing ⇒ nothing to do
        return []

    Xc = df_complete.loc[:, mask].values.astype(float)
    tv = target.loc[mask].values.astype(float)

    dists = np.linalg.norm(Xc - tv, axis=1)
    idx_sorted = np.argsort(dists)[:k]

    return [{
        "id": int(df_complete.index[i]),
        "distance": float(dists[i]),
        "outlier_score": float(lof_scores[i])
    } for i in idx_sorted]
