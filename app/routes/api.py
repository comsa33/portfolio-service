import traceback

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
    # URL query parameter에서 basic_info_id 가져오기
    basic_info_id = request.args.get('basic_info_id')

    # basic_info_id가 제공되지 않은 경우, 모든 Career 데이터를 가져옴
    if not basic_info_id:
        careers = Career.query.all()

    # basic_info_id가 제공된 경우
    else:
        # basic_info_id가 정수인지 확인
        try:
            basic_info_id = int(basic_info_id)
        except ValueError:
            return jsonify({"error": "Invalid basic_info_id"}), 400

        # 특정 basic_info_id와 일치하는 Career 데이터를 가져옴
        careers = Career.query.filter_by(basic_info_id=basic_info_id).all()

    # 일치하는 데이터가 없을 경우 에러 반환
    if not careers:
        return jsonify({"error": "No careers found for this basic_info_id"}), 404

    # 일치하는 데이터가 있을 경우 JSON으로 반환
    return jsonify([career.to_dict() for career in careers]), 200


@api.route('/project', methods=['GET'])
def get_project():
    # URL query parameter에서 basic_info_id 가져오기
    basic_info_id = request.args.get('basic_info_id')

    # basic_info_id가 제공되지 않은 경우, 모든 Project 데이터를 가져옴
    if not basic_info_id:
        projects = Project.query.all()

    # basic_info_id가 제공된 경우
    else:
        # basic_info_id가 정수인지 확인
        try:
            basic_info_id = int(basic_info_id)
        except ValueError:
            return jsonify({"error": "Invalid basic_info_id"}), 400

        # 특정 basic_info_id와 일치하는 Project 데이터를 가져옴
        projects = Project.query.filter_by(basic_info_id=basic_info_id).all()

    # 일치하는 데이터가 없을 경우 에러 반환
    if not projects:
        return jsonify({"error": "No projects found for this basic_info_id"}), 404

    # 일치하는 데이터가 있을 경우 JSON으로 반환
    return jsonify([project.to_dict() for project in projects]), 200


@api.route('/project/<int:project_id>/skills', methods=['GET'])
def get_project_skills(project_id):
    project_skills = ProjectSkill.query.filter_by(project_id=project_id).all()
    # Skill 정보도 추가로 가져옴
    skills_data = [
        {
            **skill.skill.to_dict(),  # Skill 모델의 to_dict 메소드를 사용
            'project_skill_id': skill.id  # ProjectSkill의 id도 추가 (필요하다면)
        }
        for skill in project_skills
    ]
    return jsonify(skills_data), 200


@api.route('/skill', methods=['GET'])
def get_skills():
    # URL query parameter에서 basic_info_id 가져오기
    basic_info_id = request.args.get('basic_info_id')

    # basic_info_id가 제공되지 않은 경우, 모든 Skill 데이터를 가져옴
    if not basic_info_id:
        skills = Skill.query.all()

    # basic_info_id가 제공된 경우
    else:
        try:
            basic_info_id = int(basic_info_id)
        except ValueError:
            return jsonify({"error": "Invalid basic_info_id"}), 400

        skills = Skill.query.filter_by(basic_info_id=basic_info_id).all()

    if not skills:
        return jsonify({"error": "No skills found for this basic_info_id"}), 404

    return jsonify([skill.to_dict() for skill in skills]), 200


@api.route('/education', methods=['GET'])
def get_educations():
    # URL query parameter에서 basic_info_id 가져오기
    basic_info_id = request.args.get('basic_info_id')

    # basic_info_id가 제공되지 않은 경우, 모든 Education 데이터를 가져옴
    if not basic_info_id:
        educations = Education.query.all()

    # basic_info_id가 제공된 경우
    else:
        try:
            basic_info_id = int(basic_info_id)
        except ValueError:
            return jsonify({"error": "Invalid basic_info_id"}), 400

        educations = Education.query.filter_by(basic_info_id=basic_info_id).all()

    if not educations:
        return jsonify({"error": "No educations found for this basic_info_id"}), 404

    return jsonify([education.to_dict() for education in educations]), 200


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
def create_or_update_career():
    data = request.get_json()

    career_id = data.get('id', None)

    if career_id:
        # Update existing career
        career = Career.query.get(career_id)
        if not career:
            return jsonify({"error": "Career not found"}), 404
        for key, value in data.items():
            setattr(career, key, value)
        db.session.commit()
        return jsonify(career.to_dict()), 200
    else:
        # Create new career
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
def create_or_update_project():
    data = request.get_json()
    project_id = data.get('id', None)

    if project_id:
        # Update existing project
        project = Project.query.get(project_id)
        if not project:
            return jsonify({"error": "Project not found"}), 404

        for key, value in data.items():
            if value == "":
                value = None
            setattr(project, key, value)

        db.session.commit()
        return jsonify(project.to_dict()), 200

    else:
        # Create new project
        career_id = data.get('career_id')
        if career_id == "":
            career_id = None

        new_project = Project(
            basic_info_id=data['basic_info_id'],
            career_id=career_id,
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
        traceback.print_exc()
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@api.route('/project_skill', methods=['DELETE'])
def remove_project_skill():
    data = request.json
    project_id = data.get('project_id')
    skill_ids = data.get('skill_ids', [])

    if project_id is None:
        return jsonify({'error': 'project_id is required'}), 400

    try:
        for skill_id in skill_ids:
            project_skill = ProjectSkill.query.filter_by(project_id=project_id, skill_id=skill_id).first()
            if project_skill:
                db.session.delete(project_skill)
            else:
                return jsonify({'error': f'Skill with id {skill_id} not found for project {project_id}'}), 404

        db.session.commit()

        return jsonify({'message': 'ProjectSkill data removed successfully'}), 200
    except Exception as e:
        traceback.print_exc()
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@api.route('/skill', methods=['POST'])
def create_or_update_skill():
    data = request.get_json()
    skill_id = data.get('id', None)

    if skill_id:
        # Update existing skill
        skill = Skill.query.get(skill_id)
        if not skill:
            return jsonify({"error": "Skill not found"}), 404

        for key, value in data.items():
            setattr(skill, key, value)

        db.session.commit()
        return jsonify(skill.to_dict()), 200
    else:
        # Create new skill
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
def create_or_update_education():
    data = request.get_json()
    education_id = data.get('id', None)

    if education_id:
        # Update existing education
        education = Education.query.get(education_id)
        if not education:
            return jsonify({"error": "Education not found"}), 404

        for key, value in data.items():
            setattr(education, key, value)

        db.session.commit()
        return jsonify(education.to_dict()), 200
    else:
        # Create new education
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
