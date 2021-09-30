import {
    LOAD_LAYOUT_HOVERED,
    LOAD_LAYOUT_ACTIVE,
    LOAD_LAYOUT_EDITING,
    LAYOUT_PREVIEW,
    LAYOUT_SCROLL,
} from '../actions/types';

import { fieldCategories } from "../../react/sections/fieldCategories"
import { categories } from "../../react/sections/categories"

export const initialState = {
    hovered: null,
    active: null,
    editing: null,
    preview: false,
    scrollTo: null,
    allLayouts: [
        {
            sectionValue: categories[0],
            activeCategories: [
                fieldCategories[0], fieldCategories[1]
            ],
            commonProperties: [
                {
                    category: fieldCategories[0],
                    propertyValue: "mainHeadline",
                    propertyLabel: "Main Headline",
                    value: "This is a default main headline",
                    propertyType: "string",
                },
                {
                    category: fieldCategories[0],
                    propertyValue: "subtitle",
                    propertyLabel: "Subtitle",
                    propertyType: "string",
                    value: "This is a default subtitle",
                }
            ],
            layouts: [
                {
                    value: "layout1",
                    label: "Layout 1",
                    properties: [
                        {
                            category: fieldCategories[1],
                            propertyValue: "displayCTA",
                            propertyLabel: "Display CTA",
                            propertyType: "boolean",
                            value: true,
                        }
                    ]
                },
                {
                    value: "layout2",
                    label: "Layout 2",
                    properties: [
                        {
                            category: fieldCategories[0],
                            propertyValue: "displayMainImage",
                            propertyLabel: "Display Main Image",
                            propertyType: "boolean",
                            value: true
                        }
                    ]
                }
            ]
        }
    ]
};

  
export const layoutReducer = function(state = initialState, action) {
    switch(action.type) {
        case LOAD_LAYOUT_HOVERED:
            return { ...state,
                hovered: action.payload,
            };
        case LOAD_LAYOUT_ACTIVE:
            return { ...state,
                active: action.payload,
            };
        case LOAD_LAYOUT_EDITING:
            return { ...state,
                editing: action.payload,
            };
        case LAYOUT_PREVIEW:
            return { ...state,
                preview: action.payload,
            };
        case LAYOUT_SCROLL:
            return { ...state,
                scrollTo: action.payload,
            };
        }

    return state;
}
