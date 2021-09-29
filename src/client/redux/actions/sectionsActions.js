import moment from "moment";
import * as _ from "lodash";
import qs from "qs";
import axios from "axios";

import {
    LOAD_SECTION,
    LOAD_NEW_SECTION,
    CLEAR_NEW_SECTION,
} from "./types";


// ===========================================================================

export const loadSection = (id, success) => async (
    dispatch,
	getState,
	api
) => {
    const page = getState().page.currentPage

    let section = _.filter(page.metadata.sections, {
        id: id
    })

    dispatch({
        type: LOAD_SECTION,
        payload: section[0]
    });
}