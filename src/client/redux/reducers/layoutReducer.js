import {
    LOAD_LAYOUT,
    CLEAR_LAYOUT,
    LOAD_NEW_LAYOUT,
    CLEAR_NEW_LAYOUT,
    LOAD_SITE
} from '../actions/types';

export const initialState = {
    currentLayout: {},
    newLayout: {},
    allLayouts: {}
};

  
export const layoutReducer = function(state = initialState, action) {
    switch(action.type) {
        case LOAD_LAYOUT:
            return { ...state,
                currentLayout: action.payload.main,
            };
        case LOAD_NEW_LAYOUT:
            return { ...state,
                newLayout: action.payload
            };
        case LOAD_SITE:
            return { ...state,
                allLayouts: action.payload.allLayouts,
            };
           
        case CLEAR_LAYOUT:
            return { ...state,
                currentLayout: {}
            };
        case CLEAR_NEW_LAYOUT:
            return { ...state,
                newLayout: {}
            };
        }

    return state;
}
