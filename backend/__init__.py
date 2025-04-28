"""
Application-factory pattern: backend.create_app() returns a Flask app.
Now explicitly points Flask to ../templates and ../static so files can stay
at the project root.
"""
from flask import Flask, render_template
import logging
from pathlib import Path
from .routes import all_blueprints

# ─────────────────────────  path setup  ────────────────────────────
BASE_DIR = Path(__file__).resolve().parent.parent   # project root
TEMPLATES_DIR = BASE_DIR / "templates"
STATIC_DIR    = BASE_DIR / "static"

def create_app():
    app = Flask(
        __name__,
        static_folder=str(STATIC_DIR),
        template_folder=str(TEMPLATES_DIR),
    )
    app.logger.setLevel(logging.DEBUG)

    @app.route("/")
    def index():
        return render_template("index.html")

    for bp in all_blueprints:
        app.register_blueprint(bp)

    return app
