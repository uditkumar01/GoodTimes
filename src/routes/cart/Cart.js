import { NavLink } from "react-router-dom";
import { Footer, ProductBanners, Products } from "../../component/index";
import { useDataContext } from "../../context/dataProvider/DataProvider";
import { CartItem, CartItemSm } from "./CartItem";
import { CartTotalCard } from "./CartTotalCard";
export function Cart() {
    const {
        dataDispatch,
        dataState: { productData, cart },
    } = useDataContext();
    return (
        <>
            <div className="cart-container">
                <br />
                <div className="shop-page-details cart">
                    <div className="on-left">
                        <NavLink to="/">
                            <p>Home</p>
                        </NavLink>
                        <i class="fas fa-angle-right"></i>
                        <NavLink to="/shop">
                            <p>Shop</p>
                        </NavLink>
                        <i class="fas fa-angle-right"></i>
                        <NavLink to="/cart">
                            <p>Cart</p>
                        </NavLink>
                    </div>
                    <span>
                        <button
                            className="btn btn-sm danger br-1"
                            onClick={() => {
                                dataDispatch({
                                    type: "CART_UPDATE",
                                    data: { cart: [] },
                                });
                            }}
                        >
                            Remove all
                    </button>{" "}
                        <button className="btn btn-sm btn-custom br-1">
                            Purchase all
                    </button>
                    </span>
                </div>
                <div className="cart-content">
                    {cart.length > 0 ? (
                        <table className="cart-table">
                            <tr className="cart-row">
                                <th className="cart-heading"></th>
                                <th className="cart-heading"></th>
                                <th className="cart-heading">Product</th>
                                <th className="cart-heading">Price</th>
                                <th className="cart-heading">Quantity</th>
                                <th className="cart-heading">Total</th>
                            </tr>

                            {cart.map((item) => {
                                const productItem = productData.find(
                                    (prod) => prod._id === item._id
                                );
                                if (productItem) {
                                    return (
                                        <CartItem
                                            key={item._id}
                                            {...productItem}
                                            quantity={item.quantity}
                                        />
                                    );
                                }
                                return "";
                            })}
                        </table>
                    ) : (
                        <table className="cart-table">
                            <tr className="cart-row">
                                <th
                                    className="cart-heading text-center"
                                    colSpan="6"
                                >
                                    {" "}
                                    <i className="fas fa-cart-plus noicon"></i>{" "}
                                    <p className="noitem"> OOPS NO ITEMS HERE!!!</p>
                                </th>
                            </tr>
                        </table>
                    )}

                    {cart.length > 0 ? (
                        <div className="cart-table table-sm">
                            {cart.map((item) => {
                                const productItem = productData.find(
                                    (prod) => prod._id === item._id
                                );
                                if (productItem) {
                                    return (
                                        <CartItemSm
                                            key={item._id}
                                            {...productItem}
                                            quantity={item.quantity}
                                        />
                                    );
                                }
                                return "";
                            })}
                        </div>
                    ) : (
                        <table className="cart-table table-sm noproduct">
                            <tr className="cart-row">
                                <th
                                    className="cart-heading text-center"
                                    colSpan="6"
                                >
                                    {" "}
                                    <i className="fas fa-cart-plus noicon sm"></i>{" "}
                                    <p className="noitem sm">
                                        {" "}
                                    OOPS NO ITEMS HERE!!!
                                </p>
                                </th>
                            </tr>
                        </table>
                    )}
                    {cart.length > 0 && <CartTotalCard />}
                </div>
                <h4 className="normal-heading">
                    Products you might be interested in ..
            </h4>
                <Products headingVisiblility={false} noOfProducts={4} />
                <ProductBanners />
            </div>
            <Footer />
        </>
    );
}
