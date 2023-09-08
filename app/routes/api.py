from flask import Blueprint, jsonify, request

from app.models import BasicInfo, Career, CareerProject, Education, Project, ProjectSkill, Skill
from app import db


api = Blueprint('api', __name__)


@api.route('/basic_info', methods=['GET'])
def get_basic_info():
    basic_info = BasicInfo.query.first()
    return jsonify(basic_info.to_dict())


@api.route('/basic_info', methods=['POST'])
def update_basic_info():
    basic_info = BasicInfo.query.first()
    data = request.get_json()
    basic_info.update(data)
    db.session.commit()
    return jsonify(basic_info.to_dict())


