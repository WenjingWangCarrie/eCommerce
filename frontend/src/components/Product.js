import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct, saveProductReview } from "../actions/productActions";
import Rating from "../modules/Rating";
import { PRODUCT_REVIEW_SAVE_RESET } from "../constants/productConstants";

function Product(props) {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const productDetails = useSelector((state) => state.productDetails);
    const { product, loading, error } = productDetails;
    const productReviewSave = useSelector((state) => state.productReviewSave);
    const { success: productSaveSuccess } = productReviewSave;

    const dispatch = useDispatch();
    useEffect(() => {
        if (productSaveSuccess) {
            // alert("Review Submitted Successfully!");
            setRating(0);
            setComment('');
            dispatch({type: PRODUCT_REVIEW_SAVE_RESET});
        }

        dispatch(detailsProduct(props.match.params.id));
        return () => {
            //
        };
    }, [productSaveSuccess]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(
            saveProductReview(props.match.params.id, {
                name: userInfo.name,
                rating: rating,
                comment: comment,
            })
        );
    };

    const handleAddToCart = () => {
        props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
    };

    return (
        <div className="container-fluid">
            <div className="back-to-result">
                <Link to="/">Back to Home</Link>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <>
                    <div className="details">
                        <div className="details-image">
                            <img src={product.image} alt={product.name}></img>
                        </div>
                        <div className="details-info">
                            <ul>
                                <li>
                                    <h2><b>{product.name}</b></h2>
                                </li>
                                <li>
                                    <a href="#reviews">
                                        <Rating value={product.rating} text={product.numReviews + " reviews"} />
                                    </a>
                                </li>
                                <li>
                                    <b>Price: $</b>{product.price}
                                </li>
                                <li>
                                    <b>Description:</b>
                                    <p>{product.description}</p>
                                </li>
                            </ul>
                        </div>
                        <div className="details-action">
                            <ul>
                                <li>Price: ${product.price}</li>
                                <li>Status: {' '} {product.countInStock > 0 ? "In Stock" : "Out of Stock"}</li>
                                <li>
                                    Qty:{' '}
                                    <select value={qty} onChange={(e) => { setQty(e.target.value); }}>
                                        {[...Array(product.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                </li>
                                <li>
                                    {product.countInStock > 0 && (
                                        <button className="button primary" onClick={handleAddToCart}>
                                            Add to Cart
                                        </button>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="content-margined">
                        <b><h2>Reviews</h2></b>
                        {!product.reviews.length && <div className="displayText">There is no review !!!</div>}

                        <ul className="review" id="reviews">
                            {product.reviews.map((review) => (
                                <li key={review._id} className="review-border">
                                    <div>{review.name}</div>
                                    <div>
                                        <Rating value={review.rating}></Rating>
                                    </div>
                                    <div>{review.createdAt.substring(0, 10)}</div>
                                    <div>{review.comment}</div>
                                </li>
                            ))}

                            <li> 
                                {userInfo ? (
                                    <form onSubmit={submitHandler}>
                                        <ul className="form-container">
                                            <li>
                                                <label htmlFor="rating"><b>Rating</b></label>
                                                <select name="rating" id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                                                    <option value="1">1 - Very Bad</option>
                                                    <option value="2">2 - Bad</option>
                                                    <option value="3">3 - Fair</option>
                                                    <option value="4">4 - Good</option>
                                                    <option value="5">5 - Excellent</option>
                                                </select>
                                            </li>

                                            <li>
                                                <label htmlFor="comment">Comments</label>
                                                <textarea name="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                                            </li>
                                            <li>
                                                <button type="submit" className="button primary">Submit</button>
                                            </li>
                                        </ul>
                                    </form>
                                ) : (
                                    <div>
                                        Please <Link to="/signin">Signin</Link> to write a review...
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}

export default Product;
