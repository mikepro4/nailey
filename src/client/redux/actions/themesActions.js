import moment from "moment";
import * as _ from "lodash";
import qs from "qs";
import axios from "axios";

import {
    LOAD_THEME,
    LOAD_NEW_THEME,
    CLEAR_NEW_THEME,
    LOAD_SITE
} from "./types";

export const getMainTheme = (success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/themes/main")
        .then(response => {

            dispatch({
                type: LOAD_THEME,
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

export const createTheme = (themeItem, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/themes/create", themeItem)
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
            
        });
}

// ===========================================================================



export const loadTheme = (success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/themes/main", { })
        .then(response => {
            if (success) {
                
                success(response.data);
            }

            dispatch({
                type: LOAD_THEME,
                payload: response.data
            });
        })
        .catch(() => {
            // dispatch(authError('Account with this email already exists'));
        });
}

// ===========================================================================


export const loadNewTheme = (data, success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: LOAD_NEW_THEME,
        payload: data
    });
}

export const clearNewTheme = (success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: CLEAR_NEW_THEME
    });
}


// ===========================================================================


export const searchThemes = (type, identifier, offset, limit, query, success) => async (
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
        .post("/themes/search", {
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


export const deleteTheme = (themeId, themeItem, success) => async (
    dispatch,
	getState,
	api
) => {
    await api
        .post("/themes/delete", { themeId: themeId, theme: themeItem })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

// ===========================================================================


export const updateTheme = (theme, data, success) => async (
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

    let newMetadata = _.merge({}, theme.metadata, theme)

    let newTheme = {
        ...theme,
        metadata: newMetadata,
    }

    await api
        .post("/themes/update", { 
            themeId: newTheme._id, 
            metadata: newTheme.metadata,
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


export const setMainTheme = (themeItem, main, success) => async (
    dispatch,
	getState,
	api
) => {
    await api
        .post("/themes/setMain", { main: main, theme: themeItem })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

export const updateThemeProperty = (themeItem, property, value, success) => async (
    dispatch,
	getState,
	api
) => {
    
    let newTheme = {
        ...themeItem,
        metadata: {
            ...themeItem.metadata,
            [property]: value
        }
    }
    await api
        .post("/themes/update", {
            themeId: newTheme._id, 
            metadata: newTheme.metadata, 
        })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}


