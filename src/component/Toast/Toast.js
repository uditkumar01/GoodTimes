import { useToastContext } from "../../context/toastProvider/ToastProvider";
import { ToastItem } from "./ToastItem";

export function Toast() {
    const {
        toastListState: { toastList },
    } = useToastContext();
    return (
        <div className="alert-container">
            {toastList.map((item) => {
                return <ToastItem key={item.id} {...item} />;
            })}
        </div>
    );
}
