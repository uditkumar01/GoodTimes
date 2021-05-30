import { useDataContext } from "../../context/dataProvider/DataProvider";

export function CartTotalCard() {
    const {
        dataState: { productData, cart },
    } = useDataContext();
    let allFreeShipping = true;
    const subtotal = cart.reduce((totalSum, { _id, quantity }) => {
        const prod = productData.find((prod) => prod._id === _id);
        if(prod && !prod.freeDelivery){
            allFreeShipping = false;
        }
        return prod ? totalSum + quantity * prod.price : totalSum;
    }, 0);
    const tax = Math.floor(Math.random() * 100) + 100.36;
    let shipping = Math.floor(Math.random() * 100) + 200.64;
    if(allFreeShipping){
        shipping = 0;
    }
    return (
        <table className="cart-totals">
            <tr className="cart-totals-item">
                <td className="line">
                    <span className="heading-main">
                        <h6>Cart totals</h6>
                    </span>
                </td>
            </tr>
            <tr className="cart-totals-item">
                <td>
                    <span className="heading">
                        <h6>Subtotal</h6>
                    </span>
                    <span className="content-text">
                        <p>₹{subtotal}</p>
                    </span>
                </td>
            </tr>
            <tr className="cart-totals-item">
                <td>
                    <span className="heading">
                        <h6>Shipping</h6>
                    </span>
                    <span className="content-text">
                        <p>₹{shipping}</p>
                    </span>
                </td>
            </tr>
            <tr className="cart-totals-item">
                <td className="line-last">
                    <span className="heading">
                        <h6>Tax</h6>
                    </span>
                    <span className="content-text">
                        <p>₹{tax}</p>
                    </span>
                </td>
            </tr>
            <tr className="cart-totals-item">
                <td>
                    <span className="heading">
                        <h6>Total</h6>
                    </span>
                    <span className="content-text">
                        <p className="main-price">
                            ₹{Math.round(subtotal + shipping + tax)}
                        </p>
                    </span>
                </td>
            </tr>
        </table>
    );
}
