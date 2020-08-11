import React, { useState } from 'react';
import { Container, Form, Card, Button } from 'react-bootstrap';
import './Home.css'
import swychApiService from '../services/swych-api-service';
import { IGrantTokenResult, ILogIn } from '../utilities/apiInterface'
import { history } from '../history';
import logo_swych from '../image/logo_swych.png';


function Login() {

    // const [accountID, setAccountID] = useState('5504601076791310')
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg,setErrMsg] = useState('')
    // const [clientSecret, setClientSecret] = useState('6hU2O@4]e-QIssTkYoiJ7?e6keKqkL*Y')
    // const [clientID, setClientID] = useState('swych_b2b_caportal')
    // const [apiKey, setApiKey] = useState('swych_b2b_caportal')
    // const [userName, setUserName] = useState('56a28836-6743-4249-b22b-5e1a224b1693')
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
        // let payload = 'usn=swychsendportal@goswych.com&pwd=knn135188'
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
                                {/* 
                                <Form.Group controlId="accountID">
                                    <Form.Control required type="text" value = {accountID} onChange={(event:any)=>{setAccountID(event.target.value)}} placeholder="Enter account ID" />
                                    <Form.Control.Feedback type="invalid">Please provide account ID.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control required type="password" value={clientSecret} onChange={(event:any)=>{setClientSecret(event.target.value)}} placeholder="Enter client secret" />
                                    <Form.Control.Feedback type="invalid">Please provide client secret.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="clientId">
                                    <Form.Control required type="text" value={clientID} onChange={(event:any)=>{setClientID(event.target.value)}} placeholder="Enter client ID" />
                                    <Form.Control.Feedback type="invalid">Please provide client Id.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="apiKey">
                                    <Form.Control required type="text" value ={apiKey} onChange={(event:any)=>{setApiKey(event.target.value)}} placeholder="Enter apiKey" />
                                    <Form.Control.Feedback type="invalid">Please provide apiKey.</Form.Control.Feedback>
                                </Form.Group> */}

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


// const handleLoginButtonClick = (accountID: string, clientSecret: string, clientId: string, apiKey: string) => {
//     // let data = `grant_type=client_credentials&client_id=${userName}&client_secret=${pwd}&resource=3a8271ef-ef89-445c-bca2-a0a66d1afc52`

//     let data = `grant_type=client_credentials&client_id=56a28836-6743-4249-b22b-5e1a224b1693&client_secret=${clientSecret}&resource=3a8271ef-ef89-445c-bca2-a0a66d1afc52&business_client_id=${clientId}&business_api_key=${apiKey}&swych_id=${accountID}`;
//     localStorage.setItem('loginInfo', data)
//     localStorage.setItem('accountId', accountID)
//     localStorage.setItem('clientId', clientId)
//     localStorage.setItem('apiKey', apiKey)
//     swychApiService.login(data)
//         .then((res: IGrantTokenResult) => {
//             if (res.success) {
//                 localStorage.setItem('access_token', res.access_token)
//                 history.push('/home')
//             }
//         })
//         .catch(err => {
//             throw (err)
//         })
// }


export default Login