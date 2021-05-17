import CloseIcon from "@material-ui/icons/Close";
import { NavLink } from "react-router-dom";
import { getStockTagColor } from "../../component/utils/Utils";
import { useDataContext } from "../../context/dataProvider/DataProvider";
export function WishlistItem({ _id, name, images, stockStatus, price }) {
    const {
        dataDispatch,
        dataState: { cart, wishlist },
    } = useDataContext();
    return (
        <tr className="cart-row">
            <td className="cart-item">
                <button
                    className="cart-table-close"
                    onClick={() => {
                        dataDispatch({
                            type: "WISHLIST_UPDATE",
                            data: {
                                wishlist: wishlist.filter((id) => id !== _id),
                            },
                        });
                    }}
                >
                    <span>
                        <CloseIcon style={{ fontSize: "0.85rem" }} />
                    </span>
                </button>
            </td>
            <td className="cart-item">
                <NavLink to={`/products/${_id}`}>
                    <div
                        className="cart-item-img"
                        style={{ backgroundImage: `url(${images[0]})` }}
                    ></div>
                </NavLink>
            </td>
            <td className="cart-item" style={{ maxWidth: "200px" }}>
                <NavLink to={`/products/${_id}`}>
                    <p>{name}</p>
                </NavLink>
            </td>
            <td className="cart-item">
                <p>₹{price}</p>
            </td>
            <td className="cart-item">
                <span class={`badge badge-sm ${getStockTagColor(stockStatus)} br-3`}>{stockStatus}</span>
            </td>
            <td className="cart-item">
                <button
                    className="btn btn-sm btn-custom responsive-btn"
                    onClick={() => {
                        dataDispatch({
                            type: "WISHLIST_UPDATE",
                            data: {
                                wishlist: wishlist.filter(
                                    (item) => item !== _id
                                ),
                                cart: [
                                    ...cart,
                                    cart.some((item) => item._id === _id)
                                        ? { _id, quantity: 1 }
                                        : {},
                                ],
                            },
                        });
                    }}
                >
                    Add to Cart
                </button>
            </td>
        </tr>
    );
}

export function WishlistItemSm({ _id, name, images, stockStatus, price }) {
    const {
        dataDispatch,
        dataState: { cart, wishlist },
    } = useDataContext();
    return (
        <div className="cart-row">
            <div className="cart-item">
                <button
                    className="cart-table-close"
                    onClick={() => {
                        dataDispatch({
                            type: "WISHLIST_UPDATE",
                            data: {
                                wishlist: wishlist.filter((id) => id !== _id),
                            },
                        });
                    }}
                >
                    <span>
                        <CloseIcon
                            style={{
                                fontSize: "0.85rem",
                            }}
                        />
                    </span>
                </button>
                <NavLink to={`/products/${_id}`}>
                    <div
                        className="cart-item-img"
                        style={{ backgroundImage: `url(${images[0]})` }}
                    ></div>
                </NavLink>
                <div className="item-details">
                    <div className="item-basic-details">
                        <NavLink to={`/products/${_id}`}>
                            <h6>{name}</h6>
                        </NavLink>
                        <p>
                            <span
                                class={`badge badge-sm ${getStockTagColor(
                                    stockStatus
                                )} mini-badge br-3`}
                            >
                                {stockStatus}
                            </span>
                        </p>
                    </div>

                    <div className="total-price-details">
                        <p>₹{price}</p>
                        <button
                            className="btn btn-sm btn-custom responsive-btn"
                            onClick={() => {
                                dataDispatch({
                                    type: "WISHLIST_UPDATE",
                                    data: {
                                        wishlist: wishlist.filter(
                                            (item) => item !== _id
                                        ),
                                        cart: [
                                            ...cart,
                                            cart.some(
                                                (item) => item._id === _id
                                            )
                                                ? {
                                                      _id,
                                                      quantity: 1,
                                                  }
                                                : {},
                                        ],
                                    },
                                });
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
