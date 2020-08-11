import * as React from 'react'
import './Home.css'
import { Container, Row, Col, Navbar, Nav, Form, FormGroup, Button, ButtonGroup, InputGroup, ButtonToolbar } from 'react-bootstrap';
import ReportModal from './ReportModal';
import {DUMMY_PHONE,DUMMY_EMAIL} from '../App.config'
import BalanceModalResult from './BalanceResultModal'
import ConfirmationModal from './ConfirmationModal';
import LoaderModal from './LoaderModal'
import swychApiService from '../services/swych-api-service';
import logo_swych from '../image/logo_swych.png';
import logo from '../image/logo.svg';
import { history } from '../history';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ICategory, ICategoryDetail, IOrderDetail, IOrderInfo, IBalance, IGrantTokenResult, ILogIn, IProduct, ITransactionDetail } from '../../src/utilities/apiInterface'
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';
import { phoneHelper } from '../utilities/helper';


// import validator from 'validator';

class Home extends React.Component {

    public state = {
        isbalanceModalShow: false,
        isbalanceModalResultShow: false,
        isReportShow: false,
        isConfirmationShow: false,
        isLoaderShow: true,
        validated: false,
        phoneVadiateMsg: "",
        amountValidateMsg: "",
        option: "email",
        message: "",
        amount: null,
        category: {} as ICategory,
        categoryDetails: [] as ICategoryDetail[],
        selectedCard: {} as ICategoryDetail,
        orderDetails: {} as IOrderDetail,
        balance: 0,
        errorMsg: "",
        fixedAmountValidateMsg: "",
        transDetails: {} as ITransactionDetail,
        deliverMode:2
    }

