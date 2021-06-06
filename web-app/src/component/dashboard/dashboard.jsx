import React, { useState, useEffect } from 'react'
import ReadData from '../../services/readData'
import Button from 'react-bootstrap/Button';
import './dashboard.css'
import ChampionnshipResult from '../championnshipResult/championnshipResult';


const Dashboard = (props) => {
    const readData = new ReadData()
   
    const [infoNextRound, setInfoNextRound] = useState()
    const [gridNextRound, setGridNextRound] = useState()
    const [fullResult, setFullResult] = useState(false)

    const startChampionnship = async () => {
        let firstRoundInfo = await readData.startChampionnship()
        const eventInfo = JSON.parse(JSON.stringify(firstRoundInfo.eventInfo))
        const gridInfo = JSON.parse(JSON.stringify(firstRoundInfo.usersInfo))
        let eventInfoArray = [] 
        Object.keys(eventInfo).forEach(key => eventInfoArray.push([key, eventInfo[key]]))
        setGridNextRound(gridInfo)
        setInfoNextRound(eventInfoArray)
    }
    const lunchServer = async () => {
        let serverStatus = await readData.launchServer()
        console.log("server :" + serverStatus)
    }

    useEffect( () => {
        const seeResult = async () => {
            let firstRoundInfo = await readData.seeResult()
            setFullResult(firstRoundInfo)
        }
        if(!fullResult)seeResult()
    }, [infoNextRound])
    return (

    <div className={'container'}>
        
        <div className='actionsContainer'>
            <Button variant="outline-primary" onClick={startChampionnship}>Start a new championnship !</Button>
        </div>
        {infoNextRound && 
            <div className="infoNextRound">
                Info Next Round :
                    <ul>
                        {infoNextRound.map((label, i) => {
                            return (<li key={i}>{label[0]} : {label[1]}</li>)
                        })}
                    </ul>
                Starting grid : 
                <ul>
                    {gridNextRound.map((label, i) => {
                        return (<li key={i}>{i + 1}) {label["lastName"]} {label["firstName"]} : {label["car"]}</li>)
                    })}
                </ul>
                <Button variant="outline-primary" onClick={lunchServer}>Launch the server </Button>
            </div>
        }   
        <ChampionnshipResult fullResult={fullResult}/>
    </div>
    )

}

export default Dashboard