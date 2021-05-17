import CloseIcon from "@material-ui/icons/Close";
import { useDataContext } from "../../context/dataProvider/DataProvider";
import { useToastContext } from "../../context/toastProvider/ToastProvider";
import { v4 as uuid } from "uuid";
export function CartItem({ _id, name, price, images, quantity }) {
    const {
        dataDispatch,
        dataState: { cart },
    } = useDataContext();

    const { toastListDispatch } = useToastContext();
    return (
        <tr className="cart-row">
            <td className="cart-item">
                <button
                    className="cart-table-close"
                    onClick={() => {
                        dataDispatch({
                            type: "CART_UPDATE",
                            data: {
                                cart: cart.filter((item) => item._id !== _id),
                            },
                        });
                        toastListDispatch({
                            type: "ADD_TOAST",
                            data: {
                                _id: uuid(),
                                text: `${name} remove to cart successfully!!!`,
                                type: "info",
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
                <div
                    className="cart-item-img"
                    style={{ backgroundImage: `url(${images[0]})` }}
                ></div>
            </td>
            <td className="cart-item">
                <p>{name}</p>
            </td>
            <td className="cart-item">
                <p>₹{price}</p>
            </td>
            <td className="cart-item">
                <div className="quantity">
                    <input type="text" value={quantity} />
                    <span className="quantity-btns">
                        <button
                            className="btn btn-sm btn-custom"
                            onClick={() => {
                                dataDispatch({
                                    type: "CART_UPDATE",
                                    data: {
                                        cart: cart.map((item) => {
                                            if (item._id === _id) {
                                                return {
                                                    ...item,
                                                    quantity: item.quantity + 1,
                                                };
                                            }
                                            return { ...item };
                                        }),
                                    },
                                });
                            }}
                        >
                            +
                        </button>
                        <button
                            className="btn btn-sm btn-custom"
                            onClick={() => {
                                if (quantity > 1) {
                                    dataDispatch({
                                        type: "CART_UPDATE",
                                        data: {
                                            cart: cart.map((item) => {
                                                if (item._id === _id) {
                                                    return {
                                                        ...item,
                                                        quantity:
                                                            item.quantity - 1,
                                                    };
                                                }
                                                return { ...item };
                                            }),
                                        },
                                    });
                                } else {
                                    dataDispatch({
                                        type: "CART_UPDATE",
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
                                            text: `${name} remove to cart successfully!!!`,
                                            type: "info",
                                        },
                                    });
                                }
                            }}
                        >
                            -
                        </button>
                    </span>
                </div>
            </td>
            <td className="cart-item">
                <p>₹{price * quantity}</p>
            </td>
        </tr>
    );
}

export function CartItemSm({ _id, name, price, images, quantity }) {
    const {
        dataDispatch,
        dataState: { cart },
    } = useDataContext();
    const { toastListDispatch } = useToastContext();
    return (
        <div className="cart-row">
            <div className="cart-item">
                <button
                    className="cart-table-close"
                    onClick={() => {
                        dataDispatch({
                            type: "CART_UPDATE",
                            data: {
                                cart: cart.filter((item) => item._id !== _id),
                            },
                        });
                        toastListDispatch({
                            type: "ADD_TOAST",
                            data: {
                                _id: uuid(),
                                text: `${name} remove to cart successfully!!!`,
                                type: "info",
                            },
                        });
                    }}
                >
                    <span>
                        <CloseIcon style={{ fontSize: "0.85rem" }} />
                    </span>
                </button>
                <div
                    className="cart-item-img"
                    style={{ backgroundImage: `url(${images[0]})` }}
                ></div>
                <div className="item-details">
                    <div className="item-basic-details">
                        <h6>{name}</h6>

                        <p>₹{price}</p>
                    </div>

                    <div className="total-price-details">
                        <div className="quantity">
                            <input type="text" value={quantity} />
                            <span className="quantity-btns">
                                <button
                                    className="btn btn-sm btn-custom"
                                    onClick={() => {
                                        dataDispatch({
                                            type: "CART_UPDATE",
                                            data: {
                                                cart: cart.map((item) => {
                                                    if (item._id === _id) {
                                                        return {
                                                            ...item,
                                                            quantity:
                                                                item.quantity +
                                                                1,
                                                        };
                                                    }
                                                    return { ...item };
                                                }),
                                            },
                                        });
                                    }}
                                >
                                    +
                                </button>
                                <button
                                    className="btn btn-sm btn-custom"
                                    onClick={() => {
                                        if (quantity > 1) {
                                            dataDispatch({
                                                type: "CART_UPDATE",
                                                data: {
                                                    cart: cart.map((item) => {
                                                        if (item._id === _id) {
                                                            return {
                                                                ...item,
                                                                quantity:
                                                                    item.quantity -
                                                                    1,
                                                            };
                                                        }
                                                        return { ...item };
                                                    }),
                                                },
                                            });
                                        } else {
                                            dataDispatch({
                                                type: "CART_UPDATE",
                                                data: {
                                                    cart: cart.filter(
                                                        (item) =>
                                                            item._id !== _id
                                                    ),
                                                },
                                            });
                                            toastListDispatch({
                                                type: "ADD_TOAST",
                                                data: {
                                                    _id: uuid(),
                                                    text: `${name} remove to cart successfully!!!`,
                                                    type: "info",
                                                },
                                            });
                                        }
                                    }}
                                >
                                    -
                                </button>
                            </span>
                        </div>

                        <p>₹{price * quantity}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
