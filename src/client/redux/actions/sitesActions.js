import moment from "moment";
import * as _ from "lodash";
import qs from "qs";
import axios from "axios";

import {
    LOAD_SITE,
    LOAD_NEW_SITE,
    CLEAR_NEW_SITE
} from "./types";

export const getMainSite = (success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/sites/main")
        .then(response => {

            dispatch({
                type: LOAD_SITE,
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

export const createSite = (siteItem, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/sites/create", siteItem)
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
            
        });
}

// ===========================================================================



export const loadSite = (id, success) => async (
    dispatch,
	getState,
	api
) => {


    await api
        .post("/sites/item", { siteId: id })
        .then(response => {
            if (success) {
                success(response.data);
            }

            dispatch({
                type: LOAD_SITE,
                payload: response.data
            });
        })
        .catch(() => {
            // dispatch(authError('Account with this email already exists'));
        });
}

// ===========================================================================


export const loadNewSite = (data, success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: LOAD_NEW_SITE,
        payload: data
    });
}

export const clearNewSite = (success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: CLEAR_NEW_SITE
    });
}


// ===========================================================================


export const searchSites = (type, identifier, offset, limit, query, success) => async (
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
        .post("/sites/search", {
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


export const deleteSite = (siteId, siteItem, success) => async (
    dispatch,
	getState,
	api
) => {
    await api
        .post("/sites/delete", { siteId: siteId, site: siteItem })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

// ===========================================================================


export const updateSite = (site, data, success) => async (
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

    let newMetadata = _.merge({}, site.metadata, site)

    let newSite = {
        ...site,
        metadata: newMetadata,
    }

    await api
        .post("/sites/update", { 
            siteId: newSite._id, 
            metadata: newSite.metadata,
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


export const setMainSite = (siteItem, main, success) => async (
    dispatch,
	getState,
	api
) => {
    await api
        .post("/sites/setMain", { main: main, site: siteItem })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

