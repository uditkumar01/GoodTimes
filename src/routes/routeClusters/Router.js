import { Routes, Route } from "react-router-dom";
import { Home, Product, Cart, Wishlist, Shop } from "..";
import { Login } from "../login/Login";
import { SignUp } from "../signup/SignUp";
import { MakeCluster } from "./MakeCluster";

export function AllRoutes({ searchDisplay, setSearchDisplay }) {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <MakeCluster
                            searchDisplay={searchDisplay}
                            setSearchDisplay={setSearchDisplay}
                        >
                            <Home />
                        </MakeCluster>
                    }
                />
                <Route
                    path="/products/:productId"
                    element={
                        <MakeCluster
                            searchDisplay={searchDisplay}
                            setSearchDisplay={setSearchDisplay}
                        >
                            <Product />
                        </MakeCluster>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <MakeCluster
                            searchDisplay={searchDisplay}
                            setSearchDisplay={setSearchDisplay}
                        >
                            <Cart />
                        </MakeCluster>
                    }
                />
                <Route
                    path="/shop"
                    element={
                        <MakeCluster
                            searchDisplay={searchDisplay}
                            setSearchDisplay={setSearchDisplay}
                        >
                            <Shop />
                        </MakeCluster>
                    }
                />
                <Route
                    path="/wishlist"
                    element={
                        <MakeCluster
                            searchDisplay={searchDisplay}
                            setSearchDisplay={setSearchDisplay}
                        >
                            <Wishlist />
                        </MakeCluster>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <MakeCluster
                            searchDisplay={searchDisplay}
                            setSearchDisplay={setSearchDisplay}
                        >
                            <Login />
                        </MakeCluster>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <MakeCluster
                            searchDisplay={searchDisplay}
                            setSearchDisplay={setSearchDisplay}
                        >
                            <SignUp />
                        </MakeCluster>
                    }
                />
            </Routes>
        </>
    );
}