    public render(): JSX.Element {
        const defaultbuttonStyle = { marginRight: "10px", backgroundColor: "white", color: "Black", border: "hidden" }
        const selectedButtonStyle = { marginRight: "10px", backgroundColor: "#c01f6d", color: "white", border: "hidden" }
        return (
            <React.Fragment>
                {/* {this.state.selectedCard.brandId || this.state.errorMsg ? */}
                <div>
                    <div style={{ margin: "50px" }}>
                        <ReportModal isReportModalShow={this.state.isReportShow} handleClose={this.handleReportClose} handleReportSubmit={this.handleReportSubmit} />
                        <BalanceModalResult isbalanceModalShow={this.state.isbalanceModalResultShow} handleClose={this.handleResultModalClose} balance={this.state.balance} />
                        <ConfirmationModal isConfirmationShow={this.state.isConfirmationShow} trans={this.state.transDetails} handleClose={this.handleConfirmationClose} />
                        {/* {this.state.isLoaderShow ? <Loader /> : null} */}
                        <LoaderModal isLoaderShow={this.state.isLoaderShow} />
                        <Navbar collapseOnSelect expand="md">
                            <Navbar.Brand href="#home"><img height="35" width="150" src={logo_swych} alt="logo" /></Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="ml-auto">
                                    <Nav.Link onClick={this.showBalanceModal}><h4>Account Balance</h4></Nav.Link>
                                    <Nav.Link onClick={() => this.showReportModal()}><h4>History</h4></Nav.Link>
                                    <Nav.Link onClick={() => this.logOut()}><h4>Log out</h4></Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                        <div style={{ margin: "30px" }}>
                            <Row style={{ height: "5vh" }}></Row>
                            <Row>
                                <Col sm={1.5}>
                                    <span style={{ fontSize: "20px", verticalAlign: "baseline" }}>Send</span>
                                </Col>
                                <Col sm={2}>
                                    <Form.Control as="select" onChange={this.handleBrandNameSelect}>
                                        {this.state.categoryDetails.map((c: ICategoryDetail) => {
                                            return (<option>{c.brandName}</option>)
                                        })}
                                    </Form.Control>
                                </Col>
                                <Col sm={8.5}>
                                    <span style={{ fontSize: "20px", verticalAlign: "baseline" }}>Gift Card</span>
                                </Col>
                            </Row>

                            <Row style={{ height: "5vh" }}></Row>
                            <Row>
                                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                                    <Form.Row>
                                        <Col sm={8} md={8} lg={8}><div><img src={this.state.selectedCard.brandImage} width="307px" height="100%" alt="logo" /></div></Col>
                                        <Col sm={4} md={4} lg={4}>
                                            <div style={{ marginLeft: "30px", width: "300px" }}>
                                                <Form.Control plaintext readOnly defaultValue="Deliver to:" />
                                                <Form.Group controlId="firtName">
                                                    <Form.Control type="text" value={this.state.orderDetails.recipientFirstName} required placeholder="First Name" maxLength={25} onChange={(event: any) => this.handleOrderDetailsUpdate(event.target.value, 'recipientFirstName')} />
                                                    <Form.Control.Feedback type="invalid">Please provide first name.</Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group controlId="lastName">
                                                    <Form.Control type="text" value={this.state.orderDetails.recipientLastName} required placeholder="Last Name" maxLength={25} onChange={(event: any) => this.handleOrderDetailsUpdate(event.target.value, 'recipientLastName')} />
                                                    <Form.Control.Feedback type="invalid">Please provide last name.</Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group style={{ marginBottom: "-2px" }}>
                                                    <Form.Row>
                                                        <Col sm={4} md={4} lg={4}><Form.Control plaintext readOnly defaultValue="Deliver by:" /></Col>
                                                        <Col sm={8} md={8} lg={8} style={{ margin: "auto" }}>
                                                            <Form.Check
                                                                type="radio"
                                                                inline
                                                                label="Email"
                                                                name="option"
                                                                value="email"
                                                                checked={this.state.option == "email" ? true : false}
                                                                onChange={this.handleOptionChange}
                                                            />
                                                            <Form.Check
                                                                type="radio"
                                                                inline
                                                                label="SMS"
                                                                name="option"
                                                                value="sms"
                                                                checked={this.state.option == "sms" ? true : false}
                                                                onChange={this.handleOptionChange}
                                                            />
                                                        </Col>
                                                    </Form.Row>
                                                </Form.Group>
                                                {
                                                    this.state.option == "email" ?
                                                        <Form.Group controlId="formBasicEmail">
                                                            <Form.Control type="email" value={this.state.orderDetails.recipientEmail} required placeholder="Email" onChange={(event: any) => this.handleOrderDetailsUpdate(event.target.value, 'recipientEmail')} />
                                                            <Form.Control.Feedback type="invalid">Please provide correct email.</Form.Control.Feedback>
                                                        </Form.Group> :
                                                        this.state.option == "sms" ?
                                                            <Form.Group controlId="sms">
                                                                <InputGroup>
                                                                    <InputGroup.Prepend>
                                                                        <InputGroup.Text>+1</InputGroup.Text>
                                                                    </InputGroup.Prepend>
                                                                    <Form.Control required style={this.state.phoneVadiateMsg ? { borderColor: "#dc3545" } : {}} type="text" maxLength={10} value={this.state.orderDetails.recipientPhoneNumber} placeholder="Phone Number" onChange={(event: any) => this.handleOrderDetailsUpdate(event.target.value, 'recipientPhoneNumber')} />
                                                                    <Form.Control.Feedback type="invalid">Please provide phone.</Form.Control.Feedback>
                                                                </InputGroup>
                                                                <div style={{ color: "#dc3545", fontSize: "80%", marginTop: "0.25rem", textAlign: "center" }}>{this.state.phoneVadiateMsg}</div>
                                                            </Form.Group> : null}

                                                {/* <Form.Group controlId="message">
                                                        <Form.Control type="text" value={this.state.orderDetails.message} placeholder="Add a Message(Optional)" onChange={(event: any) => this.handleOrderDetailsUpdate(event.target.value, 'message')} />
                                                    </Form.Group> */}
                                                <FormGroup>
                                                    {this.state.selectedCard.denominationType == 1 ?
                                                        <Form.Control type="text" pattern="[0-9]*" value={!this.state.orderDetails.amount || this.state.orderDetails.amount == 0 ? "" : this.state.orderDetails.amount} required placeholder={`Input amount from ${this.state.selectedCard.denominationMin} to ${this.state.selectedCard.denominationMax}`} onChange={this.handleAmountChange} />
                                                        :
                                                        <div>
                                                            <ButtonToolbar>
                                                                {/* <ButtonGroup onClick={(event: any) => this.handleOrderDetailsUpdate(event.target.value, 'amount')}> */}
                                                                <ButtonGroup onClick={(event: any) => this.handleOrderDetailsUpdate(event.target.value, 'amount')}>
                                                                    {this.state.selectedCard.products && this.state.selectedCard.products.map((p: IProduct) => {
                                                                        return (<Button style={this.state.orderDetails.amount == p.amount ? selectedButtonStyle : defaultbuttonStyle} value={p.amount}>{`C$${p.amount}`}</Button>)
                                                                    })}
                                                                </ButtonGroup>
                                                            </ButtonToolbar>
                                                            <div style={{ color: "#dc3545", fontSize: "80%", marginTop: "0.25rem", textAlign: "center" }}>{this.state.fixedAmountValidateMsg}</div>
                                                        </div>
                                                    }
                                                    <Form.Control.Feedback type="invalid">Please provide the amount.</Form.Control.Feedback>
                                                    <div style={{ color: "#dc3545", fontSize: "80%", marginTop: "0.25rem", textAlign: "center" }}>{this.state.amountValidateMsg}</div>
                                                </FormGroup>
                                                <FormGroup>
                                                    <div style={{ float: "left" }}><Button style={{ backgroundColor: "#c01f6d", color: "white", border: "hidden" }} type="submit">Send</Button></div>
                                                </FormGroup>
                                                <FormCheckLabel style={{ color: "red" }}>{this.state.errorMsg}</FormCheckLabel>
                                            </div>
                                        </Col>
                                    </Form.Row>
                                </Form>
                            </Row>
                            <Row style={{ height: "10vh" }}></Row>
                        </div>
                        <div>
                            <div style={{ color: "gray", fontSize: "x-large" }}>ELECTRONIC DELIVERY</div>
                            <p style={{ color: "gray" }}>Please ensure that the consumer information is absolutely correct in the form above. By Clicking send below, you are authorizing Swych to debit your account for the amount above and send this gift to the email address entered above. Anyone who has access to that email will be able to redeem this gift card. Thank you for using Swych Gifting Platform to send your prize electronically.</p>
                        </div>
                    </div>
                    <div>
                        <div className="footer">
                            <span style={{ position: "fixed", left: "20px" }}><img src={logo} height={25} /></span>
                            <span>Copyright © 2017 Swych. Prizes powered by Swych Inc.</span>
                        </div>
                    </div>
                </div>
                {/* : <Loader />} */}
            </React.Fragment>
        )
    }

