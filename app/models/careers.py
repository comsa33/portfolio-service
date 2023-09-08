from .. import db


class Career(db.Model):
    __tablename__ = 'career'

    id = db.Column(db.Integer, primary_key=True)
    company_name_eng = db.Column(db.String(50), nullable=False)
    company_name_kor = db.Column(db.String(50), nullable=False)
    company_type_eng = db.Column(db.String(50), nullable=False)
    company_type_kor = db.Column(db.String(50), nullable=False)
    department_eng = db.Column(db.String(50), nullable=False)
    department_kor = db.Column(db.String(50), nullable=False)
    position_eng = db.Column(db.String(50), nullable=False)
    position_kor = db.Column(db.String(50), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    description_eng = db.Column(db.Text, nullable=False)
    description_kor = db.Column(db.Text, nullable=False)
    basic_info_id = db.Column(db.Integer, db.ForeignKey('basic_info.id'), nullable=False)
    basic_info = db.relationship('BasicInfo', backref=db.backref('careers', lazy=True))

    def __repr__(self):
        return f'Career {self.id}'

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}
