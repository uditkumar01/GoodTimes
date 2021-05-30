import { useEffect, useState } from "react";
import { useToastContext } from "../../context/toastProvider/ToastProvider";

export function ToastItem({ _id, text, type }) {
    const [width, setWidth] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [exitToast, setExitToast] = useState(false);
    const {
        toastListState: { toastList },
        toastListDispatch,
    } = useToastContext();

    const handleExitToast = () => {
        console.log("exiting", intervalId, text, width, toastList);
        handleClearInterval();
        setExitToast(true);
        const timeOutId = setTimeout(() => {
            toastListDispatch({
                type: "REMOVE_TOAST",
                data: {
                    _id,
                },
            });
        }, 800);
        return () => clearTimeout(timeOutId);
    };

    useEffect(() => {
        if (width === 100) {
            handleExitToast();
        }
    }, [width]);

    const handleStartToast = () => {
        const id = setInterval(() => {
            setWidth((prevWidth) => {
                if (prevWidth < 100) {
                    return 0.5 + prevWidth;
                }
                return prevWidth;
            });
        }, 20);
        // console.log("hi");
        setIntervalId(() => id);
    };

    const handleClearInterval = () => {
        clearInterval(intervalId);
    };

    useEffect(() => {
        handleStartToast();
    }, []);
    return (
        <div
            className={`alert alert-sm ${type}`}
            onMouseEnter={handleClearInterval}
            onMouseLeave={handleStartToast}
            animation={exitToast ? "0" : "1"}
        >
            <span
                className={"alert-bottom-line"}
                style={{
                    width: `${width}%`,
                }}
            >
                <i></i>
            </span>
            <div className="alert-header">
                <span className="alert-icon">
                    <i className="fas fa-info-circle"></i>
                </span>
                <span className="alert-text">{text}</span>
                <span className="close-btn" onClick={handleExitToast}>&times;</span>
            </div>
        </div>
    );
}
