import * as EmailValidator from "email-validator";

export const handlePasswordChars = (checkText) => {
    if (checkText.length !== 0 && checkText.length < 8) {
        return { type: "warning", msg: "Too Short" };
    } else if (checkText.match(/[A-Za-z]+/g) && checkText.match(/[\d]+/g)) {
        return {};
    } else if (checkText.match(/[A-Za-z]+/g)) {
        return { type: "warning", msg: "Digit missing" };
    } else if (checkText.match(/[\d]+/g)) {
        return { type: "warning", msg: "Char missing" };
    }
    return {};
};
export const handlePasswordCheckPasswordEquality = (
    password,
    confirmPassword
) => {
    if (password !== confirmPassword) {
        return { type: "danger", msg: "Password doesn't match" };
    }
    return {};
};
export const isEmail = (checkText) => {
    return checkText === ""
        ? {}
        : EmailValidator.validate(checkText)
        ? {}
        : { type: "danger", msg: "Not a vaild Email" };
};
