import { createContext, useContext, useReducer } from "react";
import { authReducer } from "../../reducer/AuthReducer";
import { loginUser, signUpUser } from "./AuthHandlers";

const AuthContext = createContext();

export function useAuthContext() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [authState, authDispatch] = useReducer(authReducer, {
        current_user: {},
        isLoggedIn: false,
    });
    return (
        <AuthContext.Provider value={{ authState, authDispatch, loginUser, signUpUser }}>
            {children}
        </AuthContext.Provider>
    );
}
