import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import './joker.css'

import ModalChooseDriver from '../modals/modalChooseDriver';


const Joker = () => {

    const [openModal, setOpenModal] = useState(false)
    const [actionContext, setActionContext] = useState()

    const openDriverChoose = (context) => {
      setOpenModal(true)
      // setActionContext(context)
    }
    useEffect( () => {
      console.log('useEffect')
  }, [])
    return (
      <>
          <Button className="m-2 btnJoker" variant="secondary" onClick={() => openDriverChoose("swapCar")}>
            Swap car 
          </Button>
          <Button className="m-2 btnJoker" variant="secondary" onClick={() => openDriverChoose("swapPoint")}>
            Swap Point for the next race 
          </Button>
          {openModal &&
           <ModalChooseDriver/>
          }
      </>
    );

}

export default Joker