import React, { useState, useEffect } from 'react'
import ReadData from '../../services/readData'
import Dropdown from 'react-bootstrap/Dropdown';
import './header.css'
import AdminPanel from '../adminPanel/adminPanel';


const Header = ({admin, setAdmin}) => {
    const readData = new ReadData()
    const [adminPanel, setAdminPanel] = useState(false)
    const showAdminPanel = () => {
        setAdminPanel(true)
    }
    const closeAdminPanel = () => {
        setAdminPanel(false)
    }
    const setAdminChild = (value) => {
        localStorage.setItem('admin', value);
        console.log("setAdminChild " + value)
        setAdmin(value)
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
                {!admin && <Dropdown.Item onClick={showAdminPanel}>Admin Table</Dropdown.Item>}
                {admin && <Dropdown.Item onClick={() => setAdminChild(false)}>Log out</Dropdown.Item>}
            </Dropdown.Menu>
        </Dropdown>
        {adminPanel &&
            <AdminPanel admin={admin} setAdmin={setAdminChild} closeAdminPanel={closeAdminPanel}/>
        }
    </div>
    )

}

export default Header