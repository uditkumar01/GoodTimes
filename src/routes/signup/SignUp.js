import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { FormCard } from "../../component/formCard/FormCard";
import { FormField } from "../../component/formField/FormField";
import { v4 as uuid } from "uuid";
import logoImg from "../../images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    handlePasswordChars,
    handlePasswordCheckPasswordEquality,
    isEmail,
} from "../utils/Utils";
import { useAuthContext } from "../../context/authProvider/AuthProvider";
import { useToastContext } from "../../context/toastProvider/ToastProvider";
export function SignUp() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const { toastListDispatch } = useToastContext();
    const navigate = useNavigate();
    const [confirmPassword, setConfirmPassword] = useState("");
    const {
        authState: { isLoggedIn },
        authDispatch,
        signUpUser,
    } = useAuthContext();

    const handleFormSubmission = async (event) => {
        event.preventDefault();

        const { toast, type, user } = await await signUpUser(
            event.target[0].value,
            event.target[1].value,
            event.target[2].value,
            event.target[3].value
        );
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
    }, [isLoggedIn]);
    // console.log(name, email, password, confirmPassword);

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
                        label={"Name"}
                        textFilter={(checkText) => {
                            const re = new RegExp(/^[A-z\s]*$/gi);
                            return re.test(checkText);
                        }}
                        setFieldText={setName}
                        field={name}
                        type={"text"}
                    />

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

                    <FormField
                        label={"Confirm Password"}
                        textFilter={(checkText) => {
                            return true;
                        }}
                        setFieldText={setConfirmPassword}
                        field={confirmPassword}
                        error={handlePasswordCheckPasswordEquality(
                            password,
                            confirmPassword
                        )}
                        type={"password"}
                    />
                </div>
                <div className="login-lower-part">
                    <NavLink to="/login">
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