    componentDidMount() {
        if (localStorage.getItem('clientId') && localStorage.getItem('apiKey')) {
            this.init()
        }
        else {
            history.push('/login')
        }
    }

    private initDummy = ()=>{
        if(this.state.orderDetails.recipientEmail == DUMMY_EMAIL){
            this.state.orderDetails.recipientEmail= ""
        }
        else if(this.state.orderDetails.recipientPhoneNumber == DUMMY_PHONE){
            this.state.orderDetails.recipientPhoneNumber= ""
        }

        this.setState({orderDetails:this.state.orderDetails})
    }


    private init = () => {

        swychApiService.getCategory()
            .then((res: ICategory) => {
                if (res.success) {
                    this.setState({ category: res, categoryDetails: res.catalog, selectedCard: res.catalog[0], isLoaderShow: false })
                    if(this.state.selectedCard.products[0].productType == 0){
                        this.state.orderDetails.amount = res.catalog[0].products[0].amount
                        console.log('selectedCard ' + JSON.stringify(this.state.orderDetails))
                    }
                } else {
                    this.setState({ errorMsg: res.message })
                }
                console.log('category' + JSON.stringify(this.state.selectedCard))
            })
            .catch((err: any) => {
                history.push('/login')
            })
    }

    private logOut = () => {
        localStorage.clear()
        history.push('/login')
    }

    private handleReportClose = () => {
        this.setState({
            isReportShow: false
        })
    }

    private handleConfirmationClose = () => {
        this.setState({
            isConfirmationShow: false
        })
    }

    private handleReportSubmit = () => {

    }

    private showReportModal = () => {
        this.setState({
            isReportShow: true
        })
    }

    private handleOptionChange = (event: any) => {
        this.setState({ option: event.target.value})
        if(event.target.value == "sms"){
            this.setState({deliverMode:1})
        }
        else if(event.target.value == "email"){
            this.setState({deliverMode:2})
        }
        this.initDummy()
        console.log('option ' + event.target.value)
    }

    private handleBrandNameSelect = (event: any) => {
        let allCard: ICategoryDetail[] = [...this.state.categoryDetails]
        let selectedCard:ICategoryDetail = Object.assign({},this.state.selectedCard)
        let updatedOrderDetail = Object.assign({}, this.state.orderDetails)
        selectedCard = allCard.filter((c: ICategoryDetail) => c.brandName == event.target.value)[0]
        if(selectedCard.products[0].productType == 0){
            updatedOrderDetail.amount = selectedCard.products[0].amount
        }
        else{
            updatedOrderDetail.amount = 0
        }

        this.setState({ selectedCard: allCard.filter((c: ICategoryDetail) => c.brandName == event.target.value)[0] })

        this.setState({ orderDetails: updatedOrderDetail })
        console.log('selectedCardAMOUNT' + JSON.stringify(this.state.selectedCard.products[0].amount))
        console.log('selectedCard' + JSON.stringify(this.state.orderDetails.amount))
    }

