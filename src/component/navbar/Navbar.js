import { useEffect, useState } from "react";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { useDataContext } from "../../context/dataProvider/DataProvider";
import { NavLink } from "react-router-dom";
import { getStockTagColor } from "../utils/Utils";
import logoImg from "../../images/logo.png";
import { useAuthContext } from "../../context/authProvider/AuthProvider";
import { useToastContext } from "../../context/toastProvider/ToastProvider";
import { v4 as uuid } from "uuid";

function WishListDropDown() {
    const {
        dataState: { wishlist, productData },
    } = useDataContext();
    return (
        <>
            <i className="icon">
                <FavoriteBorderOutlinedIcon style={{ fontSize: "1.2rem" }} />
                {wishlist.length > 0 ? (
                    wishlist.length < 10 ? (
                        <span class="badge badge-sm primary br-round top right">
                            {wishlist.length}
                        </span>
                    ) : (
                        <span class="badge badge-sm primary br-round top count-9 right">
                            9+
                        </span>
                    )
                ) : (
                    ""
                )}
            </i>
            <div className="shopping-cart">
                <div className="shopping-cart-header">
                    <span className="lighter-text">Wishlist</span>
                    <div className="shopping-cart-total">
                        <span className="main-color-text"></span>
                    </div>
                </div>
                
                <ul className="shopping-cart-items">
                    {wishlist.length > 0 ? (
                        wishlist.slice(0, 3).map((id) => {
                            const productItem = productData.find(
                                (item) => item._id === id
                            );
                            if (productItem) {
                                const {
                                    _id,
                                    name,
                                    images,
                                    price,
                                    stockStatus,
                                } = productItem;
                                return (
                                    <li key={_id} className="clearfix">
                                        <img
                                            src={images[0]}
                                            alt="item1"
                                            width={60}
                                        />
                                        <div className="item-details">
                                            <span className="item-name">
                                                {name}
                                            </span>
                                            <span className="item-price">
                                                <span className="lighter-text">
                                                    ₹{price}
                                                </span>
                                                <span className="item-quantity">
                                                    <span
                                                        className={`badge badge-sm ${getStockTagColor(
                                                            stockStatus
                                                        )} mini-badge`}
                                                    >
                                                        {stockStatus}
                                                    </span>
                                                </span>
                                            </span>
                                        </div>
                                    </li>
                                );
                            } else {
                                return "";
                            }
                        })
                    ) : (
                        <div className="small-noitem">
                            <i className="fas fa-heart-broken"></i>
                            <p>Oops no item here!!!</p>
                        </div>
                    )}
                </ul>

                <button className="button">Checkout</button>
            </div>
        </>
    );
}
function CartDropDown() {
    const {
        dataState: { cart, productData },
    } = useDataContext();
    return (
        <>
            <i className="icon">
                <ShoppingCartOutlinedIcon style={{ fontSize: "1.2rem" }} />
                {cart.length > 0 ? (
                    cart.length < 10 ? (
                        <span class="badge badge-sm primary br-round top right">
                            {cart.length}
                        </span>
                    ) : (
                        <span class="badge badge-sm primary br-round top count-9 right">
                            9+
                        </span>
                    )
                ) : (
                    ""
                )}
            </i>
            <div className="shopping-cart">
                <div className="shopping-cart-header">
                    {/* <i className="fa fa-shopping-cart cart-icon"></i> */}
                    <span className="lighter-text">Total</span>
                    {/* <span className="badge">3</span> */}
                    <div className="shopping-cart-total">
                        <span className="main-color-text">
                            ₹
                            {cart.reduce((totalPrice, { _id, quantity }) => {
                                const productItem = productData.find(
                                    (item) => item._id === _id
                                );
                                if (productItem !== undefined) {
                                    return (
                                        totalPrice +
                                        productItem.price * quantity
                                    );
                                }
                                return totalPrice;
                            }, 0)}
                        </span>
                    </div>
                </div>

                <ul className="shopping-cart-items">
                    {cart.length > 0 ? (
                        cart.slice(0, 3).map(({ _id, quantity }) => {
                            const productItem = productData.find(
                                (item) => item._id === _id
                            );
                            if (productItem !== undefined) {
                                const { _id, name, images, price } =
                                    productItem;
                                // console.log(productItem);
                                return (
                                    <li key={_id} className="clearfix">
                                        <img src={images[0]} alt="item1" />
                                        <div className="item-details">
                                            <span className="item-name">
                                                {name}
                                            </span>
                                            <span className="item-price">
                                                <span className="lighter-text">
                                                    ₹{price}
                                                </span>
                                                <span className="item-quantity">
                                                    &times; {quantity}
                                                </span>
                                            </span>
                                        </div>
                                    </li>
                                );
                            } else {
                                return "";
                            }
                        })
                    ) : (
                        <div className="small-noitem">
                            <i className="fas fa-cart-plus"></i>
                            <p>Oops no item here!!!</p>
                        </div>
                    )}
                </ul>

                <button className="button">
                    Checkout
                </button>
            </div>
        </>
    );
}
export function NavBar({ setSearchDisplay }) {
    const [navSwitch, setNavSwitch] = useState("none");
    const [navAnimation, setNavAnimation] = useState("0");
    const { toastListDispatch } = useToastContext();
    const {
        authDispatch,
        authState: { isLoggedIn },
    } = useAuthContext();
    useEffect(() => {
        const interval = setTimeout(() => {
            setNavAnimation((navAnimation) =>
                navSwitch === "none" ? "none" : navAnimation === "1" ? "0" : "1"
            );
        }, 0);
        return () => clearTimeout(interval);
    }, [navSwitch]);
    return (
        <nav className="navbar nav-iv light mid-animation">
            <div className="nav-brand">
                <img src={logoImg} alt={"logo-img"}/>
                <p>
                    <strong>GOOD</strong>TIMES
                </p>
                <button
                    id="ham-icon"
                    onClick={() => {
                        setNavSwitch((navSwitch) => {
                            return navSwitch === "open" ? "close" : "open";
                        });
                    }}
                >
                    &#8801;
                </button>
            </div>
            <div className="links-container" animation={navAnimation}>
                <ul className="links" style={{}}>
                    <NavLink
                        to="/"
                        onClick={() => {
                            setNavSwitch((navSwitch) => {
                                return navSwitch === "open" ? "close" : "open";
                            });
                        }}
                        className="link"
                        end
                    >
                        Home
                        <hr />
                    </NavLink>
                    <li
                        className="link"
                        onClick={() => {
                            setNavSwitch((navSwitch) => {
                                return navSwitch === "open" ? "close" : "open";
                            });
                        }}
                    >
                        About
                        <hr />
                    </li>
                    <NavLink
                        to="/shop"
                        onClick={() => {
                            setNavSwitch((navSwitch) => {
                                return navSwitch === "open" ? "close" : "open";
                            });
                        }}
                        className="link"
                    >
                        Shop
                        <hr />
                    </NavLink>
                    <li
                        className="link"
                        onClick={() => {
                            setNavSwitch((navSwitch) => {
                                return navSwitch === "open" ? "close" : "open";
                            });
                        }}
                    >
                        Contact
                        <hr />
                    </li>
                </ul>
                <ul
                    className="links"
                    style={{}}
                    onClick={() => {
                        setNavSwitch((navSwitch) => {
                            return navSwitch === "open" ? "close" : "open";
                        });
                    }}
                >
                    <li
                        className="link"
                        onClick={() =>
                            setSearchDisplay((searchDisplay) => {
                                return searchDisplay === "open"
                                    ? "close"
                                    : "open";
                            })
                        }
                    >
                        <i className="icon">
                            <SearchOutlinedIcon
                                style={{ fontSize: "1.27rem" }}
                            />
                        </i>
                    </li>
                    <NavLink className="link" to="/wishlist">
                        <WishListDropDown />
                    </NavLink>
                    {isLoggedIn && (
                        <NavLink className="link" to="/cart">
                            <CartDropDown />
                        </NavLink>
                    )}
                    {!isLoggedIn && (
                        <NavLink className="link" to="/login">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                height="25"
                                fill="rgb(82, 73, 63)"
                                stroke="rgb(82, 73, 63)"
                                stroke-width="5"
                            >
                                <path d="M255.988 32C160.473 32 78.934 91.804 46.727 176h34.639c9.396-20.484 22.457-39.35 38.868-55.762C156.497 83.973 204.709 64 255.988 64c51.286 0 99.504 19.973 135.771 56.239C428.027 156.505 448 204.719 448 256c0 51.285-19.973 99.501-56.239 135.765C355.494 428.029 307.275 448 255.988 448c-51.281 0-99.493-19.971-135.755-56.234-16.412-16.412-29.473-35.28-38.871-55.766H46.725c32.206 84.201 113.746 144 209.264 144C379.703 480 480 379.715 480 256c0-123.702-100.297-224-224.012-224z" />
                                <path d="M206.863 323.883l22.627 22.627L320 256l-90.51-90.51-22.628 22.628L258.745 240H32v32h226.745z" />
                            </svg>
                        </NavLink>
                    )}
                    {isLoggedIn && (
                        <li
                            className="link"
                            onClick={() => {
                                authDispatch({
                                    type: "LOGIN_STATUS_UPDATE",
                                    data: {
                                        isLoggedIn: false,
                                    },
                                });
                                toastListDispatch({
                                    type: "ADD_TOAST",
                                    data: {
                                        _id: uuid(),
                                        text: `You were logged out successfully!!!`,
                                        type: "success",
                                    },
                                });
                                localStorage.removeItem("GOOD_TIMES_TOKEN");
                                localStorage.removeItem("GT_CART");
                                localStorage.removeItem("GT_WISHLIST");
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                height="24"
                                fill="rgb(82, 73, 63)"
                                stroke="rgb(82, 73, 63)"
                                stroke-width="9"
                            >
                                <path d="M366.863 323.883l22.627 22.627L480 256l-90.51-90.51-22.628 22.628L418.745 240H192v32h226.745z" />
                                <path d="M391.491 391.766C355.229 428.029 307.018 448 255.736 448c-51.287 0-99.506-19.971-135.772-56.235C83.697 355.501 64 307.285 64 256c0-51.281 19.697-99.495 55.965-135.761C156.232 83.973 204.45 64 255.736 64c51.279 0 99.491 19.973 135.755 56.238a196.044 196.044 0 0 1 7.333 7.762h40.731c-40.474-58.028-107.709-96-183.819-96C132.021 32 32 132.298 32 256c0 123.715 100.021 224 223.736 224 76.112 0 143.35-37.97 183.822-96h-40.73a194.792 194.792 0 0 1-7.337 7.766z" />
                            </svg>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
