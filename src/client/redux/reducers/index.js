import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { appReducer } from "./appReducer";
import { connectRouter } from "connected-react-router";
import { authReducer } from "./authReducer";

export default (history) => combineReducers({
    router: connectRouter(history),
    form: formReducer,
    app: appReducer,
    auth: authReducer
})