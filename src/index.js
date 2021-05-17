import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./context/dataProvider/DataProvider";
import { ToastProvider } from "./context/toastProvider/ToastProvider";
import { AuthProvider } from "./context/authProvider/AuthProvider";

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <ToastProvider>
                <DataProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </DataProvider>
            </ToastProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
