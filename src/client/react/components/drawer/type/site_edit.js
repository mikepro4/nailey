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

import { setMainSite, loadSite } from "../../../../redux/actions/sitesActions"


class SiteEdit extends Component {

    state = {
        loading: false
    }

    getQueryParams = () => {
        return qs.parse(this.props.location.search.substring(1));
    };

    render() {
        let site = this.props.site.currentSite
        let siteEditorConfiguration = [
            {
                collapsible: false,
                components: [
                    {
                        type: "switch",
                        label: "Main site",
                        updateFunction: (value) => {
                            this.props.setMainSite(this.props.site.currentSite, value, () => {
                                this.props.loadSite()
                            })
                        },
                        active: site && site.metadata.main
                    }
                ]
            },
            {
                title: "Meta",
                collapsible: true,
                components: [
                    {
                        type: "input",
                        label: "Title",
                        updateFunction: (value) => {
                            this.props.updateProperty("site", site, "title", value, () => {
                                this.props.loadSite()
                            })
                        },
                        value: site && site.metadata.title
                    },
                    {
                        type: "textarea",
                        label: "Description",
                        updateFunction: (value) => {
                            this.props.updateProperty("site", site, "description", value, () => {
                                this.props.loadSite()
                            })
                        },
                        value: site && site.metadata.description
                    },
                    {
                        type: "select",
                        label: "Status",
                        options: [
                            {
                                value: "draft",
                                label: "Draft"
                            },
                            {
                                value: "active",
                                label: "Active"
                            }
                        ],
                        updateFunction: (value) => {
                            this.props.updateProperty("site", site, "status", value, () => {
                                this.props.loadSite()
                            })
                        },
                        value: site && site.metadata.status
                    },
                    {
                        type: "selectAsync",
                        label: "Theme",
                        loadOptions: (inputValue, callback) => {
                            this.props.getOptions("theme", inputValue, (data) => {

                                let finalOptions = data.map((item) => {
                                    return {
                                        value: item._id,
                                        label: item.metadata.title
                                    }
                                })

                                callback(finalOptions);
                            })
                        },
                        updateFunction: (value) => {
                            this.props.updateProperty("site", site, "theme", value, () => {
                                this.props.loadSite()
                            })
                        },
                        value: site && site.metadata.theme && site.metadata.theme.label
                    },
                    {
                        label: "Color",
                        type: "tab",
                        updateFunction: (value) => {
                            this.props.updateProperty("site", site, "color", value, () => {
                                this.props.loadSite()
                            })
                        },
                        tabOptions: [{
                            value: "black",
                            label: "Black"
                        },
                        {
                            value: "white",
                            label: "White"
                        }],
                        value: site && site.metadata.color
                    },
                ]
            },
            {
                title: "Logo",
                collapsible: true,
                components: [
                    {
                        label: "Logo Type",
                        type: "tab",
                        updateFunction: (value) => {
                            this.props.updateProperty("site", site, "logoType", value, () => {
                                this.props.loadSite()
                            })
                        },
                        tabOptions: [{
                            value: "text",
                            label: "Text"
                        },
                        {
                            value: "image",
                            label: "Image"
                        }],
                        value: site && site.metadata.logoType
                    },
                    {
                        type: "input",
                        label: "Logo Text",
                        property: "title",
                        updateFunction: (value) => {
                            this.props.updateProperty("site", site, "logoText", value, () => {
                                this.props.loadSite()
                            })
                        },
                        value: site && site.metadata.logoText,
                        conditionalPropertyExpectedValue: "text",
                        conditionalPropertyActualValue: site && site.metadata.logoType
                    },
                    {
                        type: "input",
                        label: "Logo URL",
                        updateFunction: (value) => {
                            this.props.updateProperty("site", site, "logoUrl", value, () => {
                                this.props.loadSite()
                            })
                        },
                        value: site && site.metadata.logoUrl,
                        conditionalPropertyExpectedValue: "image",
                        conditionalPropertyActualValue: site && site.metadata.logoType
                    },
                    {
                        type: "switch",
                        label: "Auto logo size",
                        updateFunction: (value) => {
                            this.props.updateProperty("site", site, "logoAutoSize", value, () => {
                                this.props.loadSite()
                            })
                        },
                        active: site && site.metadata.logoAutoSize
                    },
                    {
                        type: "numericInput",
                        label: "Logo Width",
                        updateFunction: (value) => {
                            this.props.updateProperty("site", site, "logoWidth", value, () => {
                                this.props.loadSite()
                            })
                        },
                        value: site && site.metadata.logoWidth,
                        conditionalPropertyExpectedValue: false,
                        conditionalPropertyActualValue: site && site.metadata.logoAutoSize
                    },
                    {
                        type: "numericInput",
                        label: "Logo Height",
                        updateFunction: (value) => {
                            this.props.updateProperty("site", site, "logoHeight", value, () => {
                                this.props.loadSite()
                            })
                        },
                        value: site && site.metadata.logoHeight,
                        conditionalPropertyExpectedValue: false,
                        conditionalPropertyActualValue: site && site.metadata.logoAutoSize
                    },
                ]
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
                        model: {
                            title: "Untitled",
                            sections: []
                        },
                        property: "pages",
                        updateFunction: (value) => {
                            this.props.updateProperty("site", site, "pages", value, () => {
                                this.props.loadSite()
                            })
                        },
                        value: site && site.metadata.pages
                    }
                ],

            },

        ]
        return (
            <div className="app-drawer-content-container standard-drawer site-edit-drawer">
                <div className="drawer-action-header">

                    <div className="drawer-action-header-left">
                        <div onClick={() => this.props.showDrawer("site-settings")}>
                            <ArrowBack />
                        </div>
                        <span className="drawer-action-header-title">
                            {site && site.metadata.title}
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
    loadSite,
    getOptions
})(SiteEdit));
