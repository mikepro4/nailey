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

import { setMainpage, loadNewPageAsync } from "../../../../redux/actions/pagesActions"



class pageEdit extends Component {

    state = {
        loading: false
    }

    getQueryParams = () => {
        return qs.parse(this.props.location.search.substring(1));
    };

    render() {
        let page = this.props.page.newPage
        let pageEditorConfiguration = [
            {
                title: "Metadata",
                collapsible: false,
                components: [
                    {
                        type: "input",
                        label: "Title",
                        updateFunction: (value) => {
                            this.props.updateProperty("page", page, "title", value, () => {
                                this.props.loadNewPageAsync(page._id, true)
                            })
                        },
                        value: page && page.metadata.title
                    },
                    {
                        type: "input",
                        label: "Page URL",
                        updateFunction: (value) => {
                            this.props.updateProperty("page", page, "url", value, () => {
                                this.props.loadNewPageAsync(page._id, true)
                            })
                        },
                        value: page && page.metadata.url
                    },
                    {
                        type: "switch",
                        label: "Display home link",
                        updateFunction: (value) => {
                            this.props.updateProperty("page", page, "displayHomeLink", value, () => {
                                this.props.loadNewPageAsync(page._id, true)
                            })
                        },
                        active: page && page.metadata.displayHomeLink,
                        conditionalPropertyExpectedValue: true,
                        conditionalPropertyActualValue: page && page.metadata.home
                    }
                        
                ]
            }
        ]
        return (
            <div className="app-drawer-content-container standard-drawer page-edit-drawer">
                <div className="drawer-action-header">

                    <div className="drawer-action-header-left">
                        <div onClick={() => this.props.showDrawer("page-settings")}>
                            <ArrowBack />
                        </div>
                        <span className="drawer-action-header-title">
                            {page && page.metadata.title}
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
                        configuration={pageEditorConfiguration}
                        model="page"
                    />

                </div>
            </div>

        )


    }
}

function mapStateToProps(state) {
    return {
        app: state.app,
        page: state.page,
        user: state.app.user,
        authenticated: state.auth.authenticated,
    };
}

export default withRouter(connect(mapStateToProps, {
    hideDrawer,
    showDrawer,
    updateProperty,
    setMainpage,
    loadNewPageAsync,
    getOptions
})(pageEdit));
