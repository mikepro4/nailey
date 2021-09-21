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
    HIDE_DRAWER
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
    if(drawerData) {
        dispatch({
            type: SHOW_DRAWER,
            payload: type,
            drawerData: drawerData
        });
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

