"""Functions for **creating / detecting** missing values."""

import numpy as np
import pandas as pd


def inject_missing_values(df: pd.DataFrame,
                          row_frac: float = 0.1,
                          max_missing_per_row: int = 2) -> pd.DataFrame:
    """
    Randomly choose `row_frac` of rows and set up to
    `max_missing_per_row` cells to NaN in each chosen row.
    """
    df_missing = df.copy()
    n_rows, n_cols = df_missing.shape
    corrupt_rows = np.random.choice(n_rows,
                                    size=int(np.ceil(row_frac * n_rows)),
                                    replace=False)

    for r in corrupt_rows:
        k = np.random.randint(1, max_missing_per_row + 1)   # how many NaNs
        cols = np.random.choice(n_cols, size=k, replace=False)
        df_missing.iloc[r, cols] = np.nan

    return df_missing
