import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './adminParameters.css'
import ReadData from '../../services/readData'


const AdminParameters = ({admin, setAdmin, closeAdminPanel}) => {
    const readData = new ReadData()
    const [toggleParam, setToggleParam] = useState(true)
    let paramList = []
    console.log(admin)
    const fetchData = async () => {
      let paramFromApi = await readData.callLocalApi("get_param_list")
      console.log(paramFromApi)
    } 
    useEffect(() => {
      fetchData()
    });
    return (
      <>
      {admin && toggleParam &&
        <div className="container">
          List of parameters
        </div>
      }
      </>
    );

}

export default AdminParameters