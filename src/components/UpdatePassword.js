import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

const UpdatePassword = ({show, handleClose, handleSubmit}) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
  return (
    <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Form onSubmit={(event)=>handleSubmit(event, newPassword, confirmPassword)}>
                <Modal.Body>

                    <Form.Group className="mb-3" controlId="product-name">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        autoFocus
                    />
                    </Form.Group>
                    
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                    </Form.Group>
            
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" >
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Form>
        </Modal>
    </>
  )
}

export default UpdatePassword