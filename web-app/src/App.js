
import './App.css';
import Dashboard from './component/dashboard/dashboard';
import Header from './component/header/header';
import React, { useState, useEffect } from 'react'
// import Test from './component/test/test';

function App() {
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    let adminLocal = localStorage.getItem('admin')
    if(adminLocal)setAdmin(true)
    }, [])
  return (
    <div className="App">
        <Header/>
        <Dashboard admin={admin}/>
    </div>
  );
}

export default App;
