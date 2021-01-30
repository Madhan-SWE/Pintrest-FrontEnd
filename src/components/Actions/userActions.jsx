import * as actionTypes from "./actionTypes";

export const loginUser = () => {
    return {
        type: actionTypes.LOG_IN
    };
};

export const logoutUser = () => {
    return {
        type: actionTypes.LOG_OUT
    }
}