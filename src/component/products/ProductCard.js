import { useEffect, useReducer, useState } from "react";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import { useDataContext } from "../../context/dataProvider/DataProvider";
import { NavLink } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useToastContext } from "../../context/toastProvider/ToastProvider";

export function ProductCard({ _id, name, rating, images, price }) {
    const [productImgState, productImgDispatch] = useReducer(
        (state, action) => {
            return {
                ...action,
                backgroundImage: `url(${images[action.payload]})`,
            };
        },
        {
            backgroundImage: `url(${images[0]})`,
        }
    );
    const {
        dataState: { cart, wishlist },
        dataDispatch,
    } = useDataContext();

    const { toastListDispatch } = useToastContext();
    const [animationImg, setAnimationImg] = useState("0");
    useEffect(() => {
        setAnimationImg((animationImg) => {
            return animationImg === "0" ? "1" : "0";
        });
    }, [productImgState]);
    const ProductInCart = cart.some((item) => item._id === _id);
    const ProductInWishlist = wishlist.some((item) => item === _id);
    // console.log(cart,"cart");
    return (
        <div
            className="product"
            onMouseEnter={() => {
                productImgDispatch({ payload: 1 });
            }}
            onMouseLeave={() => {
                productImgDispatch({ payload: 0 });
            }}
        >
            <NavLink to={`/products/${_id}`}>
                <div className="img-container">
                    <div
                        className="product-img"
                        style={productImgState}
                        animation={animationImg}
                    ></div>
                </div>
            </NavLink>
            <div className="product-details">
                <NavLink to={`/products/${_id}`}>
                    <div className="product-info">
                        <p className="product-title">{name}</p>
                        <p className="product-price">₹{price}</p>
                    </div>
                </NavLink>
                <div className="product-options">
                    <button className="add-to-cart">Buy Now</button>
                    <div className="icon-options">
                        {/* <button className="product-watch">
                            <VisibilityOutlinedIcon
                                style={{ fontSize: "1.07rem" }}
                            />
                        </button> */}
                        <button
                            className="add-to-wishlist"
                            onClick={() => {
                                if (ProductInWishlist) {
                                    dataDispatch({
                                        type: "WISHLIST",
                                        data: {
                                            wishlist: wishlist.filter(
                                                (item) => item !== _id
                                            ),
                                        },
                                    });
                                    toastListDispatch({
                                        type: "ADD_TOAST",
                                        data: {
                                            _id: uuid(),
                                            text: `${name} removed from wishlist successfully!!!`,
                                            type: "info",
                                        },
                                    });
                                } else {
                                    dataDispatch({
                                        type: "WISHLIST",
                                        data: {
                                            wishlist: [...wishlist, _id],
                                        },
                                    });
                                    toastListDispatch({
                                        type: "ADD_TOAST",
                                        data: {
                                            _id: uuid(),
                                            text: `${name} added to wishlist successfully!!!`,
                                            type: "success",
                                        },
                                    });
                                }
                            }}
                            style={
                                ProductInWishlist
                                    ? {
                                            color: "var(--border-color)",
                                            background: "var(--black-color-100)",
                                        }
                                    : {}
                            }
                        >
                            <FavoriteBorderOutlinedIcon
                                style={{ fontSize: "1.07rem" }}
                            />
                        </button>
                        <button
                            className="add-to-wishlist"
                            onClick={() => {
                                if (ProductInCart) {
                                    dataDispatch({
                                        type: "CART",
                                        data: {
                                            cart: cart.filter(
                                                (item) => item._id !== _id
                                            ),
                                        },
                                    });
                                    toastListDispatch({
                                        type: "ADD_TOAST",
                                        data: {
                                            _id: uuid(),
                                            text: `${name} removed to cart successfully!!!`,
                                            type: "info",
                                        },
                                    });
                                } else {
                                    dataDispatch({
                                        type: "CART",
                                        data: {
                                            cart: [
                                                ...cart,
                                                { _id, quantity: 1 },
                                            ],
                                        },
                                    });
                                    toastListDispatch({
                                        type: "ADD_TOAST",
                                        data: {
                                            _id: uuid(),
                                            text: `${name} added to cart successfully!!!`,
                                            type: "success",
                                        },
                                    });
                                }
                            }}
                            style={
                                ProductInCart
                                    ? {
                                          color: "var(--border-color)",
                                          background: "var(--black-color-100)",
                                      }
                                    : {}
                            }
                        >
                            <ShoppingCartOutlinedIcon
                                style={{ fontSize: "1.07rem" }}
                            />
                        </button>
                    </div>
                    <div className="rating">
                        {[...Array(Math.floor(rating))].map(() => (
                            <i class="fas fa-star rate"></i>
                        ))}
                        {rating % 1 === 0 ? (
                            ""
                        ) : (
                            <i class="fas fa-star-half-alt rate"></i>
                        )}
                        {[...Array(5 - Math.ceil(rating))].map(() => (
                            <i class="far fa-star rate"></i>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
