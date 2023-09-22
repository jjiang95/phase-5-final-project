from flask import request, make_response, jsonify, session
from flask_restful import Resource
from config import app, db, api
from models import User

class Home(Resource):

    def get(self):
        data = User.query.all()
        response = make_response(
            [item.to_dict() for item in data], 
            200
        )

        return response
    
api.add_resource(Home, '/home')
    
if __name__ == '__main__':
    app.run(port=5555, debug=True)