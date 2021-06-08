import json
import random
from os import listdir
from os.path import isfile, join
import subprocess
import os
from shutil import copyfile
import re
from datetime import date

today = date.today()
accServerPath = "D:/Steam/steamapps/common/Assetto Corsa Competizione Dedicated Server/server/"
accServerPathCfg = accServerPath + "cfg/"
accServerPathResult = accServerPath + "results/"
dataPath = "Data/"
templatePath = "Template/"
savesPath = "saves/"
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

def makeNewRace(carsData, raceNumber) : 
    """ Create random entrylist + random track and cars """
    with open(dataPath + 'defaultEntryList.json') as json_file:
        data = json.load(json_file)
        json_file.close()
    
    # choose car class
    carClass = random.choice(list(carsData.keys()))
    carClass = carsData[carClass]["class"]
    carClassList  = dict(filter(lambda elem: elem[1]["class"] == carClass,carsData.items()))
    #First race
    if raceNumber == 1:
        random.shuffle(data)
    #next race
    else :
        with open(dataPath + 'result.json') as json_file:
            resultData = json.load(json_file)
            json_file.close()
        currentNbDriver = len(resultData['championnshipStanding'])
        j = 1
        for driverData in data:
            driver_position = next((index for (index, d) in enumerate(resultData['championnshipStanding']) if d["playerId"] == 'S' + driverData['Steam id ']), -1) 
            if driver_position == -1 :
                driverData['position'] = currentNbDriver + j 
                j+= 1
            else :
                driverData['position'] = currentNbDriver - driver_position 
                driverData['ballast'] = int(resultData['championnshipStanding'][driver_position]['point'])
        data = sorted(data, key=lambda k: k['position']) 

    finalEntryList = {
        "entries" : [],
        "forceEntryList": 1
    }
    finalUserInfo = []
    startingPlace = 1
    for userData in data :
        userCar = random.choice(list(carClassList.keys()))
        userData['restrictor'] = 0
        if "ballast" not in userData:
            userData['ballast'] = 0
        elif userData['ballast'] > 100 :
            userData['restrictor'] = int((userData['ballast'] - 100) / 5)
            if userData['restrictor'] > 20 :
                userData['restrictor'] = 20
            userData['ballast'] = 100
        userEntry = {
            "drivers" : [{
                "firstName": userData["First name"],
                "lastName": userData["Surname"],
                "playerID": "S" + userData["Steam id "],
            }],
            "forcedCarModel": int(userCar),
            "overrideDriverInfo": 1,
            "ballastKg" : userData['ballast'],
            "restrictor" : userData['restrictor'] 
        }
        userInfo = {
            "firstName": userData["First name"],
            "lastName": userData["Surname"],
            "starting_place": startingPlace,
            "car" : carClassList[userCar]["model"],
            "ballast" : userData['ballast'],
            "restrictor" : userData['restrictor'] 
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

def startChampionnship():
    carsData, trackData, weatherData = init()
    usersInfo = makeNewRace(carsData, 1)
    eventConfig = makeEventConfig(trackData, weatherData)
    firstRoundInfo = {
        "eventInfo": eventConfig,
        "usersInfo": usersInfo,
        "foundNewResults" : "A new Championnship has begun !"
    }
        # Save next round config
    with open(savesPath + 'nextRound.json', 'w') as outfile:
        json.dump(firstRoundInfo, outfile)
        outfile.close()
    return firstRoundInfo

def nextRound():
    carsData, trackData, weatherData = init()
    usersInfo = makeNewRace(carsData, 2)
    eventConfig = makeEventConfig(trackData, weatherData)
    nextRoundInfo = {
        "eventInfo": eventConfig,
        "usersInfo": usersInfo
    }
        # Save next round config
    with open(savesPath + 'nextRound.json', 'w') as outfile:
        json.dump(nextRoundInfo, outfile)
        outfile.close()
    return nextRoundInfo

def checkResult():
    onlyfiles = [f for f in listdir(accServerPathResult) if isfile(join(accServerPathResult, f))]
    raceFile = ""
    for fileName in onlyfiles:
        splitList = fileName.split("_")
        if splitList[2] == "R.json":
            raceFile = fileName
    with open(dataPath + 'result.json') as json_file:
        olderResult = json.load(json_file)
        json_file.close()
    if len(raceFile) > 0 :
        with open(accServerPathResult + raceFile, 'r', encoding="utf-16") as json_file: #accServerPathResult + raceFile
            correctFile = json_file.read()
            resultFile = json.loads(correctFile)
            json_file.close()
        with open(dataPath + 'championnshipConfiguration.json') as json_file:
            championnshipData = json.load(json_file)
            json_file.close()

        raceNumber = len(olderResult['raceResult']) + 1 
        currentResult = []
        driverStandings = {}
        pos = 1
        index = 0    
        #List driver and pos before current race
        for driver in olderResult['championnshipStanding']:
            driverId = driver["playerId"]
            driverStandings[driverId] = index
            index += 1

        for driverResult in resultFile["sessionResult"]["leaderBoardLines"]:
            #Set race point
            if pos < len(championnshipData["pointConfiguration"]):
                racePoint = championnshipData["pointConfiguration"][pos - 1]
            else :
                racePoint = 0
            #race result
            driverResult["currentDriver"]["position"] = pos
            driverResult["currentDriver"]["point"] = racePoint
            currentResult.append(driverResult["currentDriver"])
            #championnship Standing
            driverId = driverResult["currentDriver"]["playerId"]
            if driverId in driverStandings:
                olderResult['championnshipStanding'][driverStandings[driverId]]['point'] += racePoint
            else :
                driverResult["currentDriver"]["point"] = racePoint
                olderResult['championnshipStanding'].append(driverResult["currentDriver"])
            pos +=1

        olderResult["raceResult"].append({
            raceNumber : currentResult
        })
        #Sort standings
        olderResult['championnshipStanding'] = sorted(olderResult['championnshipStanding'], key=lambda k: k['point'], reverse=True) 
        with open(dataPath + 'result.json', 'w') as outfile:
            json.dump(olderResult, outfile)
            outfile.close()
        os.renames(accServerPathResult + raceFile, savesPath + raceFile)
        #Prepare next race
        nextRoundInfo = nextRound()
        raceNumber = str(raceNumber + 1)
        return {
            "standings" : olderResult,
            "nextRoundInfo" : nextRoundInfo,
            "foundNewResults" : "New results has been found. Race " + raceNumber + " informations are available"
        }
    elif isfile(savesPath + 'nextRound.json'):
        with open(savesPath + 'nextRound.json') as json_file:
            nextRoundInfo = json.load(json_file)
            json_file.close()
        if olderResult['championnshipStanding'] == []:
            olderResult = None
        return {
            "standings" : olderResult,
            "nextRoundInfo" : nextRoundInfo,
            "foundNewResults" : False
        }
    #No current championnship
    else :
        return {
            "standings" : None,
            "nextRoundInfo" : None,
            "foundNewResults" : False
        }
def resetChampionnship():
    with open(dataPath + 'result.json') as json_file:
        olderResult = json.load(json_file)
        json_file.close()

    #TODO remove saves file
    os.remove(savesPath + "nextRound.json")
    saveName = 'finalSave_' + today.strftime("%d_%m_%Y") + '.json'
    with open(savesPath + saveName, 'w') as outfile:
        json.dump(olderResult, outfile)
        outfile.close()
    olderResult["championnshipStanding"] = olderResult["raceResult"] = []
    with open(dataPath + 'result.json', 'w') as outfile:
        json.dump(olderResult, outfile)
        outfile.close()
    return True

def launchServer():
    for fileName in configFiles:
        os.remove(accServerPathCfg + fileName)
        copyfile(templatePath + fileName, accServerPathCfg + fileName)
    subprocess.call('start "" "D:\Steam\steamapps\common\Assetto Corsa Competizione Dedicated Server\server/launch_server.sh"', shell=True)
    return True