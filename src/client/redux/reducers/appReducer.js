import * as _ from "lodash";
import update from "immutability-helper";

import {
	SHOW_APP_MENU,
	HIDE_APP_MENU,
    UPDATE_TOTAL_PIXELS,
    UPDATE_TOTAL_SCROLLED_PIXELS,
    FETCH_AUTH,
    AUTH_CLEAR,
    ENABLE_EDIT,
    DISABLE_EDIT
} from "../actions/types";

export const initialState = {
    totalPixels: 0,
	clientWidth: 0,
	clientHeight: 0,
	totalScrolledPixels: 0,
	scrollTo: null,
    menuOpen: false,
    user: null,
    edit: false,
    site: {
        title: "Nailey",
        subtitle: "Your nail artist",
        description: "Manicure, pedicure, nail extensions services delivered with care, love & passion",
        socialMediaImage: "",
        ctaText: "Book appointment",
        ctaUrl: "https://www.mikhail.co/",
        pages: [
            {
                id: 0,
                title: "Home",
                blocks: []
            },
            {
                id: 1,
                title: "Services",
                blocks: []
            },
            {
                id: 2,
                title: "Contact",
                blocks: []
            },
            {
                id: 3,
                title: "About",
                blocks: []
            }
        ]
    },
    updatedSite: {}
};

export const appReducer = (state = initialState, action) => {
	switch (action.type) {
        case ENABLE_EDIT:
			return {
				...state,
				edit: true
            }
        case DISABLE_EDIT:
            return {
                ...state,
                edit: false
            }
		case SHOW_APP_MENU:
			return {
				...state,
				menuOpen: true
			}
		case HIDE_APP_MENU:
			return {
				...state,
				menuOpen: false
			}
        case UPDATE_TOTAL_PIXELS:
            return {
                ...state,
                totalPixels: action.total,
                clientWidth: action.clientWidth,
                clientHeight: action.clientHeight
            } ;
        case UPDATE_TOTAL_SCROLLED_PIXELS:
            return {
                ...state,
                totalScrolledPixels: action.pixels
            };
        case FETCH_AUTH:
            return {
                ...state,
                user: action.payload
            }
        case AUTH_CLEAR:
            return {
                ...state,
                user: null
            }
		default:
			return state;
	}
};

