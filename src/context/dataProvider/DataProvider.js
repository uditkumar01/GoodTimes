import { createContext, useContext, useReducer } from "react";
import { dataReducer } from "../../reducer/dataReducer";

const DataContext = createContext(null);

export function useDataContext() {
    return useContext(DataContext);
}

export function DataProvider({ children }) {
    const [dataState, dataDispatch] = useReducer(dataReducer, {
        productData: [],
        pageNo: 0,
        cart: [],
        wishlist: [],
        allProductsLoaded: false,
        colorSet: {},
        minimumPrice: 0,
        maximumPrice: 0,
        currentPrice: 0,
        categoryData: [],
        filters: {
            sortBy: "LTH",
            inStock: false,
            freeDelivery: false,
        },
    });
    // console.log(dataState);
    return (
        <DataContext.Provider value={{ dataState, dataDispatch }}>
            {children}
        </DataContext.Provider>
    );
}
