import json
import random

accServerPath = "D:/Steam/steamapps/common/Assetto Corsa Competizione Dedicated Server/"
dataPath = "Data/"
templatePath = "Template/"

def makeEventConfig(trackData) :
    """ Create event file """
    with open(dataPath + 'defaultEntryList.json') as json_file:
        finalEvent = json.load(json_file)
        json_file.close()
    # Choose track
    listTrack = random.choice(list(trackData.keys()))
    finalTrack = random.choice(trackData[listTrack])

    print(finalTrack)
    # Choose weather

 
    with open(accServerPath + 'event.json', 'w') as outfile:
        json.dump(finalEvent, outfile)
        outfile.close()

def makeFirstRace() : 
    """ Create random entrylist + random track and cars """
    with open(dataPath + 'defaultEntryList.json') as json_file:
        data = json.load(json_file)
        json_file.close()
    random.shuffle(data)
    finalEntryList = {
        "entries" : [],
        "forceEntryList": 1
    }
    for userData in data :
        userEntry = {"drivers" : {
            "firstName": userData["First name"],
            "lastName": userData["Surname"],
            "playerID": userData["Steam id "],
            "forcedCarModel": -1,
            "overrideDriverInfo": 1,
            }}
        if userData["Steam id "] == "76561198445003541" :
            print(userEntry["drivers"])
            userEntry["drivers"]["isServerAdmin"] = 1
        finalEntryList["entries"].append(userEntry)



    with open(accServerPath + 'entrylist.json', 'w') as outfile:
        json.dump(finalEntryList, outfile)
        outfile.close()

def makeAnotherRace(resultData):
    print("makeAnotherRace")

with open(dataPath + 'cars.json') as json_file:
    carsData = json.load(json_file)
    json_file.close()
with open(dataPath + 'tracks.json') as json_file:
    trackData = json.load(json_file)
    json_file.close()

with open(dataPath + 'result.json') as json_file:
    data = json.load(json_file)
    if len(data) == 0 :
        makeFirstRace()
        
    else :
        makeAnotherRace(data)

    makeEventConfig(trackData)
    json_file.close()