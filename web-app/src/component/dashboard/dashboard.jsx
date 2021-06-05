import React, { useState, useEffect } from 'react'
import ReadData from '../../services/readData'
import Button from 'react-bootstrap/Button';
import './dashboard.css'


const Dashboard = (props) => {
    const readData = new ReadData()
   
    const [infoNextRound, setInfoNextRound] = useState()
    const [gridNextRound, setGridNextRound] = useState()
    const [newsData, setNewsData] = useState()
    const [loading, setLoading] = useState(true)

    const startChampionnship = async () => {
        let firstRoundInfo = await readData.startChampionnship()
        const eventInfo = JSON.parse(JSON.stringify(firstRoundInfo.eventInfo))
        const gridInfo = JSON.parse(JSON.stringify(firstRoundInfo.usersInfo))
        let eventInfoArray = [] 
        Object.keys(eventInfo).forEach(key => eventInfoArray.push([key, eventInfo[key]]))
        console.log(gridInfo)
        setGridNextRound(gridInfo)
        setInfoNextRound(eventInfoArray)
        
    }
    useEffect( () => {

    }, [infoNextRound])
    return (

    <div className={'container'}>
        
        <div className="header">
            <div className="generalInfo">
                Celtic Bromance Championnship
            </div>
        </div>
        
        <div className='actionsContainer'>
            <Button variant="outline-primary" onClick={startChampionnship}>Start a new Championnship !</Button>

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
            </div>
        }   
    </div>
    )

}

export default Dashboard