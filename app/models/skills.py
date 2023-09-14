from datetime import datetime

from dateutil.relativedelta import relativedelta

from .. import db


class Skill(db.Model):
    __tablename__ = 'skill'

    id = db.Column(db.Integer, primary_key=True)
    skill_name_eng = db.Column(db.String(50), nullable=False)
    skill_name_kor = db.Column(db.String(50), nullable=False)
    skill_type_eng = db.Column(db.String(50), nullable=False)
    skill_type_kor = db.Column(db.String(50), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    skill_level = db.Column(db.Integer, nullable=False)
    description_eng = db.Column(db.Text, nullable=False)
    description_kor = db.Column(db.Text, nullable=False)
    skill_image = db.Column(db.String(50), nullable=False)
    basic_info_id = db.Column(db.Integer, db.ForeignKey('basic_info.id'), nullable=False)
    basic_info = db.relationship('BasicInfo', backref=db.backref('skills', lazy=True))

    def __repr__(self):
        return f'Skill {self.id}'

    def to_dict(self):
        skill_dict = {column.name: getattr(self, column.name) for column in self.__table__.columns}

        # 현재 날짜와 start_date를 비교하여 연도와 개월 계산
        current_date = datetime.now().date()
        delta = relativedelta(current_date, self.start_date)
        years_of_experience = delta.years
        months_of_experience = delta.months

        if years_of_experience == 0 and months_of_experience > 0:
            # 연도가 0이면서 개월이 1 이상인 경우, 개월로 표시
            skill_dict['experience_eng'] = f"{months_of_experience} months"
            skill_dict['experience_kor'] = f"{months_of_experience}개월"
        elif years_of_experience > 0:
            # 연도가 1 이상인 경우, 연도로 표시
            skill_dict['experience_eng'] = f"{years_of_experience} years"
            skill_dict['experience_kor'] = f"{years_of_experience}년"
        else:
            # 연도와 개월 모두 0인 경우 (1개월 미만)
            skill_dict['experience_eng'] = "Less than a month"
            skill_dict['experience_kor'] = "1개월 미만"

        return skill_dict
