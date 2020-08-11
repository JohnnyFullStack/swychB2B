import React from 'react';
import {  Row, Modal, Button } from 'react-bootstrap';
import {DUMMY_PHONE,DUMMY_EMAIL} from '../App.config'
import send from '../image/send.png'
import * as moment from 'moment';
import Loader from './Loader';

function ConfirmationModal(props: any) {

    //     const [props.trans,setTransaction] = useState(props.trans)

    //     useEffect(() => 
    //     console.log('trans' + JSON.stringify(props.trans))
    //     ,[]
    // )

    return (
        <Modal show={props.isConfirmationShow} size="lg"
            aria-divledby="contained-modal-title-vcenter"
            centered
            {...props}
        >
            <React.Fragment>
                {props.trans.transaction && props.trans.transaction[0] ?
                    <div style={{ margin: "10px",width:"20vw" }}>
                        <Row className="justify-content-md-center" style={{ textAlign: "center" }}>
                            <div >
                                <div>
                                    <img src={send} width="120" height="100" /> 
                                    <h4>Sent</h4>
                                    <br />
                                </div>

                                <div style={{ display: "inline" }}>
                                    <div style={{ fontWeight: "bold" }}>To:&nbsp;</div> <div style={{ fontWeight: "normal" }}>{props.trans.transaction[0].recipientName}</div>
                                    {props.trans.transaction[0].recipientEmail == DUMMY_EMAIL?
                                        <div><div style={{ fontWeight: "bold" }}>Phone:&nbsp;</div> <div style={{ fontWeight: "normal" }}>{props.trans.transaction[0].recipientPhoneNumber}</div></div> :
                                        <div><div style={{ fontWeight: "bold" }}>Email:&nbsp;</div> <div style={{ fontWeight: "normal" }}>{props.trans.transaction[0].recipientEmail}</div></div>
                                    }
                                    <div style={{ fontWeight: "bold" }}>Amount:</div> <div style={{ fontWeight: "normal" }}>C${props.trans.transaction[0].amount}</div><br />

                                    <div><img style={{ display: "inline" }} src={props.trans.transaction[0].brand.brandImage} width="150" height="95" alt="Gap" /></div><br />

                                    <div style={{ fontWeight: "bold" }}>Your order confirmation is: &nbsp; </div><div style={{ fontWeight: "normal" }}>{props.trans.transaction[0].transactionId}</div>
                                    <div style={{ fontWeight: "bold" }}>Transaction Time: &nbsp; </div><div style={{ fontWeight: "normal" }}>{moment.utc(props.trans.transaction[0].transactionDate).local().format('YYYY/MM/DD h:mm A')}</div>
                                    <div style={{ fontWeight: "bold" }}>Your account balance is: &nbsp; </div><div style={{ fontWeight: "normal" }}>C${props.trans.balance.toFixed(2)}</div> <br />
                                    <br />

                                    <Button style={{ backgroundColor: "#c01f6d", color: "white", border: "hidden",width:"100px" }} type="submit" onClick={props.handleClose} >OK</Button>
                                    <br /><br />
                                </div>
                            </div>
                        </Row>
                    </div> : <Loader />}
            </React.Fragment>
        </Modal>
    )
}

export default ConfirmationModal