from app import app
from models import User
from config import db

if __name__ == '__main__':
    with app.app_context():
        User.query.delete()

        user1 = User(username='xijiang', admin=True)
        user1.password = '123456'
        user2 = User(username='jjiang95')
        user2.password = '12345678'

        db.session.add(user1)
        db.session.add(user2)
        db.session.commit()