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

import { hideDrawer, showDrawer } from "../../../../redux/actions/appActions"


class LayoutSelector extends Component {

    state = {
        loading: false
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
                    options: [
                        {
                            value: "layout1",
                            label: "Layout 1"
                        },
                        {
                            value: "layout2",
                            label: "Layout 2"
                        },
                        {
                            value: "layout3",
                            label: "Layout 3"
                        }
                    ],
                    updateFunction: (value) => {
                        console.log(value)
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

                    <div className="drawer-action-header-right">
                        <Button
                            label="Cancel"
                            onClick={() => {
                                this.props.showDrawer("section-user-settings")
                            }}
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
    };
}

export default withRouter(connect(mapStateToProps, {
    hideDrawer,
    showDrawer
})(LayoutSelector));
