import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './adminPanel.css'


const AdminPanel = ({admin, setAdmin, closeAdminPanel}) => {

    const [show, setShow] = useState(true);
    const [password, setPassword] = useState()
    const [errorMsg, setErrorMsg] = useState()
    
    const handleClose = () => setShow(false);
    
    const checkAdmin = (event) => {
      event.preventDefault();
        if(password === 'aaa'){
          localStorage.setItem('admin', true);
          setAdmin(true)
          closeAdminPanel()
        } else setErrorMsg("Wrong admin password")
    }   

    return (
      
        <Modal show={show} onHide={handleClose}>
          <Form onSubmit={checkAdmin}>
          <Modal.Header closeButton>
            <Modal.Title>AdminPanel</Modal.Title>
          </Modal.Header>
          
            <Modal.Body>
            
                <Form.Label>Enter the admin password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <div className='errorMsg'>{errorMsg}</div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button variant="primary" type="submit">
                Go 
                </Button>
            
           </Modal.Footer>
           </Form>
        </Modal>
        
    );

}

export default AdminPanel