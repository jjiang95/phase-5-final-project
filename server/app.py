from dotenv import load_dotenv
load_dotenv()

import os
from flask import request, make_response, request, jsonify, session
from flask_restful import Resource
from config import app, db, api
from models import User, Prompt, Post
from sqlalchemy.exc import IntegrityError

class AllPrompts(Resource):
    def get(self):
        data = Prompt.query.all()
        response = make_response(
            [item.to_dict() for item in data], 
            200
        )
        return response
    
    def post(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        content = request.get_json()['content']
        if user and user.admin == True:
            if content and len(content) <= 150:
                new_prompt = Prompt(
                    content=content,
                    user_id=request.get_json()['user_id']
                )
                db.session.add(new_prompt)
                db.session.commit()
                return new_prompt.to_dict(), 201
            else:
                return {'errors':'unprocessable entity'}, 422
        return {'errors':'unauthorized'}, 401
    
class Signup(Resource):
    def post(self):
        data = request.get_json()
        if len(data['username']) <= 20 and len(data['password']) <= 20:
            new_user = User(
                username=data['username'],
            )
            new_user.password = data['password']
            try:
                db.session.add(new_user)
                db.session.commit()
                session['user_id'] = new_user.id
                return new_user.to_dict(), 201
            except IntegrityError as e:
                db.session.rollback()
                return {'errors':'username already taken'}, 400
        else:
            return {'errors':'unprocessable entity'}, 422
        
class CheckSession(Resource):
    def get(self):
        
        if session.get('user_id') == None:
            return {}, 204
        user = User.query.filter(User.id == session.get('user_id')).first()
        return user.to_dict(), 200

class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']
        user = User.query.filter(User.username == username).first()
        if user and user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200
        return {'errors':'invalid username/password'}, 401
    
class Logout(Resource):
    def delete(self):
        session.pop('user_id', default=None)
        return {'message':'successfully logged out'}, 204

class Posts(Resource):
    
    def post(self):
        if session.get('user_id') == None:
            return {'errors':'unauthorized'}, 401
        content = request.get_json()['content']
        if content and len(content) <= 600:
            new_post = Post(
            content=content,
            user_id=request.get_json()['user_id'],
            prompt_id=request.get_json()['prompt_id']
            )
            db.session.add(new_post)
            db.session.commit()
            return new_post.to_dict(), 201
        else:
            return {'errors':'unprocessable entity'}, 422

class PostByID(Resource):
    def get(self, id):
        post = Post.query.filter_by(id=id).first()
        if post:
            return post.to_dict(), 200
        else:
            return {'errors': 'post not found'}, 404

    def patch(self, id):
        post = Post.query.filter_by(id=id).first()
        content = request.get_json()['content']
        if post and content and len(content) <= 600:
            post.content = request.get_json()['content']
            db.session.add(post)
            db.session.commit()
            return post.to_dict(), 200
        else:
            return {'errors':'unprocessable entity'}, 422

    def delete(self, id):
        post = Post.query.filter_by(id=id).first()
        if post:
            db.session.delete(post)
            db.session.commit()
            return {'message':'successfully deleted'}, 204
        return {'errors': 'post not found'}, 404

class PromptByID(Resource):
    def get(self, id):
        prompt = Prompt.query.filter_by(id=id).first()
        if prompt:
            return prompt.to_dict(), 200
        else:
            return {'errors': 'prompt not found'}, 404
    def delete(self, id):
        prompt = Prompt.query.filter_by(id=id).first()
        if prompt:
            db.session.delete(prompt)
            db.session.commit()
            return {'message':'successfully deleted'}, 204
        return {'errors': 'prompt not found'}, 404

class UserByUsername(Resource):
    def get(self, username):
        user = User.query.filter_by(username=username).first()
        if user:
            return user.to_dict(), 200
        else:
            return {'errors': 'user not found'}, 404
    def delete(self, username):
        user = User.query.filter_by(username=username).first()
        active_user = User.query.filter_by(id=session.get('user_id')).first()
        if active_user and user:
            if active_user.admin == True and user.id != active_user.id:
                db.session.delete(user)
                db.session.commit()
                return {'message':'successfully deleted'}, 204
            if active_user.id == user.id:
                db.session.delete(user)
                db.session.commit()
                session.pop('user_id', default=None)            
                return {'message':'successfully deleted'}, 204
            else:
                return {'errors':'unauthorized'}, 401
        return {'errors': 'user not found'}, 404

class Favorites(Resource):
    def post(self, user_id, post_id):
        if session.get('user_id') == user_id:
            user = User.query.filter_by(id=user_id).first()
            post = Post.query.filter_by(id=post_id).first()
            if user and post:
                user.favorite_posts.append(post)
                db.session.commit()
                return post.to_dict(), 200
            return {'errors':'post or user not found'}, 404
        return {'errors':'unauthorized'}, 401
    def delete(self, user_id, post_id):
        if session.get('user_id') == user_id:
            user = User.query.filter_by(id=user_id).first()
            post = Post.query.filter_by(id=post_id).first()
            if user and post:
                user.favorite_posts.remove(post)
                db.session.commit()
                return post.to_dict(), 200
            return {'errors':'post or user not found'}, 404
        return {'errors':'unauthorized'}, 401

api.add_resource(CheckSession, '/check_session')
api.add_resource(AllPrompts, '/prompts/all')
api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Posts, '/posts')
api.add_resource(PostByID, '/posts/<int:id>')
api.add_resource(PromptByID, '/prompts/<int:id>')
api.add_resource(UserByUsername, '/users/<string:username>')
api.add_resource(Favorites, '/favorites/<int:user_id>/<int:post_id>')
    
if __name__ == '__main__':
    app.run(port=5555, debug=True)