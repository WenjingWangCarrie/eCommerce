import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PaymentSteps from '../modules/PaymentSteps';
import { createOrder } from '../actions/orderActions';

function PlaceOrder(props) {
    const cart = useSelector(state => state.cart);
    const orderCreate = useSelector(state => state.orderCreate);
    const { loading, success, error, order } = orderCreate;

    const { cartItems, shipping, payment } = cart;
    if (!shipping.address) {
        props.history.push("/shipping");
    } else if (!payment.paymentMethod) {
        props.history.push("/payment");
    }

    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const tax = (0.13 * itemsPrice * 100) / 100;
    const taxPrice = Math.round(tax);
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const dispatch = useDispatch();
    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice, taxPrice, totalPrice
        }));
    }

    useEffect(() => {
        if (success) {
            props.history.push("/order/" + order._id);
        }
    }, [success]);

    return(
        <div>
            <PaymentSteps step1 step2 step3 step4></PaymentSteps>
            <div className="placeorder">
                <div className="placeorder-info">
                    <div>
                        <h3><b>Shipping</b></h3>
                        <div>
                            {cart.shipping.address}, {cart.shipping.city}, {cart.shipping.postalCode}, {cart.shipping.country},
                        </div>
                    </div>

                    <div>
                        <h3><b>Payment</b></h3>
                        <div>Payment Method: {cart.payment.paymentMethod}</div>
                    </div>

                    <div>
                        <ul className="cart-list-container">
                            <li><h3><b>Shopping Cart</b></h3><div><b>Price</b></div></li>
                            {cartItems.length === 0 ? <div>Cart is empty</div>
                            :
                            cartItems.map(item => 
                                <li>
                                    <div clasSName="cart-image">
                                        <img src={item.image} alt={item.name}></img>
                                    </div>
                                    <div className="cart-name">
                                        <div>
                                            <Link to={"/product/" + item.product}>{item.name}</Link>
                                        </div>
                                        <div>Qty: {item.qty}</div>
                                    </div>

                                    <div classNAme="cart-price">
                                        ${item.price}
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>

                </div>

                <div className="placeorder-action">
                    <ul>
                        <li>
                            <button className="button primary full-width" onClick={placeOrderHandler}>Place Order</button>
                        </li>
                        <li><h3><b>Order Summary</b></h3></li>
                        <li>
                            <div>Items</div>
                            <div>${itemsPrice}</div>
                        </li>
                        <li>
                            <div>Shipping</div>
                            <div>${shippingPrice}</div>
                        </li>
                        <li>
                            <div>Tax</div>
                            <div>${taxPrice}</div>
                        </li>
                        <li>
                            <div>Order Total</div>
                            <div>${totalPrice}</div>
                        </li>
                    </ul>
                </div>
                
            </div>
        </div>
    );
}

export default PlaceOrder;