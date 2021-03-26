import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, update } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';

function Profile(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading, success, error } = userUpdate;

    const myOrderList = useSelector(state => state.myOrderList);
    const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== rePassword) {
            alert("Password and confirm password not matching!");
        } else {
            dispatch(update({ userId: userInfo._id, name, email, password }));
            alert("Information Updated Successfully!");
            
            // when changed password, re-login
            dispatch(logout());
            props.history.push("/signin");
        }
    }

    const handleLogout = () => {
        dispatch(logout());
        props.history.push("/signin");
    }

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
            setPassword(userInfo.password);

            console.log(userInfo.name);
        }

        dispatch(listMyOrders());
        return () => {
            //
        }
    }, [userInfo]);

    return (
        <div className="profile">
            <div className="profile-info">
                <div className="form">
                    <form onSubmit={submitHandler}>
                        <ul className="form-container">
                            <li><h2><b>User Profile</b></h2></li>
                            <li>
                                {loading && <div>Loading...</div>}
                                {error && <div>{error}</div>}
                                {success && <div>Profile Saved Successfully!</div>}
                            </li>
                            <li>
                                <label htmlFor="name">Name </label>
                                <input type="name" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="email">Email </label>
                                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="password">Password </label>
                                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                            </li>
                            <li>
                                <label htmlFor="rePassword">Confirm Password </label>
                                <input type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)}></input>
                            </li>
                            <li>
                                <button type="submit" className="button primary">Update</button>
                            </li>
                            <li>
                                <button type="button" className="button secondary full-width" onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>

            <div className="profile-orders order-history-margined">
                <h2 className="display-header">Order History</h2>
                {
                    loadingOrders ? <div>Loading...</div>
                    :
                    errorOrders ? <div>{errorOrders}</div>
                    :
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map(order => 
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid}</td>
                                    <td>
                                        <Link to={"/order/" + order._id}>Details</Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    );

}

export default Profile;