function sortByProductData(productData, val) {
    let sortedProductData = [];
    console.log(val);
    switch (val) {
        case "LTH":
            console.log(1);
            sortedProductData = productData.sort((a, b) => a.price - b.price);
            break;
        case "HTL":
            console.log(2);
            sortedProductData = productData.sort((a, b) => b.price - a.price);
            break;
        case "RATE":
            console.log(3);
            sortedProductData = productData.sort((a, b) => b.rating - a.rating);
            break;
        default:
            break;
    }
    return sortedProductData;
}

export function dataReducer(state, action) {
    const { currentPrice } = state;
    // console.log(action,"data");
    switch (action.type) {
        case "PRODUCT":
            const { productData } = action.data;
            const colorSet = productData.reduce((total, { color }) => {
                return {
                    ...total,
                    [color.name]: total[color.name]
                        ? { ...total[color.name] }
                        : { hex: color.hex, active: true },
                };
            }, {});
            const maximumPrice = productData[productData.length - 1].price;
            const minimumPrice = productData[0].price;

            const newState = {
                productData: sortByProductData(
                    productData,
                    state.filters.sortBy
                ),
                maximumPrice,
                minimumPrice:
                    state.minimumPrice > 0 ? state.minimumPrice : minimumPrice,
                currentPrice:
                    currentPrice === state.maximumPrice
                        ? maximumPrice
                        : currentPrice,
                colorSet,
            };

            return { ...state, ...action.data, ...newState };

        case "FILTERS_SORTBY":
            return {
                ...state,
                ...action.data,
                productData: sortByProductData(
                    state.productData,
                    action.data.filters.sortBy
                ),
            };

        default:
            return { ...state, ...(action.data ? action.data : {}) };
    }
}
