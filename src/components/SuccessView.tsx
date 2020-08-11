import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './Home.css';
import logo_swych from '../image/logo_swych.png';
import logo from '../image/logo.svg';
import send from '../image/send.png'
import { history } from '../history';
import Loader from './Loader'
import swychApiService from '../services/swych-api-service';
import {ITransactionInfo,ITransactionDetail} from '../utilities/apiInterface'
import {phoneHelper} from '../utilities/helper'
import * as moment from 'moment';

function SucessView() {

    const handleButtonClick = () => {

        history.push('/home')
    }

    let trans:ITransactionDetail = {} as ITransactionDetail

    const init = ()=>{
        const orderId = localStorage.getItem('orderId')
        if(!orderId){
            history.push('/home')
        }

        else{
            
        let payLoad= {
            accountId: localStorage.getItem('accountId'),
            orderId: orderId,
            AccessCode: localStorage.getItem('accessCode'),
        }
        swychApiService.getOrderInfos(payLoad)
        .then((res:ITransactionDetail)=>{
            if(res.success){
                trans= res
                setTransaction(res)
            }
            else{
                history.push('/home')
            }
        })
        .catch(err=>{
            throw(err)
        })

        return function toHomePage(){
            localStorage.removeItem('orderId')
            history.push('/home')
        }
        }
    }


    useEffect(() => 
        init()
        ,[]
    )

    const [tranx,setTransaction] = useState(trans)
    const[orderIds,setOrderIds] = useState(localStorage.getItem('orderId'))



    return (
        <React.Fragment>
            {tranx && tranx.transaction && tranx.transaction[0] ?
            <div style={{ margin: "30px" }}>
                <img style={{ display: "inline", float: "left", top: "0" }} src={logo_swych} height="35" width="150" /><br /><br />
                <div className="row" style={{ marginTop: "60px" }}>
                    <div className="col-md-1"></div>
                    <div className="col-md-3" style={{ borderColor: "#black", borderStyle: "solid", background: "white", borderWidth: "1px" }}>
                        <div >
                            <div>
                                <img src={send} width="130" height="100" /> <br />
                            </div>

                            <div style={{ display: "inline", width: "200px", textAlign: "left" }}>
                                <label style={{ fontWeight: "bold", textAlign: "left" }}>To:&nbsp;</label> <label style={{ fontWeight: "normal" }}>{tranx.transaction[0].recipientName}</label><br />
                                {tranx.transaction[0].recipientEmail == "donotreply@goswych.ca"?
                                <div style={{textAlign:"center"}}><label style={{ fontWeight: "bold" }}>Phone:&nbsp;</label> <label style={{ fontWeight: "normal" }}>{tranx.transaction[0].recipientPhoneNumber}</label><br /></div>:
                                <div style={{textAlign:"center"}}><label style={{ fontWeight: "bold" }}>Email:&nbsp;</label> <label style={{ fontWeight: "normal" }}>{tranx.transaction[0].recipientEmail}</label><br /></div>
                                }
                                <label style={{ fontWeight: "bold" }}>Amount:&nbsp;</label> <label style={{ fontWeight: "normal" }}>C${tranx.transaction[0].amount}</label><br />

                                <img style={{ display: "inline" }} src={tranx.transaction[0].brand.brandImage} width="150" height="95" alt="Gap" /> <br />

                                <br /><br /><br />
                                <label style={{ fontWeight: "bold" }}>Your order confirmation is: &nbsp; </label><label style={{ fontWeight: "normal" }}>{tranx.transaction[0].transactionId}</label> <br />
                                <label style={{ fontWeight: "bold" }}>Transaction Time: &nbsp; </label><label style={{ fontWeight: "normal" }}>{moment.utc(tranx.transaction[0].transactionDate).local().format('YYYY/MM/DD h:mm A')}</label> <br />
                                <label style={{ fontWeight: "bold" }}>Your account balance is: &nbsp; </label><label style={{ fontWeight: "normal" }}>C${tranx.balance.toFixed(2)}</label> <br />
                                <br /><br />

                                <Button style={{ marginRight: "10px",backgroundColor: "#c01f6d", color: "white", border: "hidden"} }type="submit" onClick={handleButtonClick} >
                                SEND ANOTHER GIFT CARD
                                </Button>
                                <br /><br />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row" style={{ backgroundColor: "#E0E0E0" }}>
                    <div>
                        <div className="footer">
                            <span style={{ position: "fixed", left: "20px" }}><img src={logo} height={25} /></span>
                            <span>Copyright © 2017 Swych. Prizes powered by Swych Inc.</span>
                        </div>
                    </div>
                </div >

            </div>:<Loader />}
        </React.Fragment>
    )
}


export default SucessView

