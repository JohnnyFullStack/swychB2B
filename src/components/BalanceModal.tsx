import * as React from 'react'
import { Container, Row, Col, Navbar, Nav, Form, NavDropdown, Modal, FormGroup, Button } from 'react-bootstrap';

function BalanceModal (props:any) {

    return (
        <Modal show={props.isbalanceModalShow} onHide={props.handleClose} size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            {...props}
        >
            <Modal.Header closeButton>
                <Modal.Title>Please enter your password here</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control type="password" placeholder="Password" />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
            </Button>
                <Button style={{backgroundColor:"#c01f6d",color:"white",border:"hidden"}} onClick={props.handleSubmitBalance}>
                    Submit
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default BalanceModal