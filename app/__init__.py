from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def create_app():
    app = Flask(__name__, template_folder='../templates', static_folder='../static')
    app.config.from_object('config')

    db.init_app(app)
    with app.app_context():
        db.create_all()

    from app.routes.main import main
    app.register_blueprint(main)

    return app
