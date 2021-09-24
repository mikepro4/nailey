import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Classes, Intent, Position, Toaster } from "@blueprintjs/core";

import qs from "qs";
import * as _ from "lodash"

import { updateCollection, uncheckAll } from "../../../../redux/actions/appActions"
import { createPage, searchPages, loadPage, deletePage, updatePageProperty, setMainPage} from "../../../../redux/actions/pagesActions"
import { loadSite} from "../../../../redux/actions/sitesActions"

import Button from "../../button"
import ListResults from "../../list"


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
        return (
            <div className={"app-drawer-content-container standard-drawer page-settings-drawer "}>
                <div className={"drawer-action-header"}>
                    
                    <div className="drawer-action-header-left">
                        Pages
                    </div>

                    <div className="drawer-action-header-right">
                        <Button
                            label="Create page"
                            onClick={() => {
                                this.props.createPage({
                                    metadata: {
                                        title: "Untitled",
                                        createdBy: this.props.user._id
                                    }
                                }, () => {
                                    this.props.updateCollection(true)
                                    this.props.loadPage()
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
                        searchCollection={this.props.searchPages}
                        onDelete={(item) => {
                            this.props.deletePage(item._id, item, () => {
                                this.props.updateCollection(true)
                                this.props.loadPage()
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
                            this.props.createPage(finalItem, () => {
                                this.props.updateCollection(true)
                                this.props.loadPage()
                                this.props.loadSite()
                            })
                        }}
                        onEdit={(item, value) => {
                            this.handleTitleChange(item, value)
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
    createPage,
    searchPages,
    updateCollection,
    loadPage,
    deletePage,
    updatePageProperty,
    uncheckAll,
    setMainPage,
    loadSite
})(PageSettings));
