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
import { Footer } from "../../component";
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

        const { toast, type, user } = await loginUser(
            event.target[0].value,
            event.target[1].value
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
                    data: { current_user: user },
                });
            }
            navigate("/", { replace: true });
        }
    };
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/", { replace: true });
        }

    }, [isLoggedIn]);

    useEffect(()=>{
        window.scrollTo({
            top:0,
            left:0,
            behavior:"smooth"
        });
    },[]);

    return (
        <>
            <FormCard>
                <form
                    className="login-card"
                    onSubmit={async (event) => {
                        handleFormSubmission(event);
                    }}
                >
                    <div className="login-upper-part">
                        <img src={logoImg} alt={"logo-img"} />
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
                            Sign up
                    </NavLink>
                        <button type="submit" className="btn-block-custom br-round">
                            <ChevronRightIcon />
                        </button>
                    </div>
                </form>
            </FormCard>
            <Footer />
        </>
    );
}
