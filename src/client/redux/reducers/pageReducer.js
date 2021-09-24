import {
    LOAD_PAGE,
    CLEAR_PAGE,
    LOAD_NEW_PAGE,
    CLEAR_NEW_PAGE,
    LOAD_SITE
} from '../actions/types';

export const initialState = {
    currentPage: {},
    newPage: {},
    allPages: {}
};

  
export const pageReducer = function(state = initialState, action) {
    switch(action.type) {
        case LOAD_PAGE:
            return { ...state,
                currentPage: action.payload.main,
            };
        case LOAD_NEW_PAGE:
            return { ...state,
                newPage: action.payload
            };
        case LOAD_SITE:
            return { ...state,
                allPages: action.payload.allPages,
            };
           
        case CLEAR_PAGE:
            return { ...state,
                currentPage: {}
            };
        case CLEAR_NEW_PAGE:
            return { ...state,
                newPage: {}
            };
        }

    return state;
}
