import { combineReducers } from "redux";
import user from "../Reducers/userReducer";
import operations from "../Reducers/operationsReducers";

export default combineReducers({
    user: user,
    operations: operations
})