    private handleAmountChange = (event: any) => {
        let amount
        if (event.target.value == "") {
            amount = ""
        }
        else {
            amount = (event.target.validity.valid) ? event.target.value : this.state.orderDetails.amount;
        }

        let updatedOrderDetail = Object.assign({}, this.state.orderDetails)
        updatedOrderDetail["amount"] = amount
        this.setState({ orderDetails: updatedOrderDetail }, () => { this.amountValidate() })
    }

    private handleOrderDetailsUpdate = (v: string, attr: string) => {
        const att: string = attr
        let updatedOrderDetail = Object.assign({}, this.state.orderDetails)
        if (attr == "recipientEmail") {
            updatedOrderDetail["recipientPhoneNumber"] = DUMMY_PHONE
        }
        else if (attr == "recipientPhoneNumber") {
            updatedOrderDetail["recipientEmail"] = DUMMY_EMAIL
        }
        updatedOrderDetail[att] = v
        this.setState({ orderDetails: updatedOrderDetail }, () => { this.amountValidate(); this.phoneValidateion() })
        // this.setState({buttonStyle:{ marginRight: "10px",backgroundColor: "#c01f6d", color: "white", border: "hidden"}})
        // this.phoneValidateion()
        // this.amountValidate()

    }

    private fixedAmountValidate = () => {
        if (!this.state.orderDetails.amount) {
            this.setState({ fixedAmountValidateMsg: "Please select amount" })
        }
        else {
            this.setState({ fixedAmountValidateMsg: "" })
        }
    }

    private amountValidate = () => {
        console.log('amount' + this.state.orderDetails.amount)
        if (this.state.orderDetails.amount > this.state.selectedCard.denominationMax) {
            this.setState({ amountValidateMsg: `Please input amount smaller than${this.state.selectedCard.denominationMax}` })
        }
        else if (this.state.orderDetails.amount < this.state.selectedCard.denominationMin && this.state.orderDetails.amount > 0) {
            this.setState({ amountValidateMsg: `Please input amount larger than${this.state.selectedCard.denominationMin}` })
        }
        else if ((this.state.orderDetails.amount >= this.state.selectedCard.denominationMin) && (this.state.orderDetails.amount <= this.state.selectedCard.denominationMax)) {
            this.setState({ amountValidateMsg: "" })
        }
        else if (!this.state.orderDetails.amount) {
            this.setState({ amountValidateMsg: "" })
        }
    }

    private phoneValidateion = () => {
        if (this.state.orderDetails.recipientPhoneNumber && this.state.orderDetails.recipientPhoneNumber.length > 2 && this.state.orderDetails.recipientPhoneNumber.length < 4) {
            this.state.orderDetails.recipientPhoneNumber.substring(0, 3)
            if (phoneHelper.indexOf(this.state.orderDetails.recipientPhoneNumber) < 0) {
                this.setState({ phoneVadiateMsg: "Please provide correct Canadian phone number" })
            }
            else {
                this.setState({ phoneVadiateMsg: "" })
            }
        }
        else if (this.state.orderDetails.recipientPhoneNumber && this.state.orderDetails.recipientPhoneNumber.length < 3) {
            this.setState({ phoneVadiateMsg: "" })
        }
    }

