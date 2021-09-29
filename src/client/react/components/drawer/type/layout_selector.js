import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Classes, Intent, Position, Toaster } from "@blueprintjs/core";

import qs from "qs";
import * as _ from "lodash"

import Editor from "../../editor"

import ArrowBack from "../../svg/arrow-back"
import Button from "../../button"
import Cross from "../../svg/cross"

import { hideDrawer, showDrawer, updateProperty } from "../../../../redux/actions/appActions"
import { loadSite} from "../../../../redux/actions/sitesActions"


class LayoutSelector extends Component {

    state = {
        loading: false 
    }

    updatePage(value, section) {
        let drawerData = this.props.app.drawerData
        let commonProperties = this.props.layout.allLayouts[section].commonProperties
        let layouts = this.props.layout.allLayouts[section].layouts
        let page = this.props.page.currentPage

        let selectedLayout = _.filter(layouts, {
            value: value
        })

        let finalLayout = _.concat(page.metadata.sections, selectedLayout)

        if(drawerData && drawerData.insertPosition) {

        } else {
            finalLayout = _.map(finalLayout, (item) => {

                let newProperties = _.concat(commonProperties, item.properties)

                let newItem = {
                    ...item,
                    section: section,
                    properties: newProperties
                }
                return newItem
            })
        }

        this.props.updateProperty("page", page, "sections", finalLayout, () => {
            this.props.loadSite()
        })

    }

    render() {

        let drawerData = this.props.app.drawerData
        let layoutSelectorConfiguration = [
            {
                id: 1,
                title: "Hero",
                collapsible: true,
                forceOpen: drawerData && drawerData.forceOpen == 1,
                components: [
                   {
                    type: "layoutOptionSelector",
                    options: this.props.layout.allLayouts.hero.layouts,
                    updateFunction: (value) => {
                        this.updatePage(value, "hero")
                    },
                    value: drawerData && drawerData.selectedLayout
                   }
                ]
            },
            {
                title: "Text Block",
                collapsible: true,
                components: [
                   
                ]
            },
            {
                title: "Headline",
                collapsible: true,
                components: [
                   
                ]
            },
            {
                title: "Media",
                collapsible: true,
                components: [
                   
                ]
            },
            {
                title: "Lists",
                collapsible: true,
                components: [
                   
                ]
            }
        ]

        return (
            <div className="app-drawer-content-container standard-drawer page-edit-drawer">
                <div className="drawer-action-header">

                    <div className="drawer-action-header-left">
                        <div onClick={() => this.props.showDrawer("section-user-settings")}>
                            <ArrowBack />
                        </div>
                        <span className="drawer-action-header-title">
                            Select layout
                        </span>
                    </div>

                    <div className="drawer-action-header-right" onClick={() => {
                                this.props.showDrawer("section-user-settings")
                            }}>
                        <Cross
                            
                        />
                    </div>
                </div>


                <div className="placeholder">
                    <Editor
                        configuration={layoutSelectorConfiguration}
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
        layout: state.layout
    };
}

export default withRouter(connect(mapStateToProps, {
    hideDrawer,
    showDrawer,
    updateProperty,
    loadSite
})(LayoutSelector));
