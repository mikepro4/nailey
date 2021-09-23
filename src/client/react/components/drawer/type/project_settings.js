import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Classes, Intent, Position, Toaster } from "@blueprintjs/core";

import qs from "qs";
import * as _ from "lodash"

import { updateCollection, uncheckAll, updateProperty, showDrawer} from "../../../../redux/actions/appActions"
import { createProject, searchProjects, loadProject, deleteProject, updateProjectProperty, setMainProject} from "../../../../redux/actions/projectsActions"
import { loadSite} from "../../../../redux/actions/sitesActions"

import Button from "../../button"
import ListResults from "../../list"


class ProjectSettings extends Component {

    state = {
        loading: false
    }

    getQueryParams = () => {
        return qs.parse(this.props.location.search.substring(1));
    };
    

    handleTitleChange = (item, value) => {
        this.props.updateProjectProperty(item, "title", value, () => {
            this.props.loadProject()
            this.props.loadSite()
        })
    } 


    render() {
        return (
            <div className={"app-drawer-content-container standard-drawer project-settings-drawer "}>
                <div className={"drawer-action-header"}>
                    
                    <div className="drawer-action-header-left">
                        Projects
                    </div>

                    <div className="drawer-action-header-right">
                        <Button
                            label="Create project"
                            onClick={() => {
                                this.props.createProject({
                                    metadata: {
                                        title: "Untitled",
                                        createdBy: this.props.user._id
                                    }
                                }, () => {
                                    this.props.updateCollection(true)
                                    this.props.loadProject()
                                    this.props.loadSite()
                                })
                            }}
                        />
                    
                    </div>
                </div>


                <div className="placeholder">
                    <ListResults
                        type="site"
                        resultType="site"
                        searchCollection={this.props.searchProjects}
                        onDelete={(item) => {
                            this.props.deleteProject(item._id, item, () => {
                                this.props.updateCollection(true)
                                this.props.loadProject()
                                this.props.loadSite()
                            })
                        }}
                        onCreate={(item) => {
                            let finalItem = {
                                ...item,
                                metadata: {
                                    ...item.metadata,
                                    title: "Copy of " + item.metadata.title,
                                    main: false
                                }
                            }
                            this.props.createProject(finalItem, () => {
                                this.props.updateCollection(true)
                                this.props.loadProject()
                                this.props.loadSite()
                            })
                        }}
                        onEdit={(item, value) => {
                            this.handleTitleChange(item, value)
                        }}
                        mainSwitch={true}
                        mainFunction={(item, isMain) => {
                            this.props.uncheckAll(true, item._id)

                            this.props.setMainProject(item,!isMain, () => {
                            })

                            setTimeout(() => {
                                this.props.uncheckAll(false, this.props.app.dontUncheck)
                            }, 1000)
                        }}
                        onItemEdit={(item) => {
                            this.props.showDrawer("project-edit", item)
                        }}
                    />
                </div>
            </div>

        )


    }
}

function mapStateToProps(state) {
    return {
        app: state.app,
        user: state.app.user,
        authenticated: state.auth.authenticated,
    };
}

export default withRouter(connect(mapStateToProps, {
    createProject,
    searchProjects,
    updateCollection,
    loadProject,
    deleteProject,
    updateProjectProperty,
    uncheckAll,
    setMainProject,
    loadSite,
    updateProperty,
    showDrawer
})(ProjectSettings));
