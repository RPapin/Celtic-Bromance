import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './adminPanel.css'


const AdminPanel = ({closeAdminPanel}) => {

    const [show, setShow] = useState(true);
    const [password, setPassword] = useState()

    const handleClose = () => setShow(false);
    
    const checkAdmin = (event) => {
        if(password == 'aaa'){
          localStorage.setItem('admin', true);
        }
        closeAdminPanel()
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

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button variant="primary" type="submit">
                GO 
                </Button>
            
           </Modal.Footer>
           </Form>
        </Modal>
        
    );

}

export default AdminPanel