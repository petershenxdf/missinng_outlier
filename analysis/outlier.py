"""Local-Outlier-Factor helper."""

from sklearn.neighbors import LocalOutlierFactor
from .utils import prep_X


def fit_lof(df_complete,
            n_neighbors: int = 20):
    """
    Fit LOF on complete-case data and return (model, positive_scores).
    """
    X = prep_X(df_complete)
    lof = LocalOutlierFactor(n_neighbors=n_neighbors)
    lof.fit_predict(X)                       # the model stores scores internally
    scores = -lof.negative_outlier_factor_   # make them positive for readability
    return lof, scores
