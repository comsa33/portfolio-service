from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()


def create_app():
    app = Flask(__name__, template_folder='../templates', static_folder='../static')
    app.config.from_object('config')

    db.init_app(app)
    migrate.init_app(app, db)

    with app.app_context():
        db.create_all()

    from app.routes.main import main
    app.register_blueprint(main)

    return app
