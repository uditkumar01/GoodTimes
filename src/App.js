import "./App.css";
import { useEffect, useState } from "react";
import { AllRoutes } from "./routes/routeClusters/Router";
import { useDataContext } from "./context/dataProvider/DataProvider";
import axios from "axios";
import { Loading } from "./routes/loading/Loading";
import { Toast } from "./component";
import { useAuthContext } from "./context/authProvider/AuthProvider";

function App() {
    const {
        dataState: { productData, pageNo, categoryData, cart, wishlist },
        dataDispatch,
    } = useDataContext();
    const {
        authState: { isLoggedIn, current_user },
        authDispatch,
    } = useAuthContext();
    const [searchDisplay, setSearchDisplay] = useState("none");
    const [loading, setLoading] = useState(true);
    async function fetchData() {
        const res = await axios.get(
            "https://mockData.uditkumar01.repl.co/products?page=0"
        );
        // console.log(res.data.products);
        dataDispatch({
            type: "PRODUCT",
            data: {
                productData: [...productData, ...res.data.products],
                pageNo: pageNo + 1,
            },
        });

        setLoading(false);
    }

    async function fetchCategoriesData() {
        const res = await axios.get(
            "https://mockdata.uditkumar01.repl.co/categories"
        );

        dataDispatch({
            type: "CATEGORY",
            data: {
                categoryData: res.data.categories,
            },
        });
    }

    async function updateUserWishlistAndCartData() {
        // console.log(current_user,"id");
        if (current_user._id) {
            try {
                const res = await axios.post(
                    `https://mockdata.uditkumar01.repl.co/user/${current_user._id}`,
                    {
                        data: {
                            wishList: wishlist,
                            cart,
                        },
                    }
                );

                authDispatch({
                    type: "CURRENT_USER_UPDATE",
                    data: {
                        current_user: {
                            _id: res.data.user._id,
                            name: res.data.user.name,
                            email: res.data.user.email,
                        },
                    },
                });
            } catch (err) {
                console.log(err.message, current_user._id);
            }
        }
    }

    useEffect(() => {
        if (categoryData !== []) {
            fetchCategoriesData();
        }
        if (productData !== []) {
            fetchData();
        }

        if (!isLoggedIn) {
            if (localStorage.getItem("GOOD_TIMES_LOGIN") === "true") {
                authDispatch({
                    type: "LOGIN_STATUS_UPDATE",
                    data: {
                        isLoggedIn: true,
                    },
                });
            }
        }

        let local_current_user = localStorage.getItem("GOOD_TIMES_USER");

        if (local_current_user) {
            local_current_user = JSON.parse(local_current_user);
            if (Object.keys(local_current_user).length > 0) {
                authDispatch({
                    type: "CURRENT_USER_UPDATE",
                    data: {
                        current_user: local_current_user,
                    },
                });
            }
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            localStorage.setItem("GOOD_TIMES_LOGIN", true);
        } else {
            localStorage.removeItem("GOOD_TIMES_LOGIN");
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (Object.keys(current_user).length > 0) {
            localStorage.setItem(
                "GOOD_TIMES_USER",
                JSON.stringify(current_user)
            );
        }
    }, [current_user]);

    // get cart and wishlist data from localStorage if exists
    useEffect(() => {
        let localCartData = localStorage.getItem("GT_CART");
        let localWisllistData = localStorage.getItem("GT_WISHLIST");
        // console.log(localStorage.getItem("GT_CART"), "here");
        if (localCartData) {
            localCartData = JSON.parse(localCartData);
            if (localCartData.length > 0) {
                dataDispatch({
                    type: "CART",
                    data: { cart: [...localCartData] },
                });
            }
        }
        if (localWisllistData) {
            localWisllistData = JSON.parse(localWisllistData);
            if (localWisllistData.length > 0) {
                dataDispatch({
                    type: "WISHLIST",
                    data: { wishlist: [...localWisllistData] },
                });
            }
        }
    }, []);

    // cart localStorage useEffect handler
    useEffect(() => {
        localStorage.setItem("GT_CART", JSON.stringify(cart));
        // console.log("cart local", cart);
    }, [cart]);

    // wishlist localStorage useEffect handler
    useEffect(() => {
        // console.log("wishlist local", wishlist);
        localStorage.setItem("GT_WISHLIST", JSON.stringify(wishlist));
    }, [wishlist]);

    // updating wishlist and cart of user on online database
    useEffect(() => {
        console.log("updating");
        updateUserWishlistAndCartData();
    }, [wishlist, cart]);
    // console.log(productData,"app");
    return (
        <div className="App">
            <Toast />
            {loading ? (
                <Loading loading={loading} setLoading={setLoading} />
            ) : (
                ""
            )}
            <AllRoutes
                searchDisplay={searchDisplay}
                setSearchDisplay={setSearchDisplay}
            />
        </div>
    );
}

export default App;
