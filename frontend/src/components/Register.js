import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';

function Register(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;
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

        if (password !== rePassword) {
            alert("Password and confirm password not matching!");
        } else {
            dispatch(register(name, email, password));
        }
    }

    return(
        <div className="form"> 
        <br></br> 
             <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li><h2>Create Account</h2></li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>} 
                    </li>
                    <li>
                        <label htmlFor="name">Name </label>
                        <input type="name" name="name" id="name" required onChange={(e) => setName(e.target.value)}></input>
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
                        <label htmlFor="rePassword">Confirm Password </label>
                        <input type="password" id="rePassword" name="rePassword" required onChange={(e) => setRePassword(e.target.value)}></input>
                    </li>
                    <li>
                        <button type="submit" className="button primary">Register</button>
                    </li>
                    <li>
                        Already have an account?
                        <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="button secondary text-center">
                            Sign In
                        </Link>
                    </li>
                </ul>
             </form>
        </div>
    );
}

export default Register;