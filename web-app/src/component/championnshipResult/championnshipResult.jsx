import React, { useState, useEffect } from 'react'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import './championnshipResult.css'


const ChampionnshipResult = (props) => {
    const [currentTab, setCurrentTab] = useState('Standings');
    const displayStandings = (raceNumber) => {
        //Display position per race
        const renderRaceResult = (playerId) => {
            let inter =  props.fullResult['raceResult'].map((answer, i) => {      
                let j = 1
                return answer[i + 1].map((element) => { 
                    if(element['playerId'] === playerId){
                        return <td key={playerId + i}>{element['position']}</td>
                    }//The driver DNS the race 
                    else if(j === answer[i + 1].length){
                        return <td key={playerId + i}>DNS</td>
                    } else j ++
                
                })
            })
            return inter
        }
        if(raceNumber === -1){
            //Display standings
            return (
            <Table responsive>
                <thead>
                    <tr>
                    <th>Position</th>
                    <th>Name</th>
                    {props.fullResult['raceResult'].map((answer, i) => {       
                        return (<th>Race {i + 1}</th>) 
                    })}
                    <th>Total Point</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {props.fullResult['championnshipStanding'].map((driverInfo, i) => {     
                        return (<tr key={i}><td>{i + 1}</td><td>{driverInfo['firstName'] + ' ' + driverInfo['lastName']}</td>{renderRaceResult(driverInfo['playerId'])}<td>{driverInfo['point']}</td></tr>) 
                    })}
                    
                </tbody>
            </Table>)
        } else {
            //display race result
            return (
                <Table responsive>
                    <thead>
                        <tr>
                        <th>Position</th>
                        <th>Name</th>
                        <th>Point</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.fullResult['raceResult'][raceNumber][raceNumber + 1].map((driverInfo, i) => {     
                            return (<tr key={i}><td>{i + 1}</td><td>{driverInfo['firstName'] + ' ' + driverInfo['lastName']}</td><td>{driverInfo['point']}</td></tr>) 
                        })}
                        
                    </tbody>
                </Table>)
        }
    }
    useEffect( () => {
       
    })
    return (
    <div className={'container'}>
        {props.fullResult && 
        <>
            <h2>Standings</h2>
            <Tabs
                id="controlled-tab-example"
                activeKey={currentTab}
                onSelect={(k) => setCurrentTab(k)}
                className="mb-3">
                <Tab eventKey={"Standings"} title={"Standings"}>
                    {displayStandings(-1)}
                </Tab>
                { props.fullResult['raceResult'].map((answer, i) => {       
                    return (<Tab eventKey={i} title={"Race "  + (i + 1)}>{displayStandings(i)}</Tab>) 
                })}
            </Tabs>
        </>
        }
        
    </div>
    )

}

export default ChampionnshipResult