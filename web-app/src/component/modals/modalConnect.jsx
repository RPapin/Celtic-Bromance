import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import ReadData from '../../services/readData'
import Modal from 'react-bootstrap/Modal';
import './modalCheck.css'
import Form from 'react-bootstrap/Form'


const ModalConnect = (props) => {
  
  const readData = new ReadData()
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectDriver, setSelectDriver] = useState([])

  const handleClose = () => setShow(false);
  const fetchDriver = async () => {
    let allInfo = await readData.callLocalApi("fetch_drivers")
    if(allInfo){
      setSelectDriver(allInfo)
      setLoading(false)
    } 
  }
    useEffect( () => {
      if(loading)fetchDriver()
  }, [loading])
  return (
    <>
    {!loading && 
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Who are you ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Select aria-label="Select your name">
          {selectDriver.map((element) => {
            console.log(element)
            return <option value={1}>One</option>
          })}
        </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    }
    </>
  );
}

export default ModalConnect