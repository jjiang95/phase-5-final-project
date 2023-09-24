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
    
api.add_resource(AllPrompts, '/all-prompts')
api.add_resource(Signup, '/signup')
    
if __name__ == '__main__':
    app.run(port=5555, debug=True)