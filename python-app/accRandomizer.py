import json
import random
from os import listdir
from os.path import isfile, join
import subprocess
import os
from shutil import copyfile


accServerPath = "D:/Steam/steamapps/common/Assetto Corsa Competizione Dedicated Server/server/"
accServerPathCfg = accServerPath + "cfg/"
accServerPathResult = accServerPath + "results/"
dataPath = "Data/"
templatePath = "Template/"
# Static cfg files, just need to put in the server folder
configFiles=["assistRules.json", "configuration.json", "settings.json"] 


def init():
    with open(dataPath + 'cars.json') as json_file:
        carsData = json.load(json_file)
        json_file.close()
    with open(dataPath + 'tracks.json') as json_file:
        trackData = json.load(json_file)
        json_file.close()
    with open(dataPath + 'weatherConfiguration.json') as json_file:
        weatherData = json.load(json_file)
        json_file.close()

    return carsData, trackData, weatherData


def makeEventConfig(trackData, weatherData) :
    """ Create event file """
    with open(templatePath + 'event.json') as json_file1:
        finalEvent = json.load(json_file1)
        json_file1.close()
    eventInfo = {}
    # Choose track
    listTrack = random.choice(list(trackData.keys()))
    finalTrack = random.choice(trackData[listTrack])
    finalEvent["track"] = finalTrack
    eventInfo["track"] = finalTrack
    # Choose weather
    finalEvent["ambientTemp"] = random.randint(weatherData['ambientTemp']["min"], weatherData['ambientTemp']["max"])
    finalEvent["cloudLevel"] = round(random.uniform(weatherData['cloudLevel']["min"], weatherData['cloudLevel']["max"]), 1)
    finalEvent["rain"] = round(random.uniform(weatherData['rain']["min"], weatherData['rain']["max"]), 1)
    finalEvent["weatherRandomness"] = random.randint(weatherData['weatherRandomness']["min"], weatherData['weatherRandomness']["max"])
    eventInfo.update({
        "Ambient temperature": finalEvent["ambientTemp"],
        "Cloud level": finalEvent["cloudLevel"],
        "Rain": finalEvent["rain"],
        "Weather randomness": finalEvent["weatherRandomness"]
    })

    # Choose daytime
    daytime = random.randint(0,23)
    timeMultipler = random.randint(0,24)
    finalEvent["sessions"][0]["hourOfDay"] = finalEvent["sessions"][1]["hourOfDay"] = daytime
    finalEvent["sessions"][0]["timeMultiplier"] = finalEvent["sessions"][1]["timeMultiplier"] = timeMultipler
    eventInfo.update({
        "Time Multipler": finalEvent["sessions"][0]["timeMultiplier"],
        "Hour of Day": finalEvent["sessions"][0]["hourOfDay"]
    })
    with open(accServerPathCfg + 'event.json', 'w') as outfile:
        json.dump(finalEvent, outfile)
        outfile.close()
    return eventInfo

def makeFirstRace(carsData) : 
    """ Create random entrylist + random track and cars """
    with open(dataPath + 'defaultEntryList.json') as json_file:
        data = json.load(json_file)
        json_file.close()
    
    # choose car class
    carClass = random.choice(list(carsData.keys()))
    carClass = carsData[carClass]["class"]
    carClassList  = dict(filter(lambda elem: elem[1]["class"] == carClass,carsData.items()))

    random.shuffle(data)
    finalEntryList = {
        "entries" : [],
        "forceEntryList": 1
    }
    finalUserInfo = []
    startingPlace = 1
    for userData in data :
        userCar = random.choice(list(carClassList.keys()))
        userEntry = {
            "drivers" : [{
                "firstName": userData["First name"],
                "lastName": userData["Surname"],
                "playerID": "S" + userData["Steam id "],
            }],
            "forcedCarModel": int(userCar),
            "overrideDriverInfo": 1,
        }
        userInfo = {
            "firstName": userData["First name"],
            "lastName": userData["Surname"],
            "starting_place": startingPlace,
            "car" : carClassList[userCar]["model"]
        }
        # I put myself as admin
        if userData["Steam id "] == "76561198445003541" :
            userEntry["isServerAdmin"] = 1
        finalEntryList["entries"].append(userEntry)
        finalUserInfo.append(userInfo)
        startingPlace += 1
        if len(carClassList) > 1:
            carClassList.pop(userCar)

    with open(accServerPathCfg + 'entrylist.json', 'w') as outfile:
        json.dump(finalEntryList, outfile)
        outfile.close()

    return finalUserInfo

def makeAnotherRace(resultData):
    print("makeAnotherRace")

def startChampionnship():
    carsData, trackData, weatherData = init()
    usersInfo = makeFirstRace(carsData)
    eventConfig = makeEventConfig(trackData, weatherData)
    firstRoundInfo = {
        "eventInfo": eventConfig,
        "usersInfo": usersInfo
    }
    return firstRoundInfo

def nextRound():
    carsData, trackData, weatherData = init()
    makeAnotherRace(carsData)
    makeEventConfig(trackData, weatherData)

def checkResult():
    onlyfiles = [f for f in listdir(accServerPathResult) if isfile(join(accServerPathResult, f))]
    print(onlyfiles)

def launchServer():
    for fileName in configFiles:
        os.remove(accServerPathCfg + fileName)
        copyfile(templatePath + fileName, accServerPathCfg + fileName)
    subprocess.call('start "" "D:\Steam\steamapps\common\Assetto Corsa Competizione Dedicated Server\server/launch_server.sh"', shell=True)
    return True
startChampionnship()
