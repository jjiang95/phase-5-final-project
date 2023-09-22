from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    _password = db.Column(db.String, nullable=False)
    created = db.Column(db.DateTime, default=db.func.now())
    admin = db.Column(db.Boolean, nullable=False, default=False)

    @hybrid_property
    def password(self):
        raise Exception('Cannot view password hashes')
    
    @password.setter
    def password(self, p):
        password = bcrypt.generate_password_hash(
            p.encode('utf-8')
        )
        self._password = password.decode('utf-8')
    
    def authenticate(self, p):
        return bcrypt.check_password_hash(
            self._password, p.encode('utf-8')
        )

    def __repr__(self):
        return f'User: {self.username} | Created: {self.created}'
    
class Posts(db.Model, SerializerMixin):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(600), nullable=False)
    likes = db.Column(db.Integer, default=0, nullable=False)

