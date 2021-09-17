import * as _ from "lodash";

export const initialState = {
    home: {},
    services: {},
    about: {},
    contact: {}
};

export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

