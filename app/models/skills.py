from datetime import datetime

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

        # 현재 연도와 start_date의 연도를 비교하여 사용한 연도 계산
        current_year = datetime.now().year
        years_of_experience = current_year - self.start_date.year

        # 계산한 'years_of_experience' 값을 딕셔너리에 추가
        skill_dict['years_of_experience'] = years_of_experience

        return skill_dict
