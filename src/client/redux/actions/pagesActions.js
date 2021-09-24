import moment from "moment";
import * as _ from "lodash";
import qs from "qs";
import axios from "axios";

import {
    LOAD_PAGE,
    LOAD_NEW_PAGE,
    CLEAR_NEW_PAGE,
} from "./types";

export const getMainPage = (success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/pages/main")
        .then(response => {

            dispatch({
                type: LOAD_PAGE,
                payload: response.data[0]
            });

            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
            
        });
}

// ===========================================================================

export const createPage = (pageItem, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/pages/create", pageItem)
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
            
        });
}

// ===========================================================================



export const loadPage = (success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/pages/main", { })
        .then(response => {
            if (success) {
                
                success(response.data);
            }

            dispatch({
                type: LOAD_PAGE,
                payload: response.data
            });
        })
        .catch(() => {
            // dispatch(authError('Account with this email already exists'));
        });
}

// ===========================================================================


export const loadNewPage = (data, success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: LOAD_NEW_PAGE,
        payload: data
    });
}

export const clearNewPage = (success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: CLEAR_NEW_PAGE
    });
}


// ===========================================================================


export const searchPages = (type, identifier, offset, limit, query, success) => async (
    dispatch,
	getState,
	api
) => {
    let criteria = {}

    if(type == "user") {
        criteria = {
            createdBy: identifier
        }
    }

    await api
        .post("/pages/search", {
            criteria: criteria,
            sortProperty: "createdAt",
            offset: offset,
            limit: limit,
            order: "-1"
        })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

// ===========================================================================


export const deletePage = (pageId, pageItem, success) => async (
    dispatch,
	getState,
	api
) => {
    await api
        .post("/pages/delete", { pageId: pageId, page: pageItem })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

// ===========================================================================


export const updatePage = (page, data, success) => async (
    dispatch,
	getState,
	api
) => {

    let date

    if(data.main) {
        date = new Date()
    } else {
        date = null
    }

    let newMetadata = _.merge({}, page.metadata, page)

    let newPage = {
        ...page,
        metadata: newMetadata,
    }

    await api
        .post("/pages/update", { 
            pageId: newPage._id, 
            metadata: newPage.metadata,
        })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}


// ===========================================================================


export const setMainPage = (pageItem, main, success) => async (
    dispatch,
	getState,
	api
) => {
    await api
        .post("/pages/setMain", { main: main, page: pageItem })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

export const updatePageProperty = (pageItem, property, value, success) => async (
    dispatch,
	getState,
	api
) => {
    
    let newPage = {
        ...pageItem,
        metadata: {
            ...pageItem.metadata,
            [property]: value
        }
    }
    await api
        .post("/pages/update", {
            pageId: newPage._id, 
            metadata: newPage.metadata, 
        })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}


