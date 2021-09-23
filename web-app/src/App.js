
import './App.css';
import Dashboard from './component/dashboard/dashboard';
import Header from './component/header/header';
import ModalConnect from './component/modals/modalConnect';
import React, { useState, useEffect } from 'react'
import ReadData from './services/readData'
import OlderResult from './component/olderResult/olderResult';
// import Test from './component/test/test';

function App() {
  const [admin, setAdmin] = useState(false)
  const [userId, setUserId] = useState(false)
  
  const [isOlderResult, setIsOlderResult] = useState(false)

  useEffect(() => {
    let adminLocal = localStorage.getItem('admin')
    let userId = localStorage.getItem('userId')
    if(userId !== "false")setAdmin(userId)
    if(adminLocal !== "false")setAdmin(adminLocal)
    
    }, [admin])
  return (
    <div className="App">
        <Header admin={admin} setAdmin={setAdmin} olderResult={isOlderResult} setIsOlderResult={setIsOlderResult}/>
        {isOlderResult ?  
          <OlderResult/> : 
          <Dashboard admin={admin} setAdmin={setAdmin}/>
        }
        
    </div>
  );
}

export default App;
