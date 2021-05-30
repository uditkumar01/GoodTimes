import { createContext, useContext, useReducer } from "react";
import { toastReducer } from "../../reducer/ToastReducer";

const ToastContext = createContext(null);

export function useToastContext(){
    return useContext(ToastContext);
}
export function ToastProvider({ children }) {
    const [toastListState, toastListDispatch] = useReducer(toastReducer, {
        toastList: [],
    });
    return (
        <ToastContext.Provider value={{ toastListState, toastListDispatch }}>
            {children}
        </ToastContext.Provider>
    );
}