import { Products, Sidebar } from "../../component";
import { useEffect, useState } from "react";
import { useDataContext } from "../../context/dataProvider/DataProvider";
import { LoadMore } from "../../component/loadMore/LoadMore";
import axios from "axios";
import { NavLink, useLocation } from "react-router-dom";
export function Shop() {
    const [sidebarDisplay, setSidebarDisplay] = useState("none");
    const { search } = useLocation();
    const {
        dataState: { productData, pageNo, allProductsLoaded },
        dataDispatch,
    } = useDataContext();
    const [miniLoading, setMiniLoading] = useState(false);

    async function fetchData() {
        const res = await axios.get(
            `https://mockData.uditkumar01.repl.co/products?page=${pageNo}`
        );
        if (res.data.products === [] || res.data.products.length < 10) {
            dataDispatch({
                type: "PRODUCT",
                data: {
                    productData: [...productData, ...res.data.products],
                    pageNo: pageNo + 1,
                    allProductsLoaded: true,
                },
            });
        } else {
            dataDispatch({
                type: "PRODUCT",
                data: {
                    productData: [...productData, ...res.data.products],
                    pageNo: pageNo + 1,
                },
            });
        }

        setMiniLoading(() => false);

    }
    const handleScroll = () => {
        const belowContentElement = document.getElementsByClassName(
            "below-content"
        )[0];
        if (belowContentElement) {
            const fixedHeightFromTop = Math.ceil(
                belowContentElement.getBoundingClientRect().height
            );
            const fixedHeightOfContainer = belowContentElement.scrollHeight;
            const currentScrollPostition = belowContentElement.scrollTop;
            if (
                currentScrollPostition >=
                fixedHeightOfContainer - fixedHeightFromTop
            ) {
                setMiniLoading(() => true);
                fetchData();
            }
        }
    };

    useEffect(()=>{
        window.scrollTo({
            top:0,
            left:0,
            behavior:"smooth"
        });
    },[]);

    return (
        <>
            <div className="body-content shop">
                <button
                    class="btn-float bottom right icon-btn btn-custom br-round b-solid btn-bounce"
                    onClick={() =>
                        setSidebarDisplay((sidebarDisplay) => {
                            return sidebarDisplay === "open" ? "close" : "open";
                        })
                    }
                >
                    <i class="fas fa-filter"></i>
                </button>
                <Sidebar
                    sidebarDisplay={sidebarDisplay}
                    setSidebarDisplay={setSidebarDisplay}
                />
                <div
                    className="below-content"
                    onScroll={() => {
                        if (!allProductsLoaded) {
                            handleScroll();
                        }
                    }}
                >
                    <br />
                    <div className="shop-page-details">
                        <div className="on-left">
                            <NavLink to="/">
                                <p>Home</p>
                            </NavLink>
                            <i class="fas fa-angle-right"></i>
                            <NavLink to="/shop">
                                <p>Shop</p>
                            </NavLink>
                        </div>
                        <div className="on-right">
                            <p>Showing 1-{productData.length} of 198 results</p>
                        </div>
                    </div>
                    <Products
                        headingVisiblility={false}
                        category={
                            search !== ""
                                ? search
                                    .slice(1)
                                    .split("&")
                                    .map((item) => {
                                        const [query, value] = item.split(
                                            "="
                                        );
                                        return { query, value };
                                    })
                                : undefined
                        }
                    />
                    {miniLoading ? <LoadMore /> : ""}
                </div>
            </div>
        </>
    );
}
