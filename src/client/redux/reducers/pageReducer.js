import {
    LOAD_PAGE,
    CLEAR_PAGE,
    LOAD_NEW_PAGE,
    CLEAR_NEW_PAGE,
    LOAD_SITE
} from '../actions/types';

import * as _ from "lodash";

export const initialState = {
    currentPage: {},
    newPage: {},
    allPages: {}
};

  
export const pageReducer = function(state = initialState, action) {
    switch(action.type) {
        case LOAD_PAGE:
            return { ...state,
                currentPage: action.payload,
            };
        case LOAD_NEW_PAGE:
            return { ...state,
                newPage: action.payload
            };
        case LOAD_SITE:
            let pathname = action.pathname
            let allPages = action.payload.allPages

            let finalPage = _.filter(allPages, {
                metadata: {
                    url: pathname
                }
            })

            return { ...state,
                allPages: action.payload.allPages,
                currentPage: finalPage[0]
            };
    
        // case LOAD_SITE:
            // let pathname = state.router.location.pathname
            // let allPages = state.page.allPages
            // console.log(state)
        
            // let finalPage = _.filter(allPages, {
            //     metadata: {
            //         url: pathname
            //     }
            // })
            // return { ...state,
                // currentPage: finalPage[0]
            // };
           
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
