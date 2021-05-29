import "./product.css";
import { Footer, ProductBanners, Products } from "../../component";
import { useParams } from "react-router";
import { useDataContext } from "../../context/dataProvider/DataProvider";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/authProvider/AuthProvider";
export function Product() {
    const { productId } = useParams();
    const {
        dataDispatch,
        dataState: { productData, cart },
    } = useDataContext();

    const productItem = productData.find((item) => item._id === productId);
    const isPresentInCart = cart.some((item) => item._id === productId);
    const [currentImg, setCurrentImg] = useState(0);
    const {
        authState: { isLoggedIn },
    } = useAuthContext();
    useEffect(()=>{
        window.scrollTo({
            top:0,
            left:0,
            behavior:"smooth"
        })
    },[productId]);
    return (
        <>
            {productItem && <>
                <br className={"cart-void"} />

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
                            <p>{productItem.name}</p>
                        </NavLink>
                    </div>
                </div>
                <main class="container">
                    <div class="left-column">
                        <div
                            className="single-product-img"
                            style={{
                                backgroundImage: `url(${productItem.images[currentImg]})`,
                            }}
                        ></div>
                        <ul className="other-product-img">
                            {productItem.images.map((imgItem, index) => {
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
                            <h1>{productItem.name}</h1>
                            <p>
                                {productItem.description}
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
                                            name={productItem.color.name}
                                            value={productItem.color.name}
                                            checked
                                        />

                                        <label for="red">
                                            <span
                                                style={{
                                                    backgroundColor: productItem.color.hex,
                                                }}
                                            ></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="product-color">
                                <span>Rating</span>
                                <div className="rating">
                                    {[...Array(Math.floor(productItem.rating))].map(() => (
                                        <i class="fas fa-star rate"></i>
                                    ))}
                                    {productItem.rating % 1 === 0 ? (
                                        ""
                                    ) : (
                                        <i class="fas fa-star-half-alt rate"></i>
                                    )}
                                    {[...Array(5 - Math.ceil(productItem.rating))].map(() => (
                                        <i class="far fa-star rate"></i>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div class="cable-config">
                            <button>How to apply for Cash On Delivery</button>
                        </div>
                        <div class="single-product-price">
                            <span>₹{productItem.price}</span>
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
                <Footer />
            </>
            }
        </>
    );
}