    private handleSubmit = (event: any) => {

        event.preventDefault();
        event.stopPropagation();

        this.fixedAmountValidate()

        const form = event.currentTarget;

        if (form.checkValidity() === true && this.state.phoneVadiateMsg == "" && this.state.fixedAmountValidateMsg == "") {

            this.setState({ validated: true, isLoaderShow: true })

            let orderDetail = {
                accountId: localStorage.getItem('accountId'),
                brandId: this.state.selectedCard.brandId,
                productId: this.state.selectedCard.products[0].productId,
                amount: this.state.orderDetails.amount,
                recipientFirstName: this.state.orderDetails.recipientFirstName,
                recipientLastName: this.state.orderDetails.recipientLastName,
                recipientEmail: this.state.orderDetails.recipientEmail && this.state.orderDetails.recipientEmail !== DUMMY_EMAIL ? this.state.orderDetails.recipientEmail : DUMMY_EMAIL,
                recipientPhoneNumber: this.state.orderDetails.recipientPhoneNumber && this.state.orderDetails.recipientPhoneNumber !== DUMMY_PHONE ? `1${this.state.orderDetails.recipientPhoneNumber}` : `1${DUMMY_PHONE}`,
                notificationDeliveryMethod: this.state.deliverMode,
                giftDeliveryMode: 3,
                swychable: true,
                deliverGiftTo: 1
            }
            swychApiService.getOrderId(orderDetail)
                .then((res: IOrderInfo) => {
                    if (res.success) {
                        if (res.orderId) {
                            // localStorage.setItem('orderId', res.orderId)
                            // localStorage.setItem('accessCode', res.AccessCode)
                            // history.push(`/sucessView/order?orderId=${res.orderId}`)
                            let payLoad = {
                                accountId: localStorage.getItem('accountId'),
                                orderId: res.orderId,
                                AccessCode: res.AccessCode,
                            }
                            swychApiService.getOrderInfos(payLoad)
                                .then((res: ITransactionDetail) => {
                                    this.setState({ isLoaderShow: false })
                                    if (res.success) {
                                        this.setState({ transDetails: res, isConfirmationShow: true })
                                        this.setState({ errorMsg:""})
                                    }
                                    else {
                                        this.setState({ errorMsg: res.message })
                                    }
                                })
                                .catch(err => {
                                    this.setState({ errorMsg: res.message })
                                })
                        }
                    }
                    else {
                        this.setState({ isLoaderShow: false })
                        this.setState({ errorMsg: res.message, selectedCard: this.state.selectedCard })
                    }
                })
                .catch(err => {
                    if (err.message == "Request failed with status code 401") {
                        swychApiService.emailLogin(localStorage.getItem('payload'))
                            .then((res: ILogIn) => {
                                if (res.success) {
                                    localStorage.setItem('access_token', res.access_token)
                                    localStorage.setItem('accountId', res.accountId)
                                    localStorage.setItem('clientId', res.clientId)
                                    localStorage.setItem('apiKey', res.apiKey)
                                    swychApiService.getOrderId(orderDetail)
                                        .then((res: IOrderInfo) => {
                                            this.setState({ isLoaderShow: false })
                                            if (res.success) {
                                                this.setState({ errorMsg:""})
                                                if (res.orderId) {
                                                    let payLoad = {
                                                        accountId: localStorage.getItem('accountId'),
                                                        orderId: res.orderId,
                                                        AccessCode: res.AccessCode,
                                                    }
                                                    swychApiService.getOrderInfos(payLoad)
                                                        .then((res: ITransactionDetail) => {
                                                            if (res.success) {
                                                                this.setState({ transDetails: res, isConfirmationShow: true })
                                                                this.initDummy()
                                                            }
                                                            else {
                                                                this.setState({ errorMsg: res.message })
                                                            }
                                                        })
                                                        .catch(err => {
                                                            this.setState({ errorMsg: res.message })
                                                        })
                                                }
                                            }
                                            else {
                                                this.setState({ isLoaderShow: false })
                                                this.setState({ errorMsg: res.message, selectedCard: this.state.selectedCard })
                                            }
                                        })
                                }
                            })
                            .catch(err => {
                                if (err.message == "Request failed with status code 401") {
                                    history.push('/login')
                                }
                            })
                    }
                })
        }
        // else if (form.checkValidity() === true) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // }

        this.setState({ validated: true })

    }

    private showBalanceModal = () => {
        swychApiService.getBalance()
            .then((res: IBalance) => {
                if (res.success) {
                    this.setState({
                        isbalanceModalResultShow: true,
                        balance: res.balance
                    })
                }
            })
            .catch(err => {
                if (err.message == "Request failed with status code 401") {
                    swychApiService.emailLogin(localStorage.getItem('payload'))
                        .then((res: ILogIn) => {
                            if (res.success) {
                                localStorage.setItem('access_token', res.access_token)
                                localStorage.setItem('accountId', res.accountId)
                                localStorage.setItem('clientId', res.clientId)
                                localStorage.setItem('apiKey', res.apiKey)
                                swychApiService.getBalance()
                                    .then((res: IBalance) => {
                                        if (res.success) {
                                            this.setState({
                                                isbalanceModalResultShow: true,
                                                balance: res.balance
                                            })
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


    private handleResultModalClose = () => {
        this.setState({
            isbalanceModalResultShow: false
        })
    }
}

export default Home