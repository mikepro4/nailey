import * as _ from "lodash";
import update from "immutability-helper";

import {
	SHOW_APP_MENU,
	HIDE_APP_MENU,
    UPDATE_TOTAL_PIXELS,
	UPDATE_TOTAL_SCROLLED_PIXELS,
} from "../actions/types";

export const initialState = {
    totalPixels: 0,
	clientWidth: 0,
	clientHeight: 0,
	totalScrolledPixels: 0,
	scrollTo: null,
    menuOpen: false,
    user: null,
    site: {
        name: "Nailey",
        subtitle: "Your nail artist",
        description: "Manicure, pedicure, nail extensions services delivered with care, love & passion",
        bookingUrl: "https://www.mikhail.co/",
        socialMediaImage: ""
    },
    home: {
        title: "Home",
        blocks: []
    },
    pages: [
        {
            id: "services",
            title: "Services",
            blocks: []
        },
        {
            id: "contact",
            title: "Contact",
            blocks: []
        },
        {
            id: "about",
            title: "About",
            blocks: []
        }
    ]
};

export const appReducer = (state = initialState, action) => {
	switch (action.type) {
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
		default:
			return state;
	}
};

