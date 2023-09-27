from app import app
from models import User, Post, Prompt, Favorite
from config import db

if __name__ == '__main__':
    with app.app_context():
        User.query.delete()
        Post.query.delete()
        Prompt.query.delete()
        Favorite.query.delete()

        user1 = User(username='jasmine', admin=True)
        user1.password = 'asdf'
        user2 = User(username='john123')
        user2.password = '123456'

        post1 = Post(content='Mary had a little lamb', user_id=1, prompt_id=2)
        post2 = Post(content="Baa baa black sheep", user_id=2, prompt_id=1)
        
        prompt1 = Prompt(content="IDK, write whatever", user_id=1)
        prompt2 = Prompt(content="Write something cool", user_id=1)

        favorite1 = Favorite(user_id=2, post_id=1)
        favorite2 = Favorite(user_id=1, post_id=2)

        db.session.add(user1)
        db.session.add(user2)
        db.session.add(post1)
        db.session.add(post2)
        db.session.add(prompt1)
        db.session.add(prompt2)
        db.session.add(favorite1)
        db.session.add(favorite2)
        db.session.commit()