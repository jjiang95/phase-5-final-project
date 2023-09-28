from app import app
from models import User, Post, Prompt, favorite
from config import db

if __name__ == '__main__':
    with app.app_context():
        User.query.delete()
        Post.query.delete()
        Prompt.query.delete()
        db.session.query(favorite).delete()

        user1 = User(username='jasmine', admin=True)
        user1.password = 'asdf'
        user2 = User(username='john123')
        user2.password = '123456'

        post1 = Post(content='Mary had a little lamb', user_id=1, prompt_id=2)
        post2 = Post(content="Baa baa black sheep", user_id=2, prompt_id=1)
        
        prompt1 = Prompt(content="IDK, write whatever", user_id=1)
        prompt2 = Prompt(content="Write something cool", user_id=1)

        user1.favorite_posts.append(post1)
        user1.favorite_posts.append(post2)
        db.session.add_all([user1, user2])
        db.session.add_all([post1, post2])
        db.session.add_all([prompt1, prompt2])
        db.session.commit()