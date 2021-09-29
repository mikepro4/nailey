import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Classes, Intent, Position, Toaster } from "@blueprintjs/core";

import qs from "qs";
import * as _ from "lodash"
import update from "immutability-helper";

import { v4 as uuidv4 } from 'uuid';

import { hideDrawer, updateProperty } from "../../../../redux/actions/appActions"
import { loadPage} from "../../../../redux/actions/pagesActions"
import { loadSite } from "../../../../redux/actions/sitesActions"
import { layoutActive} from "../../../../redux/actions/layoutActions"

import Cross from "../../svg/cross"
import Editor from "../../editor"


class SectionUserSettings extends Component {

    state = {
        loading: false
    }

    getQueryParams = () => {
        return qs.parse(this.props.location.search.substring(1));
    };

    componentDidMount = () => {
        let drawerData = this.props.app.drawerData

        if(drawerData && drawerData.selectId) {
            this.props.layoutActive(drawerData.selectId)
        }
    }
    

    handleTitleChange = (item, value) => {
        this.props.updateSectionProperty(item, "title", value, () => {
            this.props.loadSection()
            this.props.loadSite()
        })
    } 

    deleteSection = () => {

    }

    deletePage(position) {
        let page = this.props.page.currentPage

        let finalLayout = update(page.metadata.sections, {
            $splice: [[position, 1]]
        });

        this.props.updateProperty("page", page, "sections", finalLayout, () => {
            this.props.loadSite()
        })

    }

    duplicatePage(position, item) {
        let page = this.props.page.currentPage

        let newItem = {
            ...item,
            id: uuidv4()
        }

        let finalLayout = update(page.metadata.sections, {
            $splice: [[position, 0, newItem]]
        });

        this.props.updateProperty("page", page, "sections", finalLayout, () => {
            this.props.loadSite()
        })

    }



    render() {

        let page = this.props.page.currentPage;

        let layoutEditorConfiguration = []

        if(page && page.metadata) {
            layoutEditorConfiguration = [
                {
                    collapsible: false,
                    noPadding: true,
                    components: [
                        {
                            type: "layout",
                            updateFunction: (layout) => {
                                this.props.updateProperty("page", page, "sections", layout, () => {
                                    this.props.loadSite()
                                })
                            },
                            deleteFunction: (position) => {
                                this.deletePage(position)
                            },
                            duplicateFunction: (position, item) => {
                                this.duplicatePage(position, item)
                            },
                            value: page && page.metadata.sections
                        }  
                    ]
                }
            ]
        }

        return (
            <div className={"app-drawer-content-container standard-drawer section-settings-drawer"}>
                <div className={"drawer-action-header"}>
                    
                    <div className="drawer-action-header-left">
                        <span className="drawer-action-header-title">
                            Sections
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
                        configuration={layoutEditorConfiguration}
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
        page: state.page
    };
}

export default withRouter(connect(mapStateToProps, {
    loadPage,
    hideDrawer,
    layoutActive,
    loadSite,
    updateProperty
})(SectionUserSettings));
