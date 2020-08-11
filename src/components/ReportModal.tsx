import React, { useState } from 'react';
import {  Row, Col, Form, Modal, FormGroup, Button, FormLabel } from 'react-bootstrap';
import { reportDays, reportWeeks } from '../utilities/date'
import swychApiService from '../services/swych-api-service';
import { ITransactionInfos, IGrantTokenResult } from '../utilities/apiInterface'
import LoaderModal from './LoaderModal'
import * as moment from 'moment';
import { history } from '../history';

function ReportModal(props: any) {

    const [days, setSelectedDay] = useState(reportDays)
    const [weeks, setSelectedMonth] = useState(reportWeeks)
    const [selection, setSelection] = useState("Day")
    const [startDate, setSelectedStartDate] = useState(moment.default().format("YYYYMMDD"))
    const [endDate, setSelectedEndDate] = useState(moment.default().format("YYYYMMDD"))
    const [selected, setSelected] = useState(days)
    const [errorMsg, setErrorMsg] = useState("")
    const [isLoaderShow, setLoadShow] = useState(false)


    const handleSelectionChange = (e) => {
        console.log('change day ' + e.target.value)
        setSelection(e.target.value)
        if (e.target.value == "Day") {
            setSelected(days)
            setSelectedStartDate(moment.default().format("YYYYMMDD"))
            setSelectedEndDate(moment.default().format("YYYYMMDD"))
        } else if (e.target.value == "Week") {
            setSelected(weeks)
            setSelectedStartDate(moment.default().subtract(1, "weeks").format("YYYYMMDD"))
            setSelectedEndDate(moment.default().format("YYYYMMDD"))
        } else if (e.target.value == "Custom") {
            setSelected([])
            setSelectedStartDate("")
            setSelectedEndDate("")
        }
    }

    const handleStartDateUpdate = (event: any) => {
        setSelectedStartDate(event.target.value)
        console.log('start' + JSON.stringify(startDate))
    }

    const handleEndDateUpdate = (event: any) => {
        setSelectedEndDate(event.target.value)
        console.log('end' + JSON.stringify(startDate))
    }

    const handleDateUpdate = (event: any) => {

    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setLoadShow(true)
        let payload = `/api/v1/b2b/${localStorage.getItem('accountId')}/history?startDate=${startDate}&endDate=${endDate}`
        swychApiService.getHistory(payload)
            .then((res: ITransactionInfos) => {
                setLoadShow(false)
                if (res.success) {
                    history.push({
                        pathname: '/history',
                        state: res.transactions
                        // report: res.transactions,
                    });
                }
                else {
                    setErrorMsg(res.message)
                }
            })
            .catch(err => {
                if (err.message == "Request failed with status code 401") {
                    swychApiService.login(localStorage.getItem('loginInfo'))
                        .then((res: IGrantTokenResult) => {
                            if (res.success) {
                                localStorage.setItem('access_token', res.access_token)
                                swychApiService.getHistory(payload)
                                    .then((res: ITransactionInfos) => {
                                        if (res.success) {
                                            history.push({
                                                pathname: '/history',
                                                state: res.transactions
                                                // report: res.transactions,
                                            });
                                        }
                                    })
                                    .catch(err => {
                                        if (err.message == "Request failed with status code 401") {
                                            history.push('/login')
                                        }
                                    })
                            }
                        })
                        .catch(err => {
                            throw (err)
                        })
                }
                throw (err)
            })
    }

    return (
        <Modal show={props.isReportModalShow} size="lg"
            // aria-labelledby="contained-modal-title-vcenter"
            {...props}
            centered
        >
            <LoaderModal isLoaderShow={isLoaderShow} />
            <Modal.Header closeButton onClick={props.handleClose} style={{borderBlockColor:"white"}}></Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row className="justify-content-lg-center">
                        <Col sm={2.5} md={2.5} lg={2.5}></Col>
                        <Col sm={2} md={2} lg={2}><input type="radio" id="day" checked={selection == "Day"} value="Day" onChange={handleSelectionChange} /><label>Day</label><br /></Col>
                        <Col sm={2} md={2} lg={2}><input type="radio" id="week" checked={selection == "Week"} value="Week" onChange={handleSelectionChange} /><label>Week</label><br /></Col>
                        <Col sm={2} md={2} lg={2}><input type="radio" id="custom" checked={selection == "Custom"} value="Custom" onChange={handleSelectionChange} /><label>Custom</label><br /></Col>
                        <Col sm={2.5} md={2.5} lg={2.5}></Col>
                    </Row>
                    <Row style={{ height: "5vh" }}></Row>
                    <Row className="justify-content-lg-center">
                        {
                            selection == "Custom" ?
                                <Form>
                                    <FormGroup as={Row}>
                                        <FormLabel column lg="4">Start Date:</FormLabel>
                                        <Col lg="8"><Form.Control type="text" required placeholder="yyyymmdd" onChange={handleStartDateUpdate} /></Col>
                                    </FormGroup>
                                    <FormGroup as={Row}>
                                        <FormLabel column lg="4">End Date:</FormLabel>
                                        <Col lg="8"><Form.Control type="text" required placeholder="yyyymmdd" onChange={handleEndDateUpdate} /></Col>
                                    </FormGroup>
                                    <div style={{ color: "#dc3545", marginTop: "0.25rem", textAlign: "center" }}>{errorMsg}</div>
                                </Form>
                                :
                                <FormGroup as={Row}>
                                    <h4>{selection}:</h4>
                                    <Form.Control as="select" style={{ width: "240px", marginLeft: "30px" }} onChange={handleStartDateUpdate} defaultValue={selected[0].key}>
                                        {selected.map((d) => {
                                            return (<option key={d.key} value={d.key}>{d.text}</option>)
                                        })}
                                    </Form.Control>
                                </FormGroup>
                        }
                    </Row>
                    <Row style={{ height: "5vh" }}></Row>
                    <Row className="justify-content-lg-center">
                        <Button style={{ backgroundColor: "#c01f6d", color: "white", border: "hidden" }} type="submit" > Submit</Button>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal >
    )
}



export default ReportModal