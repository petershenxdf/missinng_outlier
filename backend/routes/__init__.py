"""Helper that gathers all blueprint modules so __init__.py stays tidy."""
from .upload     import bp as upload_bp
from .embedding  import bp as embedding_bp
from .table      import bp as table_bp
from .neighbors  import bp as neighbors_bp

all_blueprints = [
    upload_bp,
    embedding_bp,
    table_bp,
    neighbors_bp,
]
