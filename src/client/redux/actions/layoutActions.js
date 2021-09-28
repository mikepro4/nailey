import {
    LOAD_LAYOUT_HOVERED,
    LOAD_LAYOUT_ACTIVE,
    LOAD_LAYOUT_EDITING,
    LAYOUT_PREVIEW,
    LAYOUT_SCROLL,
} from '../actions/types';


// ===========================================================================


export const layoutHovered = (layout, success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: LOAD_LAYOUT_HOVERED,
        payload: layout
    });
}

// ===========================================================================


export const layoutActive = (layout, success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: LOAD_LAYOUT_ACTIVE,
        payload: layout
    });
}


// ===========================================================================


export const layoutEditing = (field, success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: LOAD_LAYOUT_EDITING,
        payload: field
    });
}

// ===========================================================================


export const layoutPreview = (status, success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: LAYOUT_PREVIEW,
        payload: status
    });
}


// ===========================================================================


export const layoutScroll = (value, success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: LAYOUT_SCROLL,
        payload: value
    });
}


// ===========================================================================