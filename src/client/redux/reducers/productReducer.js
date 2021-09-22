import {
    LOAD_PRODUCT,
    CLEAR_PRODUCT,
    LOAD_NEW_PRODUCT,
    CLEAR_NEW_PRODUCT
} from '../actions/types';

export const initialState = {
    currentProduct: {},
    newProduct: {},
};

  
export const productReducer = function(state = initialState, action) {
    switch(action.type) {
        case LOAD_PRODUCT:
            return { ...state,
                currentProduct: action.payload.main,
            };
        case LOAD_NEW_PRODUCT:
            return { ...state,
                newProduct: action.payload
            };
        case CLEAR_PRODUCT:
            return { ...state,
                currentProduct: {}
            };
        case CLEAR_NEW_PRODUCT:
            return { ...state,
                newProduct: {}
            };
        }

    return state;
}
