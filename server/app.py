from flask import request, make_response, request, jsonify, session
from flask_restful import Resource
from config import app, db, api
from models import User, Prompt, Post, Favorite
from sqlalchemy.exc import IntegrityError

class AllPrompts(Resource):

    def get(self):
        data = Prompt.query.all()
        response = make_response(
            [item.to_dict() for item in data], 
            200
        )

        return response

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
                return {'errors': 'username already taken'}, 400
        else:
            return {'errors':'unprocessable entity'}, 422
        
class CheckSession(Resource):
    def get(self):
        
        if session.get('user_id') == None:
            return {}, 204
        else:
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
        return {'message': 'successfully logged out'}, 204

class PostByID(Resource):
    pass

class PromptByID(Resource):
    pass

class UserByUsername(Resource):
    def get(self, username):
        user = User.query.filter_by(username=username).first()
        if user:
            return user.to_dict(), 200
        else:
            return {'errors': 'user not found'}, 404

api.add_resource(CheckSession, '/check_session')
api.add_resource(AllPrompts, '/prompts/all')
api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(PostByID, '/posts/<int:id>')
api.add_resource(PromptByID, '/prompts/<int:id>')
api.add_resource(UserByUsername, '/users/<string:username>')
    
if __name__ == '__main__':
    app.run(port=5555, debug=True)