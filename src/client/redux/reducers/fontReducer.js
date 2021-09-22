import {
    LOAD_FONT,
    CLEAR_FONT,
    LOAD_NEW_FONT,
    CLEAR_NEW_FONT
} from '../actions/types';

export const initialState = {
    currentFont: {},
    newFont: {},
};

  
export const fontReducer = function(state = initialState, action) {
    switch(action.type) {
        case LOAD_FONT:
            return { ...state,
                currentFont: action.payload.main,
            };
        case LOAD_NEW_FONT:
            return { ...state,
                newFont: action.payload
            };
        case CLEAR_FONT:
            return { ...state,
                currentFont: {}
            };
        case CLEAR_NEW_FONT:
            return { ...state,
                newFont: {}
            };
        }

    return state;
}
