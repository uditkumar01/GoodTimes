import { capitalize } from "@material-ui/core";
import * as EmailValidator from "email-validator";
import axios from "axios";
export async function loginUser(email, password) {
    if (!EmailValidator.validate(email)) {
        return {
            toast: `${email} is not valid`,
            type: "danger",
        };
    }
    if (
        !(
            password.match(/[A-Za-z]+/g) &&
            password.match(/[\d]+/g && password.length >= 8)
        )
    ) {
        if (password.length < 8) {
            return {
                toast: `Password should have minimum 8 characters.`,
            };
        }
        if (!password.match(/[A-Za-z]+/g)) {
            return {
                toast: `Password should have atleast one alphabet.`,
            };
        }
        if (!password.match(/[\d]+/g)) {
            return {
                toast: `Password should have atleast one digit.`,
            };
        }
    }
    try {
        const res = await axios.post(
            "https://mockData.uditkumar01.repl.co/user/login",
            {
                data: {
                    email,
                    password,
                },
            }
        );
        if(res.data.token){
            localStorage.setItem('GOOD_TIMES_TOKEN',res.data.token);
            return {
                toast: `${res.data.user.name} logged in successfully`,
                type: "success",
                user: {
                    _id: res.data.user._id,
                    name: res.data.user.name,
                    email: res.data.user.email,
                },
            };
        }
        return {
                toast: `${res.data.user.name} your password is incorrect`,
                type: "danger",
            };
    } catch (err) {
        return {
            toast: `${email} is not registered`,
            type: "danger",
        };
    }
}

export async function signUpUser(name, email, password, confirmPassword) {
    const nameRegex = new RegExp(/[A-z]+/gi);
    if (!EmailValidator.validate(email)) {
        return {
            toast: `${email} is not valid`,
            type: "danger",
        };
    }
    if (!nameRegex.test(name)) {
        return {
            toast: `${name} is not valid`,
            type: "danger",
        };
    }
    if (
        !(
            password.match(/[A-Za-z]+/g) &&
            password.match(/[\d]+/g && password.length >= 8)
        )
    ) {
        if (password.length < 8) {
            return {
                toast: `Password should have minimum 8 characters.`,
                type: "warning",
            };
        }
        if (!password.match(/[A-Za-z]+/g)) {
            return {
                toast: `Password should have atleast one alphabet.`,
                type: "warning",
            };
        }
        if (!password.match(/[\d]+/g)) {
            return {
                toast: `Password should have atleast one digit.`,
                type: "warning",
            };
        }
    }
    if (!(password === confirmPassword)) {
        return {
            toast: `Password and Confirm Password doesn't match`,
            type: "danger",
        };
    }

    try {
        const res = await axios.post(
            "https://mockData.uditkumar01.repl.co/user/signup",
            {
                data: {
                    name,
                    email,
                    password,
                },
            }
        );
        // console.log(res.data);
        return {
            toast: `${capitalize(
                res.data.user.name
            )} signed up in successfully`,
            type: "success",
            user: {
                _id: res.data.user._id,
                name: res.data.user.name,
                email: res.data.user.email,
            },
        };
    } catch (err) {
        // console.log(err.message,  err.response.data.error);
        const errMsg = err.response.data.error;
        return {
            toast:
                errMsg.length > 50
                    ? `${name} please check your credentials`
                    : errMsg,
            type: "danger",
        };
    }
}
