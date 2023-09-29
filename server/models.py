from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

favorite = db.Table('favorite',
                        db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
                        db.Column('post_id', db.Integer, db.ForeignKey('posts.id'))
                    )

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    serialize_rules = ('-favorites', '-_password', '-prompts.user','-prompts.posts', '-posts.user',)
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    _password = db.Column(db.String(20), nullable=False)
    created = db.Column(db.DateTime, default=db.func.now())
    admin = db.Column(db.Boolean, nullable=False, default=False)

    prompts = db.relationship('Prompt', backref='user')
    posts = db.relationship('Post', backref='user')

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
    
class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'

    serialize_rules = ('-favorited_by_users', '-user.posts', '-user.prompts', '-user.favorite_posts', '-prompt')
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(600), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    prompt_id = db.Column(db.Integer, db.ForeignKey('prompts.id'))
    created = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    favorited_by_users = db.relationship('User', secondary=favorite, backref='favorite_posts')

class Prompt(db.Model, SerializerMixin):
    __tablename__ = 'prompts'

    serialize_rules = ('-posts.prompt', '-user.prompts', '-user.posts', '-user.favorite_posts')
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(150), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created = db.Column(db.DateTime, default=db.func.now())
    
    posts = db.relationship('Post', backref='prompt')