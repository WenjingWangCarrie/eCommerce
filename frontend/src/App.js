import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useSelector }  from 'react-redux';
import "./App.css";

import Home from "./components/Home";
import Product from "./components/Product";
import Products from "./components/Products";
import Register from "./components/Register";
import Signin from "./components/Signin";
import Order from "./components/Order";
import Orders from "./components/Orders";
import PlaceOrder from "./components/PlaceOrder";
import Shipping from "./components/Shipping";
import Cart from "./components/Cart";
import Payment from "./components/Payment";
import Profile from "./components/Profile";

function App() {
    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open");
    };
    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open");
    };

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="header">
                    <div className="brand">
                        <button onClick={openMenu}>&#9776;</button>
                        <Link to="/">eCommerce</Link>
                    </div>
                    <div className="header-links">
                        <a href="cart.html">Cart</a>
                        {userInfo ? (
                            <Link to="/profile">{userInfo.name}</Link>
                        ) : (
                            <Link to="/signin">Sign In</Link>
                        )} 

                        {userInfo && userInfo.isAdmin && (
                            <div className="dropdown">
                                <a href="#">Admin</a>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/orders">Orders</Link>
                                        <Link to="/products">Products</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </header>

                <aside className="sidebar">
                    <br></br>
                    <div className="container">
                        <h3>Categories</h3>
                        <button className="sidebar-close-button" onClick={closeMenu}>
                            x
                        </button>
                        <ul className="categories">
                            <li>
                                <Link to="/category/Tops">Tops</Link>
                            </li>
                            <li>
                                <Link to="/category/Bottoms">Bottoms</Link>
                            </li>
                        </ul>
                    </div>  
                </aside>

                <main className="main">
                    <div className="content">
                        <Route exact path="/" component={Home} />
                        <Route path="/category/:id" component={Home} />
                        <Route path="/product/:id" component={Product} /> 
                        <Route path="/products" component={Products} />
                        <Route path="/register" component={Register} />
                        <Route path="/signin" component={Signin} />
                        <Route path="/order/:id" component={Order} />
                        <Route path="/orders" component={Orders} />
                        <Route path="/placeorder" component={PlaceOrder} />
                        <Route path="/shipping" component={Shipping} />
                        <Route path="/cart/:id?" component={Cart} />
                        <Route path="/payment" component={Payment} />
                        <Route path="/profile" component={Profile} />
                    </div>
                </main>

                <footer className="footer">C right reserved.</footer>
            </div>
        </BrowserRouter>
    );
}
export default App;
