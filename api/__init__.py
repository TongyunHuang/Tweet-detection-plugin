import os
import re
import torch
import numpy as np
import transformers
from transformers import DistilBertTokenizerFast
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
        post_text = ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)"," ",post_text).split())
        tokenizer = DistilBertTokenizerFast.from_pretrained("distilbert-base-uncased")
        encoding = tokenizer(post_text, padding=True, truncation=True)
        # replace with classifiacation algorithm later
        model = torch.load('model_file_A.pt')
        model.eval()
        inputid = torch.tensor(encoding['input_ids'])
        attentionmask = torch.tensor(encoding['attention_mask'])
        with torch.no_grad():
            output = model(inputid.unsqueeze(0), attentionmask.unsqueeze(0))
        label = np.argmax(output[0].numpy())
        print(label)
        return str(label)

    return app