import "./product.css";
import { ProductBanners, Products } from "../../component";
import { useParams } from "react-router";
import { useDataContext } from "../../context/dataProvider/DataProvider";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/authProvider/AuthProvider";
export function Product() {
    const { productId } = useParams();
    const {
        dataDispatch,
        dataState: { productData, cart },
    } = useDataContext();
    const productItem = productData.find((item) => item._id === productId);
    const { name, price, color, images, description, rating } = productItem;
    const isPresentInCart = cart.some((item) => item._id === productId);
    const [currentImg, setCurrentImg] = useState(0);
    const {
        authState: { isLoggedIn },
    } = useAuthContext();
    return (
        <>
            <br />
            <div className="shop-page-details">
                <div className="on-left">
                    <NavLink to="/home">
                        <p>Home</p>
                    </NavLink>
                    <i class="fas fa-angle-right"></i>
                    <NavLink to="/shop">
                        <p>Shop</p>
                    </NavLink>
                    <i class="fas fa-angle-right"></i>
                    <NavLink to={`/products/${productId}`}>
                        <p>{name}</p>
                    </NavLink>
                </div>
            </div>
            <main class="container">
                <div class="left-column">
                    <div
                        className="single-product-img"
                        style={{
                            backgroundImage: `url(${images[currentImg]})`,
                        }}
                    ></div>
                    <ul className="other-product-img">
                        {images.map((imgItem, index) => {
                            return (
                                <li
                                    key={index}
                                    className="img"
                                    style={{
                                        backgroundImage: `url(${imgItem})`,
                                    }}
                                    onClick={() => setCurrentImg(index)}
                                ></li>
                            );
                        })}
                    </ul>
                </div>
                <div class="right-column">
                    <div class="product-description">
                        <span>Watches</span>
                        <h1>{name}</h1>
                        <p>
                            {description}
                            <br />
                            <br />
                            Quis laborum sunt occaecat enim eu labore quis
                            aliqua officia nostrud laborum.
                        </p>
                    </div>

                    <div class="product-configuration">
                        <div class="product-color">
                            <span>Color</span>

                            <div class="color-choose">
                                <div>
                                    <input
                                        data-image="red"
                                        type="radio"
                                        id="red"
                                        name={color.name}
                                        value={color.name}
                                        checked
                                    />

                                    <label for="red">
                                        <span
                                            style={{
                                                backgroundColor: color.hex,
                                            }}
                                        ></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="product-color">
                            <span>Rating</span>
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
                    <div class="cable-config">
                        <button>How to apply for Cash On Delivery</button>
                    </div>
                    <div class="single-product-price">
                        <span>₹{price}</span>
                        {isLoggedIn ? (
                            isPresentInCart ? (
                                <NavLink to="/cart">
                                    <button class="cart-btn">Go to Cart</button>
                                </NavLink>
                            ) : (
                                <button
                                    onClick={() => {
                                        dataDispatch({
                                            type: "CART_UPDATE",
                                            data: {
                                                cart: [
                                                    ...cart,
                                                    {
                                                        _id: productId,
                                                        quantity: 1,
                                                    },
                                                ],
                                            },
                                        });
                                    }}
                                    class="cart-btn"
                                >
                                    Add to cart
                                </button>
                            )
                        ) : (
                            <NavLink to="/login">
                                <button class="cart-btn">
                                    Login To Continue
                                </button>
                            </NavLink>
                        )}
                    </div>
                </div>
            </main>
            <Products
                headingVisiblility={true}
                title={"Related Products"}
                subTitle={"you might be interested in ..."}
                noOfProducts={4}
            />
            <ProductBanners />
        </>
    );
}
