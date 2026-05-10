import os
from flask import Flask
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    CORS(app)

    # Resolve caminho absoluto para fotos_flor (dois níveis acima de backend/app/)
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
    app.config['FOTOS_DIR'] = os.path.join(project_root, 'fotos_flor')

    from . import routes
    app.register_blueprint(routes.bp)

    return app
