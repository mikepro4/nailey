import * as _ from "lodash";

import {
    LOAD_PRODUCT,
    LOAD_NEW_PRODUCT,
    CLEAR_NEW_PRODUCT,
} from "./types";

export const getMainProduct = (success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/products/main")
        .then(response => {

            dispatch({
                type: LOAD_PRODUCT,
                payload: response.data[0]
            });

            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
            
        });
}

// ===========================================================================

export const createProduct = (productItem, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/products/create", productItem)
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
            
        });
}

// ===========================================================================



export const loadProduct = (success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/products/main", { })
        .then(response => {
            if (success) {
                
                success(response.data);
            }

            dispatch({
                type: LOAD_PRODUCT,
                payload: response.data
            });
        })
        .catch(() => {
            // dispatch(authError('Account with this email already exists'));
        });
}

// ===========================================================================


export const loadNewProduct = (data, success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: LOAD_NEW_PRODUCT,
        payload: data
    });
}

export const clearNewProduct = (success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: CLEAR_NEW_PRODUCT
    });
}


// ===========================================================================


export const searchProducts = (type, identifier, offset, limit, query, success) => async (
    dispatch,
	getState,
	api
) => {
    let criteria = {}

    if(type == "user") {
        criteria = {
            createdBy: identifier
        }
    }

    await api
        .post("/products/search", {
            criteria: criteria,
            sortProperty: "createdAt",
            offset: offset,
            limit: limit,
            order: "-1"
        })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

// ===========================================================================


export const deleteProduct = (productId, productItem, success) => async (
    dispatch,
	getState,
	api
) => {
    await api
        .post("/products/delete", { productId: productId, product: productItem })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

// ===========================================================================


export const updateProduct = (product, data, success) => async (
    dispatch,
	getState,
	api
) => {

    let date

    if(data.main) {
        date = new Date()
    } else {
        date = null
    }

    let newMetadata = _.merge({}, product.metadata, product)

    let newProduct = {
        ...product,
        metadata: newMetadata,
    }

    await api
        .post("/products/update", { 
            productId: newProduct._id, 
            metadata: newProduct.metadata,
        })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}


// ===========================================================================


export const setMainProduct = (productItem, main, success) => async (
    dispatch,
	getState,
	api
) => {
    await api
        .post("/products/setMain", { main: main, product: productItem })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

export const updateProductProperty = (productItem, property, value, success) => async (
    dispatch,
	getState,
	api
) => {
    
    let newProduct = {
        ...productItem,
        metadata: {
            ...productItem.metadata,
            [property]: value
        }
    }
    await api
        .post("/products/update", {
            productId: newProduct._id, 
            metadata: newProduct.metadata, 
        })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}


