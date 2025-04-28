"""
analysis package – aggregates the individual functional modules so
callers can still write:

    from analysis import inject_missing_values, compute_dr, ...

This keeps app.py unchanged after the refactor.
"""
from .missing   import inject_missing_values   # noqa: F401
from .reduction import compute_dr              # noqa: F401
from .outlier   import fit_lof                 # noqa: F401
from .neighbors import find_neighbors          # noqa: F401

__all__ = [
    "inject_missing_values",
    "compute_dr",
    "fit_lof",
    "find_neighbors",
]
