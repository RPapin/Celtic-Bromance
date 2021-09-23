import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import parameter from '../../paramTest.json'
import './adminParameters.css'
import ReadData from '../../services/readData'


const AdminParameters = ({admin, setAdmin, closeAdminPanel}) => {
    const readData = new ReadData()
    const [inputList, setInputList] = useState([])
    const [toggleParam, setToggleParam] = useState(true)
    const [loading, setLoading] = useState(false)
    let paramList = []
    const fetchData = async () => {
      // let paramFromApi = await readData.callLocalApi("get_param_list")
      //For testing purpose
      let list = []
      Object.keys(parameter).map((fileName) => {
        parameter[fileName].map((param, i) => {
          list.push({
            "name" : param.name,
            "value" : param.currentValue, 
            "type" : param.type})
        })
      })
      setInputList(list);
      setLoading(true)
    } 
    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      list[index]["value"] = value;
      setInputList(list);
    }
    const handleSubmit = (e) => {
      e.preventDefault()
    }
    useEffect(() => {
      if(!loading)fetchData()
    });
    return (
      <>
      {admin && toggleParam &&
        <div className="container">
          List of parameters
          <form onSubmit={handleSubmit}>
            {
              inputList.map((param, i) => {
                return (
                <div class="form-group">
                  <label for={param.name}>{param.label}</label>
                  <input type={param.type} class="form-control" id={param.name} name={param.name} value={param.value} onChange={e => handleInputChange(e, i)}></input>
                </div>)

              })
            }
            <Button variant="outline-primary" type="submit" className="bottomBtn">Save new parameters</Button>
          </form>
        </div>
      }
      </>
    );

}

export default AdminParameters