"""All **dimensionality-reduction** algorithms live here."""

import numpy as np
from sklearn.manifold   import MDS, TSNE, Isomap
from sklearn.decomposition import PCA
from .utils import prep_X            # shared helper

# Optional – if the package isn't installed we warn the caller.
try:
    import umap                     # pip install umap-learn
    HAVE_UMAP = True
except ModuleNotFoundError:
    HAVE_UMAP = False


def compute_dr(method: str,
               df_complete,
               random_state: int = 42) -> np.ndarray:
    """
    Dispatch to the requested 2-D projection.

    Parameters
    ----------
    method : {'mds','tsne','pca','isomap','umap'}
    df_complete : pandas DataFrame of complete rows
    random_state : for reproducibility where relevant
    """
    X = prep_X(df_complete)

    if method == "mds":
        return MDS(n_components=2, random_state=random_state).fit_transform(X)

    if method == "tsne":
        return TSNE(n_components=2, random_state=random_state,
                    init="pca").fit_transform(X)

    if method == "pca":
        return PCA(n_components=2, random_state=random_state).fit_transform(X)

    if method == "isomap":
        return Isomap(n_components=2).fit_transform(X)

    if method == "umap":
        if not HAVE_UMAP:
            raise RuntimeError("UMAP requested but 'umap-learn' is not installed")
        return umap.UMAP(n_components=2, random_state=random_state).fit_transform(X)

    raise ValueError(f"Unknown DR method '{method}'")
