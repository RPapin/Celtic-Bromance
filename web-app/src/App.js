
import './App.css';
import React from 'react'
import Dashboard from './component/dashboard/dashboard';
import Header from './component/header/header';
// import Test from './component/test/test';

function App() {
  return (
    <div className="App">
        <Header/>
        <Dashboard/>
    </div>
  );
}

export default App;
