from app import app
from models import User, Post, Prompt, favorite
from config import db
from faker import Faker
from random import randint, choice

if __name__ == '__main__':
    with app.app_context():

        fake = Faker()
        User.query.delete()
        Post.query.delete()
        Prompt.query.delete()
        db.session.query(favorite).delete()

        user1 = User(username='jasmine', admin=True)
        user1.password = 'asdf'

        users = []
        users.append(user1)
        
        for _ in range(10):
            user = User(
                username=fake.first_name()
            )
            user.password = fake.word()
            users.append(user)

        prompts = []

        for _ in range(10):
            prompt = Prompt(
                content=fake.paragraph(nb_sentences=2),
                user_id=1
            )
            prompts.append(prompt)

        posts = []

        for _ in range(50):
            post = Post(
                content=fake.paragraph(nb_sentences=4),
                user_id=randint(1, 11),
                prompt_id=randint(1, 10)
            )
            posts.append(post)
        
        for user in users:
            user.favorite_posts.append(choice(posts))
            user.favorite_posts.append(choice(posts))
            user.favorite_posts.append(choice(posts))
            
        db.session.add_all(users)
        db.session.add_all(posts)
        db.session.add_all(prompts)
        db.session.commit()