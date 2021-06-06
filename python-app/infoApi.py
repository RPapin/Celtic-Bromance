from flask import Flask, request
import json
from os import path, listdir
import os.path
from os.path import isfile, join
import accRandomizer as accR
from flask_cors import CORS, cross_origin
from flask import jsonify
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
# app.config["DEBUG"] = True

onlyfiles = [f for f in listdir(os.getcwd()) if isfile(join(os.getcwd(), f))]
pathData = os.path.join(os.getcwd(), 'data.json')

@app.route('/', methods=['GET'])
def home():
    return "<h1>ACC randomize app Info Api</h1>"
# A route to return all data.
@app.route('/start_championnship', methods=['GET'])
@cross_origin()
def start_championnship():
    firstRoundSettings = accR.startChampionnship()
    return jsonify(firstRoundSettings)
@app.route('/display_result', methods=['GET'])
def display_result():
    fullResult = accR.checkResult()
    return fullResult
        
@app.route('/launch_server', methods=['GET'])
def launch_server():
    serverStatus = accR.launchServer()
    return jsonify(serverStatus)


@app.route('/api/v1/resources/books', methods=['GET'])
def api_id():
    # Check if an ID was provided as part of the URL.
    # If ID is provided, assign it to a variable.
    # If no ID is provided, display an error in the browser.
    if 'id' in request.args:
        id = int(request.args['id'])
    else:
        return "Error: No id field provided. Please specify an id."
if __name__ == "__main__":
    app.run(host='localhost')