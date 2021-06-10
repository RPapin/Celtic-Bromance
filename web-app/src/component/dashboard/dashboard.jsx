import React, { useState, useEffect } from 'react'
import ReadData from '../../services/readData'
import Button from 'react-bootstrap/Button';
import './dashboard.css'
import ChampionnshipResult from '../championnshipResult/championnshipResult';
import ModalCheck from '../modals/modalCheck';


const Dashboard = ({admin, setAdmin}) => {
    const readData = new ReadData()
   
    const [infoNextRound, setInfoNextRound] = useState()
    const [gridNextRound, setGridNextRound] = useState()
    const [newResult, setNewResult] = useState(false)
    const [fullResult, setFullResult] = useState(false)
    const [loading, setLoading] = useState(false)

    const getNextRoundInfo = (nextRoundInfo) => {
        const eventInfo = JSON.parse(JSON.stringify(nextRoundInfo.eventInfo))
        const gridInfo = JSON.parse(JSON.stringify(nextRoundInfo.usersInfo))
        let eventInfoArray = [] 
        Object.keys(eventInfo).forEach(key => eventInfoArray.push([key, eventInfo[key]]))
        setGridNextRound(gridInfo)
        setInfoNextRound(eventInfoArray)
        setNewResult(nextRoundInfo.foundNewResults)
    }
    const startChampionnship = async () => {
        let firstRoundInfo = await readData.startChampionnship()
        getNextRoundInfo(firstRoundInfo)
    }
    const lunchServer = async () => {
        let serverStatus = await readData.launchServer()
    }
    const seeResult = async () => {
        let allInfo = await readData.seeResult()
        if(allInfo['nextRoundInfo']){
            allInfo['nextRoundInfo']['foundNewResults'] = allInfo['foundNewResults']
            getNextRoundInfo(allInfo['nextRoundInfo'])
        }
        setFullResult(allInfo['standings'])
        setLoading(true)
    }
    const resetChampionnship = async () => {
        let resetStatus = await readData.resetChampionnship()
        setGridNextRound(null)
        setInfoNextRound(null)
        setFullResult(null)
        setNewResult('Championship has been reset')
    }
    useEffect( () => {
        console.log('dash ' + admin)
        if(!loading)seeResult()
    }, [])
    return (

    <div className={'fullContainer'}>
            {newResult &&
                <ModalCheck text={newResult}/>
            }
        <div className={'container'}>
            {!fullResult && loading && admin &&
            <div className='actionsContainer'>
                <Button variant="outline-primary" onClick={startChampionnship}>Start a new championnship !</Button>
            </div>
            }              
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
                            return (<li key={i}>{i + 1}) {label["lastName"]} {label["firstName"]} : {label["car"]} , ballast : {label["ballast"]}, restrictor : {label["restrictor"]}</li>)
                        })}
                    </ul>
                {admin && 
                    <div className="adminDiv">
                    <Button variant="outline-primary" onClick={lunchServer} className="bottomBtn">Launch the server </Button>
                    <Button variant="outline-primary" onClick={seeResult} className="bottomBtn">Check Result</Button>
                    <Button variant="outline-danger" onClick={() => {
                        if(window.confirm("You are going to delete the current championnship"))resetChampionnship()
                    }}>Reset Championnship</Button>
                    </div>
                }
                </div>
            }   
        </div>
        <ChampionnshipResult fullResult={fullResult}/>
    </div>
    )

}

export default Dashboard