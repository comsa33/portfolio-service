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
    print("Received data:", data)  # 로그에 수신된 데이터 출력

    basic_info = BasicInfo.query.first()
    if basic_info:
        basic_info.update(data)  # 기존 객체 업데이트
    else:
        new_info = BasicInfo(**data)  # 새 객체 생성
        db.session.add(new_info)

    try:
        db.session.commit()
    except Exception as e:
        print("Database error:", e)
        db.session.rollback()
        return jsonify({"error": "Database error"}), 500

    return jsonify(data)
