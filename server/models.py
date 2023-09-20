from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(20), nullable=False)
    created = db.Column(db.DateTime, default=db.func.now())
    admin = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'User: {self.username} | Created: {self.created}'