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

import { setMainSite, loadSite, loadNewSiteAsync } from "../../../../redux/actions/sitesActions"
import { allSitePages, createPage, deletePage } from "../../../../redux/actions/pagesActions"


class SiteEdit extends Component {

    state = {
        loading: false
    }

    getQueryParams = () => {
        return qs.parse(this.props.location.search.substring(1));
    };

    render() {
        // let site = this.props.site.currentSite
        let site = this.props.site.newSite

        let loadCurrent = true

        let siteEditorConfiguration = [
            
            {
                collapsible: false,
                components: [
                    {
                        type: "switch",
                        label: "Main site",
                        updateFunction: (value) => {
                            this.props.setMainSite(site, value, () => {
                                this.props.loadNewSiteAsync(site._id, loadCurrent)
                            })
                        },
                        active: site && site.metadata.main
                    }
                ]
            },
            {
                title: "Pages",
                collapsible: true,
                components: [
                    {
                        type: "linker",
                        collection: site && site.metadata.pages,
                        updateFunction: (value) => {
                            this.props.updateProperty("site", site, "pages", value, () => {
                                this.props.loadNewSiteAsync(site._id, loadCurrent)
                            })
                        },
                        updateItemFunction: (value, item, success) => {
                            this.props.updateProperty("page", item, "title", value, () => {
                                success()
                            })
                        },
                        loadResults: (success) => {
                            this.props.allSitePages(site._id, (results) => {
                                this.props.loadNewSiteAsync(site._id, loadCurrent)
                                success(results)
                            })
                        },
                        createFunction: (count, success) => {
                            this.props.createPage({
                                metadata: {
                                    title: "Page " + count,
                                    createdBy: this.props.user._id,
                                    siteId: site._id,
                                }
                            }, () => {
                                this.props.loadNewSiteAsync(site._id, loadCurrent, () => {
                                     success()
                                })
                            })
                        },
                        deleteFunction: (pageId, pageItem, success) => {
                            this.props.deletePage(pageId, pageItem, () => {
                                this.props.loadNewSiteAsync(site._id, loadCurrent, () => {
                                    success()
                                })
                            })
                        },
                        duplicateFunction: (item, success) => {
                            this.props.createPage({
                                metadata: {
                                    ...item.metadata,
                                    title: "Copy of " + item.metadata.title,
                                    order: item.metadata.order + 1,
                                    home: false
                                }
                            }, () => {
                                this.props.loadNewSiteAsync(site._id, loadCurrent, () => {
                                    success()
                                })
                            })
                        },
                    }
                ],

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
                                this.props.loadNewSiteAsync(site._id, loadCurrent)
                            })
                        },
                        value: site && site.metadata.title
                    },
                    {
                        type: "textarea",
                        label: "Description",
                        updateFunction: (value) => {
                            this.props.updateProperty("site", site, "description", value, () => {
                                this.props.loadNewSiteAsync(site._id, loadCurrent)
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
                                this.props.loadNewSiteAsync(site._id, loadCurrent)
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
                                this.props.loadNewSiteAsync(site._id, loadCurrent)
                            })
                        },
                        value: site && site.metadata.theme && site.metadata.theme.label
                    },
                    {
                        label: "Color",
                        type: "tab",
                        updateFunction: (value) => {
                            this.props.updateProperty("site", site, "color", value, () => {
                                this.props.loadNewSiteAsync(site._id, loadCurrent)
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
            },,
            {
                title: "Sizing",
                collapsible: true,
                components: [
                    {
                        type: "switch",
                        label: "Full width",
                        updateFunction: (value) => {
                            this.props.updateProperty("site", site, "fullWidth", value, () => {
                                this.props.loadNewSiteAsync(site._id, loadCurrent)
                            })
                        },
                        active: site && site.metadata.fullWidth,
                        
                    },
                    {
                        type: "numericInput",
                        label: "Max width",
                        updateFunction: (value) => {
                            this.props.updateProperty("site", site, "maxWidth", value, () => {
                                this.props.loadNewSiteAsync(site._id, loadCurrent)
                            })
                        },
                        value: site && site.metadata.maxWidth,
                        conditionalPropertyExpectedValue: false,
                        conditionalPropertyActualValue: site && site.metadata.fullWidth
                    },
                    {
                        type: "numericInput",
                        label: "Mobile breakpoint",
                        updateFunction: (value) => {
                            this.props.updateProperty("site", site, "mobileBreakpoint", value, () => {
                                this.props.loadNewSiteAsync(site._id, loadCurrent)
                            })
                        },
                        value: site && site.metadata.mobileBreakpoint,
                    }
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
                                this.props.loadNewSiteAsync(site._id, loadCurrent)
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
                                this.props.loadNewSiteAsync(site._id, loadCurrent)
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
                                this.props.loadNewSiteAsync(site._id, loadCurrent)
                            })
                        },
                        value: site && site.metadata.logoUrl,
                        conditionalPropertyExpectedValue: "image",
                        conditionalPropertyActualValue: site && site.metadata.logoType
                    },
                    {
                        type: "numericInput",
                        label: "Logo Width",
                        updateFunction: (value) => {
                            this.props.updateProperty("site", site, "logoWidth", value, () => {
                                this.props.loadNewSiteAsync(site._id, loadCurrent)
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
                                this.props.loadNewSiteAsync(site._id, loadCurrent)
                            })
                        },
                        value: site && site.metadata.logoHeight,
                        conditionalPropertyExpectedValue: false,
                        conditionalPropertyActualValue: site && site.metadata.logoAutoSize
                    },
                    {
                        type: "image",
                        updateFunction: (value) => {
                            console.log("here", value )
                            this.props.updateProperty("site", site, "logoUrl", value, () => {
                                this.props.loadNewSiteAsync(site._id, loadCurrent)
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
                                this.props.loadNewSiteAsync(site._id, loadCurrent)
                            })
                        },
                        active: site && site.metadata.logoAutoSize,
                        conditionalPropertyExpectedValue: "image",
                        conditionalPropertyActualValue: site && site.metadata.logoType
                    },
                ]
            },
            {
                title: "Header",
                collapsible: true,
                components: [
                    {
                        label: "Logo position",
                        type: "tab",
                        updateFunction: (value) => {
                            this.props.updateProperty("site", site, "logoPosition", value, () => {
                                this.props.loadNewSiteAsync(site._id, loadCurrent)
                            })
                        },
                        tabOptions: [{
                            value: "left",
                            label: "Left"
                        },
                        {
                            value: "center",
                            label: "Center"
                        },
                        {
                            value: "right",
                            label: "Right"
                        }],
                        value: site && site.metadata.logoPosition
                    },
                    {
                        type: "switch",
                        label: "Display main links",
                        updateFunction: (value) => {
                            this.props.updateProperty("site", site, "mainLinks", value, () => {
                                this.props.loadNewSiteAsync(site._id, loadCurrent)
                            })
                        },
                        active: site && site.metadata.mainLinks,
                    },
                    {
                        label: "Main links position",
                        type: "tab",
                        updateFunction: (value) => {
                            this.props.updateProperty("site", site, "mainLinksPosition", value, () => {
                                this.props.loadNewSiteAsync(site._id, loadCurrent)
                            })
                        },
                        tabOptions: [{
                            value: "left",
                            label: "Left"
                        },
                        {
                            value: "center",
                            label: "Center"
                        },
                        {
                            value: "right",
                            label: "Right"
                        }],
                        value: site && site.metadata.mainLinksPosition,
                        conditionalPropertyExpectedValue: true,
                        conditionalPropertyActualValue: site && site.metadata.mainLinks
                    },
                    {
                        type: "switch",
                        label: "Display CTA",
                        updateFunction: (value) => {
                            this.props.updateProperty("site", site, "mainCTA", value, () => {
                                this.props.loadNewSiteAsync(site._id, loadCurrent)
                            })
                        },
                        active: site && site.metadata.mainCTA,
                    },
                    {
                        label: "CTA Position",
                        type: "tab",
                        updateFunction: (value) => {
                            this.props.updateProperty("site", site, "mainCTAPosition", value, () => {
                                this.props.loadNewSiteAsync(site._id, loadCurrent)
                            })
                        },
                        tabOptions: [{
                            value: "left",
                            label: "Left"
                        },
                        {
                            value: "center",
                            label: "Center"
                        },
                        {
                            value: "right",
                            label: "Right"
                        }],
                        value: site && site.metadata.mainCTAPosition,
                        conditionalPropertyExpectedValue: true,
                        conditionalPropertyActualValue: site && site.metadata.mainCTA
                    },
                    {
                        type: "input",
                        label: "CTA Text",
                        updateFunction: (value) => {
                            this.props.updateProperty("site", site, "mainCTAText", value, () => {
                                this.props.loadNewSiteAsync(site._id, loadCurrent)
                            })
                        },
                        value: site && site.metadata.mainCTAText,
                        conditionalPropertyExpectedValue: true,
                        conditionalPropertyActualValue: site && site.metadata.mainCTA
                    },
                    {
                        type: "input",
                        label: "CTA URL",
                        updateFunction: (value) => {
                            this.props.updateProperty("site", site, "mainCTAURL", value, () => {
                                this.props.loadNewSiteAsync(site._id, loadCurrent)
                            })
                        },
                        value: site && site.metadata.mainCTAURL,
                        conditionalPropertyExpectedValue: true,
                        conditionalPropertyActualValue: site && site.metadata.mainCTA
                    },
                    {
                        type: "numericInput",
                        label: "CTA Width",
                        updateFunction: (value) => {
                            this.props.updateProperty("site", site, "mainCTAWidth", value, () => {
                                this.props.loadNewSiteAsync(site._id, loadCurrent)
                            })
                        },
                        value: site && site.metadata.mainCTAWidth,
                        conditionalPropertyExpectedValue: true,
                        conditionalPropertyActualValue: site && site.metadata.mainCTA
                    },
                ]
            },
            {
                title: "Footer",
                collapsible: true,
                components: []
            }

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
    getOptions,
    allSitePages,
    createPage,
    deletePage,
    loadNewSiteAsync
})(SiteEdit));
