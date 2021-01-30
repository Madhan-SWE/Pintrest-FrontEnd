import * as actionTypes from "../Actions/actionTypes";
const stateTemplate = {
    state: false,
    token: "",
};

export default (
    state = stateTemplate,
    action
) => {
    switch (action.type) {
        case actionTypes.LOG_IN:
            return {
                ...state,
                state: !state.state,
                token: action.token,
            };
        case actionTypes.LOG_OUT:
            return {
                ...state,
                state: !state.state,
                token: ""
            }
        default:
            return state;
    }
};
