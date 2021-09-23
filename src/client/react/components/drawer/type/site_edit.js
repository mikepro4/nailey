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

import { hideDrawer, showDrawer, updateProperty } from "../../../../redux/actions/appActions"

import { setMainSite, loadSite } from "../../../../redux/actions/sitesActions"


class SiteEdit extends Component {

    state = {
        loading: false
    }

    getQueryParams = () => {
        return qs.parse(this.props.location.search.substring(1));
    };
    

    handleTitleChange = (item, value) => {
        this.props.updateFontProperty(item, "title", value, () => {
            this.props.loadFont()
            this.props.loadSite()
        })
    } 

    handlMainSwitch = (value) => {
        this.props.setMainSite(this.props.app.drawerData, value, () => {
            // this.props.loadSite()
        })
    } 

    handlePreviewSwitch = (value) => {
        console.log(value)
    }


    render() {
        let siteEditorConfiguration = [
            {
                collapsible: false,
                components: [
                    {
                        type: "switch",
                        label: "Main site",
                        switchFunction: (value) => { this.handlMainSwitch(value)},
                        active: this.props.app.drawerData && this.props.app.drawerData.metadata.main
                    },
                    {
                        type: "switch",
                        label: "Preview",
                        switchFunction: (value) => { this.handlePreviewSwitch(value)}
                    }
                ]
            },
            {
                title: "Meta",
                collapsible: true,
                components: [
                    {
                        type: "input",
                        label: "Main site",
                        property: "title"
                    },
                    {
                        type: "textarea",
                        label: "Description",
                        property: "title"
                    },
                    {
                        type: "select",
                        label: "Theme",
                        property: "theme",
                        collectionName: "themes"
                    }
                ]
            },
            {
                title: "Logo",
                collapsible: true,
                components: []
            },
            {
                title: "Header",
                collapsible: true,
                components: []
            },
            {
                title: "Footer",
                collapsible: true,
                components: []
            },
            {
                title: "Pages",
                collapsible: true,
                components: [
                    {
                        type: "CRUD",
                        collectionName: "pages",
                        model: {
                            title: "Untitled"
                        }
                    }
                ],
                property: "pages"
            },

        ]
        return (
            <div className="app-drawer-content-container standard-drawer site-edit-drawer">
                <div className="drawer-action-header">
                    
                    <div className="drawer-action-header-left">
                        <div onClick={()=> this.props.showDrawer("site-settings")}>
                            <ArrowBack/>
                        </div>
                        <span className="drawer-action-header-title">
                            {this.props.app.drawerData && this.props.app.drawerData.metadata.title}
                        </span>
                    </div>

                    <div className="drawer-action-header-right">
                        <div onClick={()=> this.props.hideDrawer()}>
                            <Cross />

                        </div>
                    </div>
                </div>


                <div className="placeholder">

                   <Editor
                        configuration={siteEditorConfiguration}
                        model="site"
                   />

                </div>
            </div>

        )


    }
}

function mapStateToProps(state) {
    return {
        app: state.app,
        site: state.site,
        user: state.app.user,
        authenticated: state.auth.authenticated,
    };
}

export default withRouter(connect(mapStateToProps, {
    hideDrawer,
    showDrawer,
    updateProperty,
    setMainSite,
    loadSite
})(SiteEdit));
