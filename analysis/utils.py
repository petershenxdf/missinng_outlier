"""Small shared helpers used by several sub-modules."""

import numpy as np
import pandas as pd


def prep_X(df: pd.DataFrame) -> np.ndarray:
    """
    Convert a complete-case DataFrame to a float NumPy array once,
    so different algorithms don’t repeat the cast.
    """
    return df.values.astype(float)
