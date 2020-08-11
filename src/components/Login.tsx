import React, { useState } from 'react';
import { Container, Form, Card, Button } from 'react-bootstrap';
import './Home.css'
import swychApiService from '../services/swych-api-service';
import { IGrantTokenResult, ILogIn } from '../utilities/apiInterface'
import { history } from '../history';
import logo_swych from '../image/logo_swych.png';


function Login() {


    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg,setErrMsg] = useState('')
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            //   event.stopPropagation();
        } else {
            // handleLoginButtonClick(accountID,clientSecret,clientID,apiKey)
            handleLogin(email, pwd)
        }

        setValidated(true);
    };

    const handleLogin = (email: string, pwd: string) => {
        localStorage.setItem('loginEmail', email)
        localStorage.setItem('pwd', pwd)
        console.warn('apiEndPoint ' + JSON.stringify(process))
        let payload = `usn=${localStorage.getItem('loginEmail')}&pwd=${localStorage.getItem('pwd')}`
        localStorage.setItem('payload', payload)
        swychApiService.emailLogin(payload)
            .then((res: ILogIn) => {
                if (res.success) {
                    localStorage.setItem('access_token', res.access_token)
                    localStorage.setItem('accountId', res.accountId)
                    localStorage.setItem('clientId', res.clientId)
                    localStorage.setItem('apiKey', res.apiKey)
                    history.push('/home')
                }
                else{
                    setErrMsg('Incorrect email or password')
                }
            })
            .catch(err => {
                setErrMsg('Incorrect email or password')
            })
    }

    return (
        <React.Fragment>
            <div>
                <div style={{ margin: "50px", marginRight: "90vw" }}><img height="35" width="150" src={logo_swych} alt="logo" /></div>
                <Container style={{ width: "25%" }}>
                    <Card style={{ marginTop: "20vh" }}>
                        <Card.Header>Log in to Portal</Card.Header>
                        <Card.Body>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group controlId="email">
                                    <Form.Control required type="email" value={email} onChange={(event: any) => { setEmail(event.target.value) }} placeholder="Enter registration email" />
                                    <Form.Control.Feedback type="invalid">Please provide registration email.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control required type="password" value={pwd} onChange={(event: any) => { setPwd(event.target.value) }} placeholder="Enter client password" />
                                    <Form.Control.Feedback type="invalid">Please provide password.</Form.Control.Feedback>
                                </Form.Group>
                                <div style={{ color: "red" }}>{errMsg}</div><br />

                                <Button style={{marginRight: "10px",backgroundColor: "#c01f6d", color: "white", border: "hidden"}} type="submit" >
                                    Log in
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
            <div className="backGround"></div>
        </React.Fragment>
    )
}


export default Login