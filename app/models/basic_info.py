from .. import db


class BasicInfo(db.Model):
    __tablename__ = 'basic_info'

    id = db.Column(db.Integer, primary_key=True)
    first_name_eng = db.Column(db.String(50), nullable=False)
    last_name_eng = db.Column(db.String(50), nullable=False)
    first_name_kor = db.Column(db.String(50), nullable=False)
    last_name_kor = db.Column(db.String(50), nullable=False)
    birth_date = db.Column(db.Date, nullable=False)
    title_eng = db.Column(db.String(50), nullable=False)
    title_kor = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(50), nullable=False)
    address_eng = db.Column(db.String(100), nullable=False)
    address_kor = db.Column(db.String(100), nullable=False)
    github = db.Column(db.String(50), nullable=False)
    linkedin = db.Column(db.String(50), nullable=False)
    introduction_eng = db.Column(db.Text, nullable=False)
    introduction_kor = db.Column(db.Text, nullable=False)
    profile_image = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'BasicInfo {self.id}'

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

    def update(self, data):
        for key, value in data.items():
            setattr(self, key, value)
