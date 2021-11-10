import React from 'react'
import "./ModalAlert.scss"

const ModalAlert = ({ isOpen, setIsOpen, message }) => {
  return (
    <>
      {isOpen && (
        <div className="modal-custom">
          <div className="modal-content">
            <span className="close" onClick={() => setIsOpen(false)}>&times;</span>
            <p className="text-center fs-4">{message}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default ModalAlert;