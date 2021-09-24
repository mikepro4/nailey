import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { appReducer } from "./appReducer";
import { connectRouter } from "connected-react-router";
import { authReducer } from "./authReducer";
import { siteReducer } from "./siteReducer";
import { themeReducer } from "./themeReducer";
import { sectionReducer } from "./sectionReducer";
import { productReducer } from "./productReducer";
import { fontReducer } from "./fontReducer";
import { projectReducer } from "./projectReducer";
import { pageReducer } from "./pageReducer";

export default (history) => combineReducers({
    router: connectRouter(history),
    form: formReducer,
    app: appReducer,
    auth: authReducer,
    site: siteReducer,
    theme: themeReducer,
    section: sectionReducer,
    product: productReducer,
    font: fontReducer,
    project: projectReducer,
    page: pageReducer
})