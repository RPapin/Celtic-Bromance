import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Accordion, {Item} from 'react-bootstrap/Accordion'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import parameter from '../../paramTest.json'
import './adminParameters.css'
import ReadData from '../../services/readData'
import bigInt from 'big-integer'


const AdminParameters = ({admin, setAdmin, closeAdminPanel}) => {
    const readData = new ReadData()
    const [inputList, setInputList] = useState([])
    const [toggleParam, setToggleParam] = useState(false)
    const [loading, setLoading] = useState(false)
    const defaultListParameters = [{file: 'Data/championnshipConfiguration.json', name: 'pointConfiguration', value: [15,11,8,6,4,3,2,1], label: 'Point distribution (Each point must be separed with a comma)', type: 'text'},
      {file: 'Data/championnshipConfiguration.json', name: 'serverAdmin', value: 76561198445003541, label: 'SteamId of the server Admin', type: 'text'},
      {file: 'Template/event.json', name: 'practiceDuration', value: 10, label: 'Set the practice duration', type: 'number'},
      {file: 'Template/event.json', name: 'raceDuration', value: 15, label: 'Set the race duration', type: 'number'}]

    const fetchData = async () => {
      let paramFromApi = await readData.getLocalApi("get_param_list")
      //For testing purpose
      let list = []
      Object.keys(paramFromApi).map((fileName) => {
        paramFromApi[fileName].map((param, i) => {
          list.push({
            "file": fileName,
            "name" : param.name,
            "value" : param.currentValue, 
            "label" : param.label,
            "type" : param.type})
        })
      })
      console.log('fetch param list')
      setInputList(list);
      setLoading(true)
    } 
    const toggleParameter = () => {
      setToggleParam(!toggleParam)
    }
    const handleInputChange = (e, index) => {
      const { type, value } = e.target;
      const list = [...inputList];
      list[index]["value"] = type !== 'number' ?  value : Number.parseInt(value);
      setInputList(list);
    }
    const handleSubmit = async (e) => {
      e.preventDefault()
      let paramFromApi = await readData.postLocalApi("update_parameter", inputList)

    }
    useEffect(() => {
      if(!loading)fetchData()
    });
    return (
      <>
        {admin && loading &&
        <>

          <div className="container" id="parameterHeader">
          <Accordion>
            <Accordion.Toggle as={Button} variant="link" eventKey="0" className="btn btn-outline-primary" onClick={toggleParameter}>
              {toggleParam ? "Hide" : "Show" } parameters
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0" className="collapse">
            <form onSubmit={handleSubmit} id="collapseOne" className="collapse show" aria-labelledby="parameterHeader" data-parent="#parameterHeader">
              {
                inputList.map((param, i) => {
                  return (
                  <div className="form-group" key={i}>
                    <label>{param.label}</label>
                    <input type={param.type} className="form-control" id={param.name} name={param.name} value={param.value} onChange={e => handleInputChange(e, i)}></input>
                  </div>)

                })
              }
              <Button variant="outline-primary" type="submit" className="bottomBtn" disabled={inputList === defaultListParameters}>Save new parameters</Button>
            </form>
            </Accordion.Collapse>

          </Accordion>

          </div>
          </>
        }
    </>
    );

}

export default AdminParameters

