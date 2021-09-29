import {
    LOAD_SECTION,
    CLEAR_SECTION,
    LOAD_NEW_SECTION,
    CLEAR_NEW_SECTION
} from '../actions/types';

export const initialState = {
    currentSection: {},
    newSection: {},
};

  
export const sectionReducer = function(state = initialState, action) {
    switch(action.type) {
        case LOAD_SECTION:
            return { ...state,
                currentSection: action.payload,
            };
        case LOAD_NEW_SECTION:
            return { ...state,
                newSection: action.payload
            };
        case CLEAR_SECTION:
            return { ...state,
                currentSection: {}
            };
        case CLEAR_NEW_SECTION:
            return { ...state,
                newSection: {}
            };
        }

    return state;
}
