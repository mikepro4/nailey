import {
    LOAD_SITE,
    CLEAR_SITE,
    LOAD_NEW_SITE,
    CLEAR_NEW_SITE
} from '../actions/types';

export const initialState = {
    currentSite: {},
    newSite: {}
};

  
export const siteReducer = function(state = initialState, action) {
    switch(action.type) {
        case LOAD_SITE:
            return { ...state,
                currentSite: action.payload
            };
        case LOAD_NEW_SITE:
            return { ...state,
                newSite: action.payload
            };
        case CLEAR_SITE:
            return { ...state,
                currentSite: {}
            };
        case CLEAR_NEW_SITE:
            return { ...state,
                newSite: {}
            };
        }

    return state;
}
