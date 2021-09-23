import {
    LOAD_PROJECT,
    CLEAR_PROJECT,
    LOAD_NEW_PROJECT,
    CLEAR_NEW_PROJECT
} from '../actions/types';

export const initialState = {
    currentProject: {},
    newProject: {},
};

  
export const projectReducer = function(state = initialState, action) {
    switch(action.type) {
        case LOAD_PROJECT:
            return { ...state,
                currentProject: action.payload.main,
            };
        case LOAD_NEW_PROJECT:
            return { ...state,
                newProject: action.payload
            };
        case CLEAR_PROJECT:
            return { ...state,
                currentProject: {}
            };
        case CLEAR_NEW_PROJECT:
            return { ...state,
                newProject: {}
            };
        }

    return state;
}
