"""
A *very* light-weight global state container.
For production you’d swap this out for a real DB / cache layer.
"""
df_missing      = None
df_complete     = None
lof_model       = None
lof_scores      = None
embeddings_cache = {}      # { method : np.ndarray }
