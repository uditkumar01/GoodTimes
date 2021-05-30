import CloseIcon from "@material-ui/icons/Close";
import CallMadeIcon from "@material-ui/icons/CallMade";
import { useEffect, useState } from "react";
import { useDataContext } from "../../context/dataProvider/DataProvider";
import { getStockTagColor } from "../utils/Utils";
import { NavLink } from "react-router-dom";
function SearchFieldItem({
    _id,
    name,
    stockStatus,
    images,
    setSearchText,
    setSearchDisplay,
}) {
    return (
        <NavLink
            to={`/products/${_id}`}
            onClick={() => {
                setSearchDisplay(false);
                setSearchText("");
            }}
        >
            <li className="search-item">
                <div
                    class="search-item-img"
                    style={{ backgroundImage: `url(${images[0]})` }}
                ></div>

                <div class="search-item-content">
                    <p>{name}</p>
                    <span className="search-item-content-type">
                        <small>
                            <span
                                className={`badge badge-sm primary mini-badge`}
                            >
                                Watches
                            </span>{" "}
                            <span
                                className={`badge badge-sm ${getStockTagColor(
                                    stockStatus
                                )} mini-badge`}
                            >
                                {stockStatus}
                            </span>
                        </small>
                    </span>
                </div>
                <div class="search-item-icon">
                    <CallMadeIcon
                        style={{
                            color: "var(--black-color-200)",
                            transform: "rotateZ(45deg)",
                        }}
                    />
                </div>
            </li>
        </NavLink>
    );
}
export function SearchField({ searchDisplay, setSearchDisplay }) {
    const [animation, setAnimation] = useState("none");
    const [searchText, setSearchText] = useState("");
    const [intervalId, setintervalId] = useState(null);
    const handleStartTimer = (event) => {
        if (intervalId) {
            handleExitTimer();
        }
        const id = setTimeout(() => {
            setSearchText(event.target.value);
            handleExitTimer();
        }, 2000);
        setintervalId(id);
    };
    const handleExitTimer = () => {
        clearTimeout(intervalId);
    };
    const {
        dataState: { productData },
    } = useDataContext();

    const filteredProductData = productData.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    // console.log(intervalId, searchText);

    useEffect(() => {
        setAnimation((animation) =>
            searchDisplay === "none" ? "none" : animation === "1" ? "0" : "1"
        );
    }, [searchDisplay]);

    return (
        <div className="search-container" animation={animation}>
            <div className="search-content">
                <span
                    className="close-search"
                    onClick={() => {
                        setSearchText("");
                        setSearchDisplay((searchDisplay) => {
                            return searchDisplay === "close" ? "open" : "close";
                        });
                    }}
                >
                    <CloseIcon />
                </span>
                <div className="search-input">
                    <div class="form-field secondary-bg bg-transparent">
                        <input
                            class="input-field"
                            type="text"
                            onChange={(event) => handleStartTimer(event)}
                            required
                        />
                        <span
                            title="No Issues Found"
                            class="fas fa-spinner dark-bg bg-inherit icon"
                        ></span>
                        <label for="input" class="form-label">
                            What are you looking for ...?
                        </label>
                        <hr />
                        <hr />
                    </div>
                </div>
                {searchText !== "" ? (
                    filteredProductData.length > 0 ? (
                        <ul className="search-result">
                            <hr className="search-hr" />
                            {filteredProductData.map((item) => {
                                return (
                                    <SearchFieldItem
                                        key={item._id}
                                        {...item}
                                        setSearchText={setSearchText}
                                        setSearchDisplay={setSearchDisplay}
                                    />
                                );
                            })}
                            <hr className="search-hr" />
                        </ul>
                    ) : (
                        <div className="search-no-results">
                            <i className="fas fa-search"></i>
                            <p>No results found ...</p>
                        </div>
                    )
                ) : (
                    <div className="search-no-results">
                        <i className="fas fa-search"></i>
                        <p>Type something to search ...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
