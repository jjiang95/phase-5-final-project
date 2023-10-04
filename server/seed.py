from app import app
from models import User, Post, Prompt, favorite
from config import db

if __name__ == '__main__':
    with app.app_context():

        db.session.query(favorite).delete()
        Prompt.query.delete()
        Post.query.delete()
        User.query.delete()

        user1 = User(username='jasmine', admin=True)
        user1.password = 'qwerty'

        user2 = User(username='john123')
        user2.password = 'asdf'

        users = []
        users.append(user1)
        users.append(user2)
        
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
        
        db.session.add_all(users)
        db.session.add_all(prompts)
        db.session.commit()