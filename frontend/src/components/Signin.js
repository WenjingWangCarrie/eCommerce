import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';

function Signin(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const dispatch = useDispatch();

    const redirect = props.location.search ? props.location.search.split("=")[1] : "/";
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
        return () => {
            //
        };
    }, [props.history, redirect, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }

    return(
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li><h2>Signin</h2></li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>} 
                    </li> 
                    <li>
                        <label htmlFor="email">Email </label>
                        <input type="email" name="email" id="email" required onChange={(e) => setEmail(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="password">Password </label>
                        <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}></input>
                    </li> 
                    <li>
                        <button type="submit" className="button primary">Signin</button>
                    </li>
                    <li>
                        Don't have an account?
                        <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="button secondary text-center">
                            Create an account
                        </Link>
                    </li>
                </ul>
            </form>
        </div>
    );
}

export default Signin;