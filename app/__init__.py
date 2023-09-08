import json

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def create_app():
    app = Flask(__name__, template_folder='../templates', static_folder='../static')

    with open('config.json') as f:
        config = json.load(f)

    app.config['SQLALCHEMY_DATABASE_URI'] = config['DATABASE_URL']

    db.init_app(app)

    with app.app_context():
        db.create_all()

    from app.routes.main import main
    app.register_blueprint(main)

    return app
