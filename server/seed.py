from app import app
from models import User, Post
from config import db

if __name__ == '__main__':
    with app.app_context():
        User.query.delete()
        Post.query.delete()

        user1 = User(username='xijiang', admin=True)
        user1.password = '123456'
        user2 = User(username='jjiang95')
        user2.password = '12345678'

        post1 = Post(content='Mary had a little lamb', user_id=1)
        post2 = Post(content="Baa baa black sheep", user_id=2)
        
        db.session.add(user1)
        db.session.add(user2)
        db.session.add(post1)
        db.session.add(post2)
        db.session.commit()