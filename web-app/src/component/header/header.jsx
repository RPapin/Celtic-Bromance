import React, { useState, useEffect } from 'react'
import ReadData from '../../services/readData'
import Dropdown from 'react-bootstrap/Dropdown';
import './header.css'


const Header = (props) => {
    const readData = new ReadData()

    return (

    <div className={'header'}>
        <img src={'../CelticBromanceLogoFINAL.png'} className='topLogo'></img>
        <h1 className="title">Celtic Bromance Championnship</h1>
        <Dropdown>
            <Dropdown.Toggle variant="info" id="dropdown-basic">
                Menu
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">View older results</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Admin Table</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>
    )

}

export default Header