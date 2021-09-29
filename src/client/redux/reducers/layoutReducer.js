import {
    LOAD_LAYOUT_HOVERED,
    LOAD_LAYOUT_ACTIVE,
    LOAD_LAYOUT_EDITING,
    LAYOUT_PREVIEW,
    LAYOUT_SCROLL,
} from '../actions/types';

export const initialState = {
    hovered: null,
    active: null,
    editing: null,
    preview: false,
    scrollTo: null,
    allLayouts: {
        hero: {
            sectionValue: "hero",
            commonProperties: [
                {
                    peropertyValue: "mainHeadline",
                    propertyLabel: "Main Headline",
                    value: "This is a default main headline",
                    propertyType: "string",
                    value: null,
                },
                {
                    peropertyValue: "subtitle",
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
                            value: "displayCTA",
                            label: "Display CTA",
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
                            value: "displayMainImage",
                            label: "Display Main Image",
                            propertyType: "boolean",
                            value: true
                        }
                    ]
                }
            ]
        }
    }
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
