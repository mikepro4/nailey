import {
	SHOW_APP_MENU,
	HIDE_APP_MENU,
    UPDATE_TOTAL_PIXELS,
	UPDATE_TOTAL_SCROLLED_PIXELS,
	SCROLL_TO,
    SCROLL_TO_RESET,
    ENABLE_EDIT,
    DISABLE_EDIT,
    SHOW_DRAWER,
    HIDE_DRAWER,
    UPDATE_COLLECTION,
    UNCHECK_ALL,
    LOAD_NEW_SITE,
    CLEAR_NEW_SITE
} from "./types";

import moment from "moment";
import * as _ from "lodash";
import qs from "qs";
import axios from "axios";


/////////////////////////////////////////////////

export const enableEdit = (success) => async (
    dispatch,
	getState,
	api
) => {
    dispatch({
        type: ENABLE_EDIT,
    });

	if (success) {
		success();
	}
};

export const disableEdit = (success) => async (
    dispatch,
	getState,
	api
) => {
    dispatch({
        type: DISABLE_EDIT,
    });

	if (success) {
		success();
	}
};




/////////////////////////////////////////////////

export const showMenu = (success) => async (
    dispatch,
	getState,
	api
) => {
    dispatch({
        type: SHOW_APP_MENU,
    });

	if (success) {
		success();
	}
	document.body.classList.add("no-scroll");
};

export const hideMenu = (success) => async (
    dispatch,
	getState,
	api
) => {
    dispatch({
        type: HIDE_APP_MENU,
    });

	if (success) {
		success();
	}
	document.body.classList.remove("no-scroll");
};

/////////////////////////////////////////////////

export const updateTotalPixels = (total, clientWidth, clientHeight) => async (dispatch, getState) => {
	dispatch({
		type: UPDATE_TOTAL_PIXELS,
		total: total,
		clientWidth: clientWidth,
		clientHeight: clientHeight,
	});
}

export const updateTotalScrolledPixels = (px) => async (dispatch, getState) => {
	dispatch({
		type: UPDATE_TOTAL_SCROLLED_PIXELS,
		pixels: px
	});
}

/////////////////////////////////////////////////

export const setScrollTo = (px) => async (dispatch) => {
	dispatch({
		type: SCROLL_TO,
		payload: px
	});
}

export const resetScrollTo = (px) => async (dispatch) => {
	dispatch({
		type: SCROLL_TO_RESET
	});
}



/////////////////////////////////////////////////

export const showDrawer = (type, drawerData, success) => async (
    dispatch,
	getState,
	api
) => {
    dispatch({
        type: CLEAR_NEW_SITE
    })

    if(drawerData) {
        dispatch({
            type: SHOW_DRAWER,
            payload: type,
            drawerData: drawerData
        });

        switch(type) {
            case "site-edit":
                return(
                    dispatch({
                        type: LOAD_NEW_SITE,
                        payload: drawerData
                    })
                )
        }


    } else {
        dispatch({
            type: SHOW_DRAWER,
            payload: type,
        });
    }
    

	if (success) {
		success();
	}
    document.body.classList.add("no-scroll");
    

};

/////////////////////////////////////////////////

export const hideDrawer = (success) => async (
    dispatch,
	getState,
	api
) => {
    dispatch({
        type: HIDE_DRAWER
    });
    
	if (success) {
		success();
	}
	document.body.classList.remove("no-scroll");
};

/////////////////////////////////////////////////

export const updateCollection = (update, success) => async (
    dispatch,
	getState,
	api
) => {
    dispatch({
        type: UPDATE_COLLECTION,
        payload: update
    });
};

/////////////////////////////////////////////////

export const uncheckAll = (status, id, success) => async (
    dispatch,
	getState,
	api
) => {
    dispatch({
        type: UNCHECK_ALL,
        payload: {
            status: status,
            id: id
        }
    });
};



///////////////////////////////////////////////////

export const updateQueryString = (
	updatedState,
	location,
	history
) => dispatch => {
	let queryParams = qs.parse(location.search.substring(1));
	const updatedQuery = _.assign({}, queryParams, updatedState);
	const str = qs.stringify(updatedQuery);
	history.push({
		search: "?" + str
	});
};

///////////////////////////////////////////////////


export const updateProperty = (model, item, property, value, success) => async (
    dispatch,
	getState,
	api
) => {
    
    let newItem = {
        ...item,
        metadata: {
            ...item.metadata,
            [property]: value
        }
    }

    let url = "/" + model + "s/update"
    let key = model + "Id"

    

    await api
        .post(url, {
            [key]: newItem._id, 
            metadata: newItem.metadata, 
        })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
        
    switch(model) {
        case "site":
            return(
                dispatch({
                    type: LOAD_NEW_SITE,
                    payload: newItem
                })
            )
    }
}

///////////////////////////////////////////////////

///////////////////////////////////////////////////


export const getOptions = (model, title, success) => async (
    dispatch,
	getState,
	api
) => {
    let url = "/" + model + "s/all"
    await api
        .post(url, {
            title: title
        })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

