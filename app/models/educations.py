from .. import db


class Education(db.Model):
    __tablename__ = 'education'

    id = db.Column(db.Integer, primary_key=True)
    school_name_eng = db.Column(db.String(50), nullable=False)
    school_name_kor = db.Column(db.String(50), nullable=False)
    degree_eng = db.Column(db.String(50), nullable=False)
    degree_kor = db.Column(db.String(50), nullable=False)
    major_eng = db.Column(db.String(50), nullable=False)
    major_kor = db.Column(db.String(50), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    description_eng = db.Column(db.Text, nullable=False)
    description_kor = db.Column(db.Text, nullable=False)
    logo_image = db.Column(db.String(50), nullable=False)
    basic_info_id = db.Column(db.Integer, db.ForeignKey('basic_info.id'), nullable=False)
    basic_info = db.relationship('BasicInfo', backref=db.backref('educations', lazy=True))

    def __repr__(self):
        return f'Education {self.id}'
