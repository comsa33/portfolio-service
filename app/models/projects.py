from .. import db


class Project(db.Model):
    __tablename__ = 'project'

    id = db.Column(db.Integer, primary_key=True)
    career_id = db.Column(db.Integer, db.ForeignKey('career.id'), nullable=True)
    project_name_eng = db.Column(db.String(200), nullable=False)
    project_name_kor = db.Column(db.String(200), nullable=False)
    project_main_type_eng = db.Column(db.String(50), nullable=False)
    project_main_type_kor = db.Column(db.String(50), nullable=False)
    project_sub_type_eng = db.Column(db.String(50), nullable=False)
    project_sub_type_kor = db.Column(db.String(50), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    no_of_team_members = db.Column(db.Integer, nullable=False)
    team_name_eng = db.Column(db.String(50), nullable=False)
    team_name_kor = db.Column(db.String(50), nullable=False)
    summary_eng = db.Column(db.Text, nullable=False)
    summary_kor = db.Column(db.Text, nullable=False)
    role_description_eng = db.Column(db.Text, nullable=False)
    role_description_kor = db.Column(db.Text, nullable=False)
    issue_description_eng = db.Column(db.Text, nullable=False)
    issue_description_kor = db.Column(db.Text, nullable=False)
    project_link = db.Column(db.String(100), nullable=True)
    code_link = db.Column(db.String(100), nullable=True)
    project_image = db.Column(db.String(50), nullable=True)
    basic_info_id = db.Column(db.Integer, db.ForeignKey('basic_info.id'), nullable=False)
    basic_info = db.relationship('BasicInfo', backref=db.backref('projects', lazy=True))

    def __repr__(self):
        return f'Project {self.id}'

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}


class ProjectSkill(db.Model):
    __tablename__ = 'project_skill'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    project = db.relationship('Project', backref=db.backref('project_skills', lazy=True))
    skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'), nullable=False)
    skill = db.relationship('Skill', backref=db.backref('project_skills', lazy=True))

    def __repr__(self):
        return f'ProjectSkill {self.id}'

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}
