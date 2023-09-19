from flask import Flask, request, make_response
from flask_cors import CORS
from flask_restful import Api, Resource
from flask_migrate import Migrate
from models import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)
api = Api(app)

class Home(Resource):

    def get(self):
        response = {'message': 'Home'}

        return response
    
api.add_resource(Home, '/')
    
# @app.route('/')
# def home():
#     return '<h1>Home</h1>'

if __name__ == '__main__':
    app.run(port=5555, debug=True)