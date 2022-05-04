import os

from flask import Flask, request
from flask_cors import CORS, cross_origin
import random

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    cors = CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple page that says hello
    @app.route('/api')
    @cross_origin()
    def detectFake():
        post_text = request.args.get('text')
        print(post_text)
        # replace with classifiacation algorithm later
        randomClassification = random.randint(0, 1)
        print(randomClassification)
        return str(randomClassification)

    return app