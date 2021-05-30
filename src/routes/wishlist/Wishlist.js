import { NavLink } from "react-router-dom";
import { Footer, ProductBanners, Products } from "../../component";
import { useDataContext } from "../../context/dataProvider/DataProvider";
import { WishlistItem, WishlistItemSm } from "./WishlistItem";
export function Wishlist() {
    const {
        dataDispatch,
        dataState: { wishlist, cart, productData },
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
                        <NavLink to="/wishlist">
                            <p>Wishlist</p>
                        </NavLink>
                    </div>
                    <span>
                        <button
                            className="btn btn-sm danger br-1"
                            onClick={() => {
                                dataDispatch({
                                    type: "WISHLIST_UPDATE",
                                    data: { wishlist: [] },
                                });
                            }}
                        >
                            Remove all
                    </button>{" "}
                        <button
                            className="btn btn-sm btn-custom br-1"
                            onClick={() => {
                                dataDispatch({
                                    type: "WISHLIST_UPDATE",
                                    data: {
                                        wishlist: [],
                                        cart: [
                                            ...cart,
                                            ...wishlist
                                                .filter(
                                                    (id) =>
                                                        !cart.some(
                                                            (item) =>
                                                                item._id === id
                                                        )
                                                )
                                                .map((_id) => ({
                                                    _id,
                                                    quantity: 1,
                                                })),
                                        ],
                                    },
                                });
                            }}
                        >
                            Move all to Cart
                    </button>
                    </span>
                </div>
                <div className="cart-content">
                    {wishlist.length > 0 ? (
                        <table className="cart-table">
                            <tr className="cart-row">
                                <th className="cart-heading"></th>
                                <th className="cart-heading"></th>
                                <th className="cart-heading">Product</th>
                                <th className="cart-heading">Price</th>
                                <th className="cart-heading">Stock Status</th>
                                <th className="cart-heading"></th>
                            </tr>

                            {wishlist.map((id) => {
                                const productItem = productData.find(
                                    (item) => item._id === id
                                );
                                if (productItem) {
                                    return (
                                        <WishlistItem key={id} {...productItem} />
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
                                    <i className="fas fa-heart-broken noicon"></i>{" "}
                                    <p className="noitem"> OOPS NO ITEMS HERE!!!</p>
                                </th>
                            </tr>
                        </table>
                    )}

                    {wishlist.length > 0 ? (
                        <div className="cart-table table-sm">
                            {wishlist.map((id) => {
                                const productItem = productData.find(
                                    (item) => item._id === id
                                );
                                if (productItem) {
                                    return (
                                        <WishlistItemSm key={id} {...productItem} />
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
                                    <i className="fas fa-heart-broken noicon sm"></i>{" "}
                                    <p className="noitem sm"> OOPS NO ITEMS HERE!!!</p>
                                </th>
                            </tr>
                        </table>
                    )}
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
