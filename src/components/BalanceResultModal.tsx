import * as React from 'react'
import {  Modal, Button } from 'react-bootstrap';

function BalanceModalResult(props: any) {
    return (
        <Modal show={props.isbalanceModalShow}size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            {...props}
        >
            <Modal.Header>
                <label>Your account current balance is: C${props.balance && Number(props.balance).toFixed(2)}</label> 
            </Modal.Header>
            <Modal.Footer>
                <div style={{margin:"auto"}}>
                    <Button style={{backgroundColor:"#c01f6d",color:"white",border:"hidden"}} onClick={props.handleClose}>
                        Close
                    </Button>
                </div>

            </Modal.Footer>
        </Modal>
    )
}

export default BalanceModalResult