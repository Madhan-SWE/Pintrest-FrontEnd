import * as actionTypes from "../Actions/actionTypes";

export default (state=false, action) => {
    switch(action.actionTypes){
        case actionTypes.LOG_IN:
            return !state
        case actionTypes.LOG_OUT:
            return !state
        default:
            return state
    }
};