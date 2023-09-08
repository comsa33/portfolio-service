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
