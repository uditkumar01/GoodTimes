import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { FormCard } from "../../component/formCard/FormCard";
import { FormField } from "../../component/formField/FormField";
import { useAuthContext } from "../../context/authProvider/AuthProvider";
import { useToastContext } from "../../context/toastProvider/ToastProvider";
import logoImg from "../../images/logo.png";
import { useState } from "react";
import { handlePasswordChars, isEmail } from "../utils/Utils";
export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { toastListDispatch } = useToastContext();
    const navigate = useNavigate();
    const {
        authState: { isLoggedIn },
        authDispatch,
        loginUser,
    } = useAuthContext();
    const handleFormSubmission = async (event) => {
        event.preventDefault();
        // console.log(event.target[0].value, "form");
        // console.log(event.target[1].value, "form");

        const { toast, type, user } = await await loginUser(
            event.target[0].value,
            event.target[1].value
        );
        // console.log({toast, type});
        toastListDispatch({
            type: "ADD_TOAST",
            data: {
                _id: uuid(),
                text: toast,
                type: type,
            },
        });
        if (type === "success") {
            authDispatch({
                type: "LOGIN_STATUS_UPDATE",
                data: { isLoggedIn: true },
            });
            if (user) {
                console.log("setting user");
                authDispatch({
                    type: "CURRENT_USER_UPDATE",
                    data: { current_user:user },
                });
            }
            navigate("/", { replace: true });
        }
    };
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/", { replace: true });
        }
        // console.log(isLoggedIn);
        // console.log("user", user);
    }, [isLoggedIn]);

    return (
        <FormCard>
            <form
                className="login-card"
                onSubmit={async (event) => {
                    handleFormSubmission(event);
                }}
            >
                <div className="login-upper-part">
                    <img src={logoImg} />
                    <FormField
                        label={"Email"}
                        textFilter={(checkText) => {
                            return true;
                        }}
                        setFieldText={setEmail}
                        field={email}
                        type={"text"}
                        error={isEmail(email)}
                    />

                    <FormField
                        label={"Password"}
                        textFilter={(checkText) => {
                            return true;
                        }}
                        setFieldText={setPassword}
                        field={password}
                        type={"password"}
                        error={handlePasswordChars(password)}
                    />
                </div>
                <div className="login-lower-part">
                    <NavLink to="/signup">
                        <a className="">Sign up</a>
                    </NavLink>
                    <button type="submit" className="btn-block-custom br-round">
                        <ChevronRightIcon />
                    </button>
                </div>
            </form>
        </FormCard>
    );
}
