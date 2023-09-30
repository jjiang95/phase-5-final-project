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
        prompt_content = [
            "In a small antique shop, a character discovers a pocket watch that appears to have the power to rewind time by five minutes. Describe their first encounter with this peculiar timepiece.",
            "Your character stumbles upon a collection of unsent letters hidden in their late grandmother's attic. As they read through the letters, they uncover a family secret that has been buried for decades.",
            "A character is stranded on a remote island during a stormy night. They seek shelter in an old, seemingly abandoned lighthouse. Inside, they discover a diary that reveals the lighthouse keeper's haunting experiences with the supernatural.",
            "Your character finds an old, dusty music box in the attic. When they wind it up and the music plays, they suddenly recall a long-lost childhood memory connected to the haunting melody.",
            "Write about a magician who performs a seemingly impossible trick during a live show, making a famous monument disappear in front of a large audience. Explore the reactions of the crowd and the magician's motivations behind the illusion."
        ]

        for content in prompt_content:
            prompt = Prompt(
                content=content,
                user_id=1
            )
            prompts.append(prompt)

        posts = []

        for _ in range(50):
            post = Post(
                content=fake.paragraph(nb_sentences=6),
                user_id=randint(1, 11),
                prompt_id=randint(1, 5)
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