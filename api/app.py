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

    """
    API for trustworthy detection (subtask A)
    return 1 if the post is not trustworthy, 0 otherwise
    """
    @app.route('/api/trust')
    @cross_origin()
    def detectTrust():
        post_text = request.args.get('text')
        print(post_text)
        post_text = ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)"," ",post_text).split())
        tokenizer = DistilBertTokenizerFast.from_pretrained("distilbert-base-uncased")
        encoding = tokenizer(post_text, padding=True, truncation=True)
        # model detecting trustworthiness
        model = torch.load('model_file_A.pt')
        model.eval()
        inputid = torch.tensor(encoding['input_ids'])
        attentionmask = torch.tensor(encoding['attention_mask'])
        with torch.no_grad():
            output = model(inputid.unsqueeze(0), attentionmask.unsqueeze(0))
        label = np.argmax(output[0].numpy())
        print(label)
        return str(label)

    """
    API for verifiable detection (subtask B)
    return 1 if the post is verifiable, 0 otherwise
    """
    @app.route('/api/verify')
    @cross_origin()
    def detectVerify():
        post_text = request.args.get('text')
        print(post_text)
        post_text = ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)"," ",post_text).split())
        tokenizer = DistilBertTokenizerFast.from_pretrained("distilbert-base-uncased")
        encoding = tokenizer(post_text, padding=True, truncation=True)
        
        # TODO: replace with verifiable algorithm later
        model = torch.load('model_file_A.pt')
        model.eval()
        inputid = torch.tensor(encoding['input_ids'])
        attentionmask = torch.tensor(encoding['attention_mask'])
        with torch.no_grad():
            output = model(inputid.unsqueeze(0), attentionmask.unsqueeze(0))
        label = np.argmax(output[0].numpy())
        print(label)
        return str(label)
    
    """
    API for harmfulness detection (subtask B)
    return 1 if the post is harmful, 0 otherwise
    """
    @app.route('/api/harm')
    @cross_origin()
    def detectHarm():
        post_text = request.args.get('text')
        print(post_text)
        post_text = ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)"," ",post_text).split())
        tokenizer = DistilBertTokenizerFast.from_pretrained("distilbert-base-uncased")
        encoding = tokenizer(post_text, padding=True, truncation=True)

        # TODO: replace with harmful model later
        model = torch.load('model_file_A.pt')
        model.eval()
        inputid = torch.tensor(encoding['input_ids'])
        attentionmask = torch.tensor(encoding['attention_mask'])
        with torch.no_grad():
            output = model(inputid.unsqueeze(0), attentionmask.unsqueeze(0))
        label = np.argmax(output[0].numpy())
        print(label)
        return str(label)
    
    """
    Backup API
    Label 0 vs. 1 randomly
    """
    @app.route('/api/random')
    @cross_origin()
    def detectRandom():
        post_text = request.args.get('text')
        print(post_text)
        # replace with classifiacation algorithm later
        randomClassification = random.randint(0, 1)
        print(randomClassification)
        return str(randomClassification)

    return app