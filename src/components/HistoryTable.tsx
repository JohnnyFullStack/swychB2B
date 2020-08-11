import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import logo_swych from '../image/logo_swych.png';
import { ITransactionInfo, ITransactionInfos } from '../utilities/apiInterface'
import {DUMMY_PHONE,DUMMY_EMAIL} from '../App.config'
import { CSVLink } from "react-csv";
import { history } from '../history';
import * as moment from 'moment';

function HistoryTable(props) {
    useEffect(() => {
        if (!reportDate || !report) {
            history.push('/home')
        }
    }, [])

    const [report, setReport] = useState(props.history.location.state as ITransactionInfo[])


    let reportDate = report && report.map((r: ITransactionInfo) => {
        return ({
            Transaction_id: r.transactionId,
            Transaction_Date: r.transactionDate,
            Recipient: r.recipientName,
            Gift_Card_Name: r.brand.brandName,
            Amount: r.amount
        })
    })

    return (
        <React.Fragment>
            <div style={{ margin: "60px" }}>
                <div>
                    <div><span style={{ float: "left" }}><img height="35" width="150" src={logo_swych} alt="logo" /></span></div>
                    <div><a style={{ float: "right", marginBottom: "80px" }} href="./#/home">go back</a></div>
                </div>
                <div>
                    <Table striped bordered hover style={{ border: "solid", borderColor: "gray", }}>
                        <thead>
                            <tr>
                                <th>Transaction_id</th>
                                <th>Transaction_Date</th>
                                <th>Recipient</th>
                                <th>Recipient Info</th>
                                <th>Gift_Card_Name</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {report && report.map((r: ITransactionInfo) => {
                                return (
                                    <tr>
                                        <td>{r.transactionId}</td>
                                        <td>{moment.utc(r.transactionDate).local().format('YYYY/MM/DD h:mm A')}</td>
                                        <td>{r.recipientName}</td>
                                        {r.recipientEmail == DUMMY_EMAIL ? <td>{r.recipientPhoneNumber}</td> : <td>{r.recipientEmail}</td>}
                                        <td>{r.brand.brandName}</td>
                                        <td>C${Number(r.amount).toFixed(2)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>

                <div style={{ float: "left" }}>
                    {reportDate &&
                        <CSVLink
                            data={reportDate}
                        >
                            <Button style={{backgroundColor:"#c01f6d",color:"white",border:"hidden"}}>Save</Button>
                        </CSVLink>}
                </div>

            </div>
        </React.Fragment>
    )
}

export default HistoryTable
