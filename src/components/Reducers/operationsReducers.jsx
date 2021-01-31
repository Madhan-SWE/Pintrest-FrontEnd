import * as actionTypes from "../Actions/actionTypes";

export default (
    state = "DASHBOARD",
    action
) => {
    switch (action.type) {
        case actionTypes.CREATE_BOARD:
            return actionTypes.CREATE_BOARD
        case actionTypes.CREATE_PIN:
            return actionTypes.CREATE_PIN
        case actionTypes.DASHBOARD:
                return actionTypes.DASHBOARD
        default:
            return state;
    }
};
