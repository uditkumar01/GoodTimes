export function authReducer(state, action) {
    // console.log("LOGIN_STATE_UPDATE", state, action);
    switch (action.type) {
        case "CREDINTIALS":
            return { ...state, ...action.data };
        case "LOGIN_STATUS_UPDATE":
            return { ...state, ...action.data };
        case "CURRENT_USER_UPDATE":
            // console.log("action data",action.data);
            return { ...state, ...action.data };
        default:
            return state;
    }
}
