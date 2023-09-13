from datetime import datetime

from flask import Blueprint, render_template
from sqlalchemy import func

from app.models import BasicInfo, Career, Education, Project, ProjectSkill, Skill


main_bp = Blueprint('main', __name__)


@main_bp.context_processor
def inject_current_year():
    return {'current_year': datetime.now().year}


@main_bp.route('/')
def main_page():
    return render_template('main.html')


@main_bp.route('/<first_name_eng>')
def user_portfolio(first_name_eng):
    user = BasicInfo.query.filter(func.lower(BasicInfo.first_name_eng) == func.lower(first_name_eng)).first()

    if user:
        user_id = user.id  # 현재 사용자의 ID를 가져옵니다.
        educations = Education.query.filter_by(basic_info_id=user_id).all()
        all_skills = Skill.query.filter_by(basic_info_id=user_id).all()

        # 스킬 타입에 따른 분류
        skill_type_dict_eng = {}
        skill_type_dict_kor = {}
        for skill in all_skills:
            skill_dict = skill.to_dict()
            if skill.skill_type_eng not in skill_type_dict_eng:
                skill_type_dict_eng[skill.skill_type_eng] = []
            if skill.skill_type_kor not in skill_type_dict_kor:
                skill_type_dict_kor[skill.skill_type_kor] = []
            skill_type_dict_eng[skill.skill_type_eng].append(skill_dict)
            skill_type_dict_kor[skill.skill_type_kor].append(skill_dict)

        careers = Career.query.filter_by(basic_info_id=user_id).all()
        careers_info = []

        personal_project_info = []
        projects_without_career = Project.query.filter_by(career_id=None).all()
        for project in projects_without_career:
            project_dict = project.to_dict()
            skills = Skill.query.join(ProjectSkill).filter(ProjectSkill.project_id == project.id).all()
            project_dict["skills"] = [skill.to_dict() for skill in skills]
            personal_project_info.append(project_dict)

        for career in careers:
            career_dict = career.to_dict()
            projects = Project.query.filter_by(career_id=career.id).all()

            project_info = []
            for project in projects:
                project_dict = project.to_dict()
                skills = Skill.query.join(ProjectSkill).filter(ProjectSkill.project_id == project.id).all()
                project_dict["skills"] = [skill.to_dict() for skill in skills]
                project_info.append(project_dict)

            career_dict["projects"] = project_info
            careers_info.append(career_dict)

        full_user_info = {
            'user': user.to_dict(),
            'educations': [education.to_dict() for education in educations],
            'skills': [skill.to_dict() for skill in all_skills],
            'careers': careers_info,
            'personal_projects': personal_project_info,
            'skill_type_dict_eng': skill_type_dict_eng,
            'skill_type_dict_kor': skill_type_dict_kor
        }

        return render_template(f'{first_name_eng}_portfolio.html', info=full_user_info)

    else:
        return "User not found", 404


@main_bp.route('/basic_info')
def basic_info_page():
    return render_template('basic_info.html')


@main_bp.route('/additional_info')
def additional_info_page():
    return render_template('additional_info.html')


@main_bp.route('/update_info')
def update_info_page():
    return render_template('update_info.html')
