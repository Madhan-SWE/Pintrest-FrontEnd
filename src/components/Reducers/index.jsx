import { combineReducers } from "redux";
import user from "../Reducers/userReducer";

export default combineReducers({
    user: user
})