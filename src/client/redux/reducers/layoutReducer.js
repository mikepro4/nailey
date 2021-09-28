import {
    LOAD_LAYOUT_HOVERED,
    LOAD_LAYOUT_ACTIVE,
    LOAD_LAYOUT_EDITING,
    LAYOUT_PREVIEW,
    LAYOUT_SCROLL,
} from '../actions/types';

export const initialState = {
    hovered: null,
    active: null,
    editing: null,
    preview: false,
    scrollTo: null
};

  
export const layoutReducer = function(state = initialState, action) {
    switch(action.type) {
        case LOAD_LAYOUT_HOVERED:
            return { ...state,
                hovered: action.payload,
            };
        case LOAD_LAYOUT_ACTIVE:
            return { ...state,
                active: action.payload,
            };
        case LOAD_LAYOUT_EDITING:
            return { ...state,
                editing: action.payload,
            };
        case LAYOUT_PREVIEW:
            return { ...state,
                preview: action.payload,
            };
        case LAYOUT_SCROLL:
            return { ...state,
                scrollTo: action.payload,
            };
        }

    return state;
}
