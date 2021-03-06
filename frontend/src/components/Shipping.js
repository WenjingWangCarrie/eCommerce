import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { saveShipping } from '../actions/cartActions';
import PaymentSteps from '../modules/PaymentSteps';

function Shipping(props) {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(saveShipping({ address, city, postalCode, country }));
        props.history.push('payment');
    }

    return( 
        <div>
            <PaymentSteps step1 step2></PaymentSteps>
            <div className="form">
                <form onSubmit={submitHandler}>

                    <ul className="form-container">
                        <li><h2>Shipping</h2></li>
                        <li>
                            <label htmlFor="address">Address </label>
                            <input type="text" name="address" id="address" required onChange={(e) => setAddress(e.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor="city">City </label>
                            <input type="text" name="city" id="city" required onChange={(e) => setCity(e.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor="postalCode">Postal Code </label>
                            <input type="text" name="postalCode" id="postalCode" required onChange={(e) => setPostalCode(e.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor="country">Country </label>
                            <input type="text" name="country" id="country" required onChange={(e) => setCountry(e.target.value)}></input>
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

export default Shipping;