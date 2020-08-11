import React from 'react';
import './Modal.css'

function Loader(){

    return(
    <React.Fragment>
        <span className='loader' style={{verticalAlign:"middle"}}>
            <img src="https://swychgift.com/alipay-yoyogo-purchase-portal-content-images/rings.svg" className="img-responsive" />
            <img src="https://swychgift.com/alipay-yoyogo-purchase-portal-content-images/rings.svg" className="img-responsive" />
            <img src="https://swychgift.com/alipay-yoyogo-purchase-portal-content-images/rings.svg" className="img-responsive" />
            <img src="https://swychgift.com/alipay-yoyogo-purchase-portal-content-images/rings.svg" className="img-responsive" />
        </span>
    </React.Fragment>

    )
}

export default Loader


