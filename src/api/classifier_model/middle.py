from flask import Flask, request, jsonify
from clf_model import *
from beautifulsoup import * 


app = Flask(__name__)

@app.route("/web_article/results", methods=["POST"])
def middle():
    print(request.json)
    url = request.json['url']
    [title, originalText, text]= wordopt(url) 

    msg = {
        'link': url,
        'title': title, 
        'originalText': originalText, 
        'text': text, 
        'label': make_prediction(text)
    }

    return jsonify(msg)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=2020, debug=True)