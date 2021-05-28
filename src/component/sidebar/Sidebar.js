import { useEffect, useState } from "react";
import { useDataContext } from "../../context/dataProvider/DataProvider";

function Colors({ colorHex: { hex, active }, colorName }) {
    const {
        dataDispatch,
        dataState: { colorSet },
    } = useDataContext();
    return (
        <li className="color-item">
            <div className="form-field success-bg bg-inherit">
                <label className="radio-label">
                    <input
                        type="radio"
                        name={hex}
                        className="input-radio"
                        checked={active}
                        onClick={() => {
                            dataDispatch({
                                type: "COLORSET",
                                data: {
                                    colorSet: {
                                        ...colorSet,
                                        [colorName]: { hex, active: !active },
                                    },
                                },
                            });
                        }}
                    />
                    <span
                        className="radio-outer-circle"
                        style={{
                            borderColor: hex,
                        }}
                    >
                        <p
                            className="radio-inner-circle"
                            style={{
                                borderColor: hex,
                            }}
                        ></p>
                    </span>
                    <small>{colorName}</small>
                </label>
            </div>
        </li>
    );
}

export function Sidebar({ sidebarDisplay, setSidebarDisplay }) {
    const {
        dataState: {
            minimumPrice,
            maximumPrice,
            currentPrice,
            colorSet,
            filters: { sortBy, inStock, freeDelivery },
        },
        dataDispatch,
    } = useDataContext();

    const [animation, setAnimation] = useState("none");
    const sortByData = [
        { id: "RATE", text: "Sort by rating" },
        {
            id: "LTH",
            text: "Sort by price low to high",
        },
        {
            id: "HTL",
            text: "Sort by price high to low",
        },
    ];
    useEffect(() => {
        if (sidebarDisplay !== "none") {
            setAnimation((animation) => {
                return animation === "1" ? "0" : "1";
            });
        }
    }, [sidebarDisplay]);

    const [colorCollapsible, setColorCollapsible] = useState(true);
    const [othersCollapsible, setOthersCollapsible] = useState(true);
    const [sortBySelect, setSortBySelect] = useState(false);

    function priceSetter(event) {
        const val = event.target.value;
        const regexPrice = new RegExp(/\d+$/);
        if (!val) {
            dataDispatch({
                type: "PRICE",
                data: { currentPrice: minimumPrice },
            });
        } else if (regexPrice.test(val) && minimumPrice <= parseInt(val, 10)) {
            dataDispatch({ type: "PRICE", data: { currentPrice: val } });
        }
    }
    return (
        <div className="sidebar-container" animation={animation}>
            <div className="sidebar">
                <br className="sidebar-nav-void" />
                <div className="features">
                    <div className="feature-heading">
                        <span className="filter-content">
                            <h3 className="heading">
                                <button
                                    className="btn btn-custom back-btn"
                                    onClick={() =>
                                        setSidebarDisplay((sidebarDisplay) => {
                                            return sidebarDisplay === "open"
                                                ? "close"
                                                : "open";
                                        })
                                    }
                                >
                                    <i className="fas fa-arrow-left"></i>
                                </button>
                            </h3>
                            <button className="btn btn-md br-1">Filters</button>
                        </span>
                        {/* for feature tags */}
                        <span className="feature-tags">
                        {/* <span className="tag tag-sm custom br-3 info">
                                <span className="close-btn">&times;</span>
                                <small className="tag-text">hello</small>
                            </span> */}
                        </span>
                    </div>
                </div>
                <div className="features">
                    <div className="feature-item">
                        <p className="heading">Price</p>
                        <div className="bidirectional-range">
                            <input
                                className="min-range"
                                type="range"
                                min={minimumPrice}
                                max={maximumPrice}
                                value={currentPrice}
                                step="10"
                                onChange={(event) => priceSetter(event)}
                            />
                        </div>
                        <div className="price-inputs">
                            <input
                                className="min-price"
                                value={minimumPrice}
                                type="text"
                                readOnly
                            />
                            {"to"}
                            <input
                                className="min-price"
                                value={currentPrice}
                                onChange={(event) => priceSetter(event)}
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="feature-item">
                        <div className="dropdown m-8">
                            <button
                                className="btn btn-block btn-custom br-3 btn-flex"
                                href=""
                                onClick={() =>
                                    setSortBySelect(
                                        (sortBySelect) => !sortBySelect
                                    )
                                }
                            >
                                <p>
                                    {
                                        sortByData.find(
                                            ({ id }) => id === sortBy
                                        ).text
                                    }
                                </p>
                                <span className="fas fa-sort ml-9"></span>
                            </button>

                            <div
                                className="dropdown-menu"
                                style={sortBySelect ? {} : { display: "none" }}
                            >
                                {sortByData.map(({ id, text }) => {
                                    return (
                                        <button
                                            className="dropdown-item"
                                            href="#"
                                            key={id}
                                            onClick={() => {
                                                dataDispatch({
                                                    type: "FILTERS_SORTBY",
                                                    data: {
                                                        filters: {
                                                            inStock,
                                                            freeDelivery,
                                                            sortBy: id,
                                                        },
                                                    },
                                                });
                                                setSortBySelect(() => false);
                                            }}
                                        >
                                            {text}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="feature-item">
                        <ul className="features-list">
                            <li className="feature-colors">
                                <div
                                    className="upper-collapsible"
                                    onClick={() =>
                                        setColorCollapsible(
                                            (colorCollapsible) =>
                                                !colorCollapsible
                                        )
                                    }
                                >
                                    <h4>Colors</h4>
                                    <span
                                        className={`fas fa-chevron-${
                                            colorCollapsible ? "down" : "up"
                                        }`}
                                    ></span>
                                </div>
                                <ul
                                    className="lower-collapsible"
                                    style={
                                        colorCollapsible
                                            ? {}
                                            : { display: "none" }
                                    }
                                >
                                    {Object.keys(colorSet).map((item) => {
                                        return (
                                            <Colors
                                                key={item}
                                                colorHex={colorSet[item]}
                                                colorName={item}
                                            />
                                        );
                                    })}
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="feature-item">
                        <ul className="features-list">
                            <li className="feature-colors">
                                <div
                                    className="upper-collapsible"
                                    onClick={() =>
                                        setOthersCollapsible(
                                            (othersCollapsible) =>
                                                !othersCollapsible
                                        )
                                    }
                                >
                                    <h4>Others</h4>
                                    <span
                                        className={`fas fa-chevron-${
                                            othersCollapsible ? "down" : "up"
                                        }`}
                                    ></span>
                                </div>
                                <ul
                                    className="lower-collapsible"
                                    style={
                                        othersCollapsible
                                            ? {}
                                            : { display: "none" }
                                    }
                                >
                                    <div
                                        className="form-field secondary-bg bg-inherit"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            dataDispatch({
                                                type: "FILTERS",
                                                data: {
                                                    filters: {
                                                        inStock: !inStock,
                                                        freeDelivery,
                                                        sortBy,
                                                    },
                                                },
                                            });
                                        }}
                                    >
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                className="input-checkbox"
                                                checked={inStock}
                                            />
                                            <p className="tick-icon"></p>
                                            <small className="checkbox-label-text">
                                                In Stock
                                            </small>
                                        </label>
                                    </div>
                                    <div
                                        className="form-field secondary-bg bg-inherit"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            dataDispatch({
                                                type: "FILTERS",
                                                data: {
                                                    filters: {
                                                        freeDelivery:
                                                            !freeDelivery,
                                                        inStock,
                                                        sortBy,
                                                    },
                                                },
                                            });
                                        }}
                                    >
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                className="input-checkbox"
                                                checked={freeDelivery}
                                            />
                                            <p className="tick-icon"></p>
                                            <small className="checkbox-label-text">
                                                Free delivery
                                            </small>
                                        </label>
                                    </div>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
