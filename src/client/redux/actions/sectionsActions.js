import moment from "moment";
import * as _ from "lodash";
import qs from "qs";
import axios from "axios";

import {
    LOAD_SECTION,
    LOAD_NEW_SECTION,
    CLEAR_NEW_SECTION,
} from "./types";

export const getMainSection = (success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/sections/main")
        .then(response => {

            dispatch({
                type: LOAD_SECTION,
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

export const createSection = (sectionItem, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/sections/create", sectionItem)
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
            
        });
}

// ===========================================================================



export const loadSection = (success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/sections/main", { })
        .then(response => {
            if (success) {
                
                success(response.data);
            }

            console.log(response.data)

            dispatch({
                type: LOAD_SECTION,
                payload: response.data
            });
        })
        .catch(() => {
            // dispatch(authError('Account with this email already exists'));
        });
}

// ===========================================================================


export const loadNewSection = (data, success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: LOAD_NEW_SECTION,
        payload: data
    });
}

export const clearNewSection = (success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: CLEAR_NEW_SECTION
    });
}


// ===========================================================================


export const searchSections = (type, identifier, offset, limit, query, success) => async (
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
        .post("/sections/search", {
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


export const deleteSection = (sectionId, sectionItem, success) => async (
    dispatch,
	getState,
	api
) => {
    await api
        .post("/sections/delete", { sectionId: sectionId, section: sectionItem })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

// ===========================================================================


export const updateSection = (section, data, success) => async (
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

    let newMetadata = _.merge({}, section.metadata, section)

    let newSection = {
        ...section,
        metadata: newMetadata,
    }

    await api
        .post("/sections/update", { 
            sectionId: newSection._id, 
            metadata: newSection.metadata,
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


export const setMainSection = (sectionItem, main, success) => async (
    dispatch,
	getState,
	api
) => {
    await api
        .post("/sections/setMain", { main: main, section: sectionItem })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

export const updateSectionProperty = (sectionItem, property, value, success) => async (
    dispatch,
	getState,
	api
) => {
    
    let newSection = {
        ...sectionItem,
        metadata: {
            ...sectionItem.metadata,
            [property]: value
        }
    }
    await api
        .post("/sections/update", {
            sectionId: newSection._id, 
            metadata: newSection.metadata, 
        })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}


