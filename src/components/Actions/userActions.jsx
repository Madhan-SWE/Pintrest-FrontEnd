import * as actionTypes from "./actionTypes";

export const loginUser = (token, email) => {
    console.log("--", token);
    return {
        type: actionTypes.LOG_IN,
        token: token,
        email: email
    };
};

export const logoutUser = () => {
    return {
        type: actionTypes.LOG_OUT
    }
}