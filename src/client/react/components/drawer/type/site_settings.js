import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Classes, Intent, Position, Toaster } from "@blueprintjs/core";

import qs from "qs";
import * as _ from "lodash"

import { updateCollection, uncheckAll } from "../../../../redux/actions/appActions"
import { createSite, searchSites, loadSite, deleteSite, updateSiteProperty, setMainSite} from "../../../../redux/actions/sitesActions"

import Button from "../../button"
import ListResults from "../../list"


class SiteSettings extends Component {

    state = {
        loading: false
    }

    getQueryParams = () => {
        return qs.parse(this.props.location.search.substring(1));
    };
    

    handleTitleChange = (item, value) => {
        this.props.updateSiteProperty(item, "title", value, () => {
            this.props.loadSite()
        })
    } 


    render() {
        return (
            <div className={"app-drawer-content-container standard-drawer site-settings-drawer theme-" + this.props.theme}>
                <div className={"drawer-action-header theme-" + this.props.theme}>
                    
                    <div className="drawer-action-header-left">
                        {this.props.site.count} site{this.props.site.count > 1 ? "s" : ""}
                    </div>

                    <div className="drawer-action-header-right">
                        <Button
                            label="Create site"
                            onClick={() => {
                                this.props.createSite({
                                    metadata: {
                                        title: "Untitled",
                                        createdBy: this.props.user._id
                                    }
                                }, () => {
                                    this.props.updateCollection(true)
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
                        searchCollection={this.props.searchSites}
                        onDelete={(item) => {
                            this.props.deleteSite(item._id, item, () => {
                                this.props.updateCollection(true)
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
                            this.props.createSite(finalItem, () => {
                                this.props.updateCollection(true)
                                this.props.loadSite()
                            })
                        }}
                        onEdit={(item, value) => {
                            this.handleTitleChange(item, value)
                        }}
                        mainSwitch={true}
                        mainFunction={(item, isMain) => {
                            this.props.uncheckAll(true, item._id)

                            this.props.setMainSite(item,!isMain, () => {
                                this.props.loadSite()
                            })

                            setTimeout(() => {
                                this.props.uncheckAll(false, this.props.app.dontUncheck)
                            }, 1000)

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
        site: state.site,
        user: state.app.user,
        authenticated: state.auth.authenticated,
    };
}

export default withRouter(connect(mapStateToProps, {
    createSite,
    searchSites,
    updateCollection,
    loadSite,
    deleteSite,
    updateSiteProperty,
    uncheckAll,
    setMainSite
})(SiteSettings));
