import React, { useState, useEffect } from 'react'
import ReadData from '../../services/readData'
import Button from 'react-bootstrap/Button';
import './championnshipResult.css'


const ChampionnshipResult = (props) => {
    const readData = new ReadData()

    useEffect( () => {
        console.log(props.fullResult)
    } )
    return (

    <div className={'container'}>
        {props.fullResult && 
        <span>ChampionnshipResult</span>}
        
    </div>
    )

}

export default ChampionnshipResult