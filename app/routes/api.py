from flask import Blueprint, jsonify, request

from app.models import BasicInfo, Career, Education, Project, ProjectSkill, Skill
from app import db


api = Blueprint('api', __name__)


@api.route('/basic_info', methods=['GET'])
def get_basic_info():
    basic_infos = BasicInfo.query.all()
    basic_infos_list = [basic_info.to_dict() for basic_info in basic_infos]
    return jsonify(basic_infos_list)


@api.route('/career', methods=['GET'])
def get_career():
    careers = Career.query.all()
    return jsonify([career.to_dict() for career in careers]), 200


@api.route('/skill', methods=['GET'])
def get_skills():
    skills = Skill.query.all()
    return jsonify([skill.to_dict() for skill in skills])


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


@api.route('/career', methods=['POST'])
def create_career():
    data = request.get_json()
    new_career = Career(
        basic_info_id=data['basic_info_id'],
        company_name_eng=data['company_name_eng'],
        company_name_kor=data['company_name_kor'],
        company_type_eng=data['company_type_eng'],
        company_type_kor=data['company_type_kor'],
        department_eng=data['department_eng'],
        department_kor=data['department_kor'],
        position_eng=data['position_eng'],
        position_kor=data['position_kor'],
        start_date=data['start_date'],
        end_date=data['end_date'],
        description_eng=data['description_eng'],
        description_kor=data['description_kor']
    )
    db.session.add(new_career)
    db.session.commit()
    return jsonify(new_career.to_dict()), 201


@api.route('/project', methods=['POST'])
def create_project():
    data = request.get_json()
    new_project = Project(
        basic_info_id=data['basic_info_id'],
        project_name_eng=data['project_name_eng'],
        project_name_kor=data['project_name_kor'],
        project_main_type_eng=data['project_main_type_eng'],
        project_main_type_kor=data['project_main_type_kor'],
        project_sub_type_eng=data['project_sub_type_eng'],
        project_sub_type_kor=data['project_sub_type_kor'],
        start_date=data['start_date'],
        end_date=data['end_date'],
        no_of_team_members=data['no_of_team_members'],
        team_name_eng=data['team_name_eng'],
        team_name_kor=data['team_name_kor'],
        summary_eng=data['summary_eng'],
        summary_kor=data['summary_kor'],
        role_description_eng=data['role_description_eng'],
        role_description_kor=data['role_description_kor'],
        issue_description_eng=data['issue_description_eng'],
        issue_description_kor=data['issue_description_kor'],
        project_link=data['project_link'],
        code_link=data['code_link'],
        project_image=data['project_image']
    )
    db.session.add(new_project)
    db.session.commit()
    return jsonify(new_project.to_dict()), 201


@api.route('/project_skill', methods=['POST'])
def add_project_skill():
    data = request.json
    project_id = data.get('project_id')
    skill_ids = data.get('skill_ids', [])

    if project_id is None:
        return jsonify({'error': 'project_id is required'}), 400

    try:
        for skill_id in skill_ids:
            new_project_skill = ProjectSkill(
                project_id=project_id,
                skill_id=skill_id
            )
            db.session.add(new_project_skill)

        db.session.commit()

        return jsonify({'message': 'ProjectSkill data saved successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@api.route('/skill', methods=['POST'])
def create_skill():
    data = request.get_json()
    new_skill = Skill(
        basic_info_id=data['basic_info_id'],
        skill_name_eng=data['skill_name_eng'],
        skill_name_kor=data['skill_name_kor'],
        skill_type_eng=data['skill_type_eng'],
        skill_type_kor=data['skill_type_kor'],
        start_date=data['start_date'],
        skill_level=data['skill_level'],
        description_eng=data['description_eng'],
        description_kor=data['description_kor'],
        skill_image=data['skill_image']
    )
    db.session.add(new_skill)
    db.session.commit()
    return jsonify(new_skill.to_dict()), 201


@api.route('/education', methods=['POST'])
def create_education():
    data = request.get_json()
    new_education = Education(
        basic_info_id=data['basic_info_id'],
        school_name_eng=data['school_name_eng'],
        school_name_kor=data['school_name_kor'],
        degree_eng=data['degree_eng'],
        degree_kor=data['degree_kor'],
        major_eng=data['major_eng'],
        major_kor=data['major_kor'],
        start_date=data['start_date'],
        end_date=data['end_date'],
        description_eng=data['description_eng'],
        description_kor=data['description_kor'],
        logo_image=data['logo_image']
    )
    db.session.add(new_education)
    db.session.commit()
    return jsonify(new_education.to_dict()), 201
