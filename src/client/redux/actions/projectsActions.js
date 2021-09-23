import * as _ from "lodash";

import {
    LOAD_PROJECT,
    LOAD_NEW_PROJECT,
    CLEAR_NEW_PROJECT,
} from "./types";

export const getMainProject = (success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/projects/main")
        .then(response => {

            dispatch({
                type: LOAD_PROJECT,
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

export const createProject = (projectItem, success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/projects/create", projectItem)
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
            
        });
}

// ===========================================================================



export const loadProject = (success) => async (
    dispatch,
	getState,
	api
) => {

    await api
        .post("/projects/main", { })
        .then(response => {
            if (success) {
                
                success(response.data);
            }

            dispatch({
                type: LOAD_PROJECT,
                payload: response.data
            });
        })
        .catch(() => {
            // dispatch(authError('Account with this email already exists'));
        });
}

// ===========================================================================


export const loadNewProject = (data, success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: LOAD_NEW_PROJECT,
        payload: data
    });
}

export const clearNewProject = (success) => async (
    dispatch,
	getState,
	api
) => {

    dispatch({
        type: CLEAR_NEW_PROJECT
    });
}


// ===========================================================================


export const searchProjects = (type, identifier, offset, limit, query, success) => async (
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
        .post("/projects/search", {
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


export const deleteProject = (projectId, projectItem, success) => async (
    dispatch,
	getState,
	api
) => {
    await api
        .post("/projects/delete", { projectId: projectId, project: projectItem })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

// ===========================================================================


export const updateProject = (project, data, success) => async (
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

    let newMetadata = _.merge({}, project.metadata, project)

    let newProject = {
        ...project,
        metadata: newMetadata,
    }

    await api
        .post("/projects/update", { 
            projectId: newProject._id, 
            metadata: newProject.metadata,
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


export const setMainProject = (projectItem, main, success) => async (
    dispatch,
	getState,
	api
) => {
    await api
        .post("/projects/setMain", { main: main, project: projectItem })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}

export const updateProjectProperty = (projectItem, property, value, success) => async (
    dispatch,
	getState,
	api
) => {
    
    let newProject = {
        ...projectItem,
        metadata: {
            ...projectItem.metadata,
            [property]: value
        }
    }
    await api
        .post("/projects/update", {
            projectId: newProject._id, 
            metadata: newProject.metadata, 
        })
        .then(response => {
            if (success) {
                success(response.data);
            }
        })
        .catch(() => {
        });
}


