import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Classes, Intent, Position, Toaster } from "@blueprintjs/core";

import qs from "qs";
import * as _ from "lodash"

import Editor from "../../editor"

import ArrowBack from "../../svg/arrow-back"
import Cross from "../../svg/cross"

import { hideDrawer, showDrawer, updateProperty, getOptions } from "../../../../redux/actions/appActions"

import { setMainproject, loadproject } from "../../../../redux/actions/projectsActions"


class projectEdit extends Component {

    state = {
        loading: false
    }

    getQueryParams = () => {
        return qs.parse(this.props.location.search.substring(1));
    };

    render() {
        let project = this.props.project.newProject
        let projectEditorConfiguration = [
            {
                title: "Metadata",
                collapsible: false,
                components: [
                    {
                        type: "input",
                        label: "Title",
                        updateFunction: (value) => {
                            this.props.updateProperty("project", project, "title", value, () => {})
                        },
                        value: project && project.metadata.title
                    },
                    {
                        type: "input",
                        label: "Domain",
                        updateFunction: (value) => {
                            this.props.updateProperty("project", project, "domain", value, () => {})
                        },
                        value: project && project.metadata.domain
                    }
                ]
            }
        ]
        return (
            <div className="app-drawer-content-container standard-drawer project-edit-drawer">
                <div className="drawer-action-header">

                    <div className="drawer-action-header-left">
                        <div onClick={() => this.props.showDrawer("project-settings")}>
                            <ArrowBack />
                        </div>
                        <span className="drawer-action-header-title">
                            {project && project.metadata.title}
                        </span>
                    </div>

                    <div className="drawer-action-header-right">
                        <div onClick={() => this.props.hideDrawer()}>
                            <Cross />
                        </div>
                    </div>
                </div>


                <div className="placeholder">

                    <Editor
                        configuration={projectEditorConfiguration}
                        model="project"
                    />

                </div>
            </div>

        )


    }
}

function mapStateToProps(state) {
    return {
        app: state.app,
        project: state.project,
        user: state.app.user,
        authenticated: state.auth.authenticated,
    };
}

export default withRouter(connect(mapStateToProps, {
    hideDrawer,
    showDrawer,
    updateProperty,
    setMainproject,
    loadproject,
    getOptions
})(projectEdit));
