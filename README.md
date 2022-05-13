
<p align="center">
  <img src="images/check_64.png" />
</p>

# Tweetect: Tweet Detection Chrome Extension
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

Tweetect is a Chrome extension for Twitter post detection. This software support 2 features:

1. Labelling: Detect 3 types of labels
    - Untrustworthy Post
    - Harmful Post
    - Post with Verifiable Arguments

2. Retweet Preventions
    - Alert pops up when trying to retweet a harmful tweet

# Clone this Repository

In your terminal, run
```
git clone https://github.com/TongyunHuang/Tweet-detection-plugin.git
```


# Run API
## Install model
Install models in [Google Drive](https://drive.google.com/file/d/17n5SRuLEPj2ZAgC-ElhbnMI-BxKoBLk5/view?usp=sharing), unzip the folder and put `model_file_A.pt`, `model_file_B.pt` and `model_file_C.pt` in the `/api` directory

## REST API

You may want to install flask if you havnt done so:
```
pip install Flask
```

First time running the api:
```
cd api
export FLASK_APP=app
export FLASK_ENV=development
flask run
```

If you have already setup environment variables `FLASK_APP` and `FLASK_ENV`, you can just run `flask run` inside the `api` directory

## Resource
[Quickstart - Flask Document](https://flask.palletsprojects.com/en/2.1.x/quickstart/)



# Extension Usage

1. Visit: [chrome://extensions/](chrome://extensions/)

2. Turn on Developer Mode (top right corner)

    <p align="center"><img style="width:200px" src="images/developer-mode.png"></p>

3. Upload the folder containing `manifest.json` file

    (1).  Click `Load unpacked` in the top right corner

    <p align="center"><img style="width:200px" src="images/start-upload.png"></p>

    (2). Choose the `plugin/src` folder, which contains the `manifest.json` file

    <p align="center"><img style="width:200px" src="images/upload-extension.png"></p>

    - You shoule see that uploaded extension in chrome extension manager

        <p align="center"><img style="width:200px" src="images/extension-uploaded.png"></p>

4. Pin the extension to the toolbar
    
    <p align="center"><img style="width:200px" src="images/pin.png"></p>

5. Go to twitter and start detecting

    <p align="center"><img style="width:150px" src="images/popup.png"></p>

    - It might take about a minute to run, but eventually you will see tha generated labels. You will also see alert pops up when you try to retweet harmful post
    
        <p align="center"><img style="width:300px" src="images/result.png"></p>

