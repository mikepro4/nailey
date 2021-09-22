import * as _ from "lodash";

import {
    LOAD_FONT,
    LOAD_NEW_FONT,
    CLEAR_NEW_FONT,
} from "./types";

export const getMainFont = (success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/fonts/main")
        .then(response => {

            dispatch({
                type: LOAD_FONT,
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

export const createFont = (fontItem, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/fonts/create", fontItem)
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
            
        });
}

// ===========================================================================



export const loadFont = (success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/fonts/main", { })
        .then(response => {
            if (success) {
                
                success(response.data);
            }

            dispatch({
                type: LOAD_FONT,
                payload: response.data
            });
        })
        .catch(() => {
            // dispatch(authError('Account with this email already exists'));
        });
}

// ===========================================================================


export const loadNewFont = (data, success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: LOAD_NEW_FONT,
        payload: data
    });
}

export const clearNewFont = (success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: CLEAR_NEW_FONT
    });
}


// ===========================================================================


export const searchFonts = (type, identifier, offset, limit, query, success) => async (
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
        .post("/fonts/search", {
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


export const deleteFont = (fontId, fontItem, success) => async (
    dispatch,
	getState,
	api
) => {
    await api
        .post("/fonts/delete", { fontId: fontId, font: fontItem })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

// ===========================================================================


export const updateFont = (font, data, success) => async (
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

    let newMetadata = _.merge({}, font.metadata, font)

    let newFont = {
        ...font,
        metadata: newMetadata,
    }

    await api
        .post("/fonts/update", { 
            fontId: newFont._id, 
            metadata: newFont.metadata,
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


export const setMainFont = (fontItem, main, success) => async (
    dispatch,
	getState,
	api
) => {
    await api
        .post("/fonts/setMain", { main: main, font: fontItem })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

export const updateFontProperty = (fontItem, property, value, success) => async (
    dispatch,
	getState,
	api
) => {
    
    let newFont = {
        ...fontItem,
        metadata: {
            ...fontItem.metadata,
            [property]: value
        }
    }
    await api
        .post("/fonts/update", {
            fontId: newFont._id, 
            metadata: newFont.metadata, 
        })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}


