export function toastReducer(state, action) {
    // console.log("in toastReducer", action);
    switch (action.type) {
        case "ADD_TOAST":
            return {
                ...state,
                toastList: [...state.toastList, { ...action.data }],
            };

        case "REMOVE_TOAST":
            return {
                ...state,
                toastList: state.toastList.filter(
                    (item) => item._id !== action.data._id
                ),
            };
        default:
            return state;
    }
}