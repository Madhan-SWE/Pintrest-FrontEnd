import * as actionTypes from "./actionTypes";

export const loginUser = (token) => {
    console.log("--", token);
    return {
        type: actionTypes.LOG_IN,
        token: token
    };
};

export const logoutUser = () => {
    return {
        type: actionTypes.LOG_OUT
    }
}