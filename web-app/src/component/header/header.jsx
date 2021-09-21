import React, { useState, useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import './header.css'
import AdminPanel from '../adminPanel/adminPanel';
import OlderResult from '../olderResult/olderResult';


const Header = ({admin, setAdmin, olderResult, setIsOlderResult}) => {
    const [adminPanel, setAdminPanel] = useState(false)
    const showAdminPanel = () => {
        setAdminPanel(true)
    }
    const closeAdminPanel = () => {
        setAdminPanel(false)
    }
    const setAdminChild = (value) => {
        localStorage.setItem('admin', value);
        setAdmin(value)
    }
    return (

    <div className={'header'}>
        <img src={'../CelticBromanceLogoFINAL.png'} className='topLogo' alt="celtic-bromance.png" ></img>
        <h1 className="title">Celtic Bromance Championship</h1>
        <Dropdown>
            <Dropdown.Toggle variant="info" id="dropdown-basic">
                Menu
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {olderResult ? <Dropdown.Item onClick={() => setIsOlderResult(!olderResult)}>View current championship</Dropdown.Item> : <Dropdown.Item onClick={() => setIsOlderResult(!olderResult)}>View older results</Dropdown.Item>}
                {!admin && <Dropdown.Item onClick={showAdminPanel}>Admin Table</Dropdown.Item>}
                {admin && 
                <>
                    <Dropdown.Item onClick={() => setAdminChild(false)}>Log out</Dropdown.Item>
                </>}
            </Dropdown.Menu>
        </Dropdown>
        {adminPanel &&
            <AdminPanel admin={admin} setAdmin={setAdminChild} closeAdminPanel={closeAdminPanel}/>
        }
    </div>
    )

}

export default Header