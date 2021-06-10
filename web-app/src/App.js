
import './App.css';
import Dashboard from './component/dashboard/dashboard';
import Header from './component/header/header';
import React, { useState, useEffect } from 'react'
// import Test from './component/test/test';

function App() {
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    let adminLocal = localStorage.getItem('admin')
    if(adminLocal !== "false")setAdmin(adminLocal)

    }, [admin])
  return (
    <div className="App">
        <Header admin={admin} setAdmin={setAdmin}/>
        <Dashboard admin={admin} setAdmin={setAdmin}/>
    </div>
  );
}

export default App;
