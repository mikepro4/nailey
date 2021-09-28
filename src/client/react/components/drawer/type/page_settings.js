import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Classes, Intent, Position, Toaster } from "@blueprintjs/core";

import qs from "qs";
import * as _ from "lodash"

import { hideDrawer, showDrawer, updateProperty, getOptions, updateCollection } from "../../../../redux/actions/appActions"

import { setMainSite, loadSite, loadNewSiteAsync } from "../../../../redux/actions/sitesActions"
import { allSitePages, createPage, deletePage } from "../../../../redux/actions/pagesActions"

import Cross from "../../svg/cross"
import Editor from "../../editor"


class PageSettings extends Component {

    state = {
        loading: false
    }

    getQueryParams = () => {
        return qs.parse(this.props.location.search.substring(1));
    };
    

    handleTitleChange = (item, value) => {
        this.props.updatePageProperty(item, "title", value, () => {
            this.props.loadPage()
            this.props.loadSite()
        })
    } 


    render() {
        let site = this.props.site.currentSite

        let loadCurrent = true

        let pagesEditor = [
            {
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
                                    url: "/page" + count
                                },
                                pagesCount: count
                            }, () => {
                                this.props.loadNewSiteAsync(site._id, loadCurrent, () => {
                                     success()
                                     this.props.updateCollection(true)
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
                                },
                                pagesCount: site.metadata.pages.length
                            }, () => {
                                this.props.updateCollection(true)
                                this.props.loadNewSiteAsync(site._id, loadCurrent, () => {
                                    success()
                                })
                            })
                        },
                    }
                ],

            }
  
        ]
        return (
            <div className={"app-drawer-content-container standard-drawer page-settings-drawer "}>
                <div className={"drawer-action-header"}>
                    
                    <div className="drawer-action-header-left">
                        Pages
                    </div>

                    <div className="drawer-action-header-right">
                        
                        <div onClick={() => this.props.hideDrawer()}>
                            <Cross />
                        </div>
                    </div>
                </div>


                <div className="placeholder">
                    <Editor
                        configuration={pagesEditor}
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
        site: state.site
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
    loadNewSiteAsync,
    updateCollection
})(PageSettings));
