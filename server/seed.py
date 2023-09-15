from app import app
from models import db, User

if __name__ == '__main__':
    with app.app_context():
        User.query.delete()

        user = User(username='xijiang', password='123456')

        db.session.add(user)
        db.session.commit()