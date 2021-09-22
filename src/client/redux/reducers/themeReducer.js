import {
    LOAD_THEME,
    LOAD_SITE,
    CLEAR_THEME,
    LOAD_NEW_THEME,
    CLEAR_NEW_THEME
} from '../actions/types';

export const initialState = {
    currentTheme: {},
    newTheme: {},
    count: 0
};

  
export const themeReducer = function(state = initialState, action) {
    switch(action.type) {
        case LOAD_THEME:
            return { ...state,
                currentTheme: action.payload.main,
            };
        case LOAD_SITE:

            if(action.payload.theme) {
                return { ...state,
                    currentTheme: action.payload.theme,
                    count: action.payload.themeCount
                };
            } else {
                return { ...state,
                    count: action.payload.themeCount
                };
            }
            
        case LOAD_NEW_THEME:
            return { ...state,
                newTheme: action.payload
            };
        case CLEAR_THEME:
            return { ...state,
                currentTheme: {}
            };
        case CLEAR_NEW_THEME:
            return { ...state,
                newTheme: {}
            };
        }

    return state;
}
