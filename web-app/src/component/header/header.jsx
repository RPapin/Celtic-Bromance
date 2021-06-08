import React, { useState, useEffect } from 'react'
import ReadData from '../../services/readData'
import Dropdown from 'react-bootstrap/Dropdown';
import './header.css'
import AdminPanel from '../adminPanel/adminPanel';


const Header = (props) => {
    const readData = new ReadData()
    const [adminPanel, setAdminPanel] = useState(false)
    const showAdminPanel = () => {
        setAdminPanel(true)
    }
    const closeAdminPanel = () => {
        console.log( console.log('useEffect admin ' + adminPanel))
        setAdminPanel(false)
    }
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
                <Dropdown.Item onClick={showAdminPanel}>Admin Table</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        {adminPanel &&
            <AdminPanel closeAdminPanel={closeAdminPanel}/>
        }
    </div>
    )

}

export default Header