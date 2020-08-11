import * as React from 'react'
import {  Modal} from 'react-bootstrap';
import './Modal.css'

function LoaderModal(props: any) {

    return (
        <Modal show={props.isLoaderShow}
            style={{ opacity: "0.6" }}
            centered
            {...props}
        >
            <div className='loader'>
                <img src="https://swychgift.com/alipay-yoyogo-purchase-portal-content-images/rings.svg" className="img-responsive" />
            </div>
        </Modal>

    )
}

export default LoaderModal