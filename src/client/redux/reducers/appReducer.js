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
        title: "Nailey",
        subtitle: "Your nail artist",
        description: "Manicure, pedicure, nail extensions services delivered with care, love & passion",
        socialMediaImage: "",
        ctaText: "Book Appointment",
        ctaUrl: "https://www.mikhail.co/",
        style: {
            headerType: "",
            backgroundColor: "",
            textColor: "",
            normalLinkColor: "",
            hoverLinkColor: "",
            activeLinkColor: "",
            logoColor: "",
            mobileHeaderBackgroundColor: "",
            buttons: [
                {
                    type: "regular",
                    normalBackgroundColor: "",
                    normalTextColor: "",
                    hoverBackgroundColor: "",
                    hoverTextColor: "",
                    activeBackgroundColor: "",
                    activeTextColor: ""
                },
                {
                    type: "minimal",
                    normalBackgroundColor: "",
                    normalTextColor: "",
                    hoverBackgroundColor: "",
                    hoverTextColor: "",
                    activeBackgroundColor: "",
                    activeTextColor: ""
                },
                {
                    type: "extra",
                    normalBackgroundColor: "",
                    normalTextColor: "",
                    hoverBackgroundColor: "",
                    hoverTextColor: "",
                    activeBackgroundColor: "",
                    activeTextColor: ""
                }
            ]
        },
        pages: [
            {
                id: 0,
                title: "Home",
                url: "/",
                blocks: []
            },
            {
                id: 1,
                title: "Services",
                url: "/services",
                blocks: []
            },
            {
                id: 2,
                title: "Contact",
                url: "/contact",
                blocks: []
            },
            {
                id: 3,
                title: "About",
                url: "/about",
                blocks: []
            }
        ]
    },
    updatedSite: {}
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

