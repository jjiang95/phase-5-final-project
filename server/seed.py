from app import app
from models import db, User

if __name__ == '__main__':
    with app.app_context():
        User.query.delete()

        user1 = User(username='xijiang', password='123456', admin=True)
        user2 = User(username='jjiang95', password='12345678')

        db.session.add(user1)
        db.session.add(user2)
        db.session.commit()