import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import PaymentSteps from '../modules/PaymentSteps';

function Payment(props) {
    const [paymentMethod, setPaymentMethod] = useState('');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(savePayment({ paymentMethod }));
        props.history.push('placeorder');
    };

    return(
        <div>
            <PaymentSteps step1 step2 step3></PaymentSteps>
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li><h2>Payment</h2></li>
                        <li>
                            <div>
                                <input type="radio" name="paymentMethod" id="paymentMethod" value="paypal" required checked onChange={(e) => setPaymentMethod(e.target.value)}></input>
                                <label for="paymentMethod">&nbsp;Paypal</label>
                            </div>
                        </li>
                        <li>
                            <button type="submit" className="button primary">Next</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    );
}

export default Payment;