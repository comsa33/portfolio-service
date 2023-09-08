from flask import Blueprint, jsonify, request

from app.models import BasicInfo, Career, CareerProject, Education, Project, ProjectSkill, Skill
from app import db


api = Blueprint('api', __name__)


@api.route('/basic_info', methods=['GET'])
def get_basic_info():
    basic_info = BasicInfo.query.first()
    return jsonify(basic_info.to_dict() if basic_info else {})


@api.route('/basic_info', methods=['POST'])
def update_basic_info():
    data = request.get_json()
    basic_info = BasicInfo.query.first()

    if not basic_info:
        # Create new record if it doesn't exist
        basic_info = BasicInfo(**data)
        db.session.add(basic_info)
    else:
        # Update existing record
        basic_info.update(data)

    db.session.commit()
    return jsonify(basic_info.to_dict())
