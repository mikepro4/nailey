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
import update from "immutability-helper";
import { hideDrawer, showDrawer, updateProperty } from "../../../../redux/actions/appActions"

class DomainSettings extends Component {

    state = {
        loading: false
    }

    render() {

        return (
            <div className="app-drawer-content-container standard-drawer domain-edit-drawer">
                <div className="drawer-action-header">

                    <div className="drawer-action-header-left">
                        
                    </div>

                    <div className="drawer-action-header-right">
                        <div onClick={() => this.props.hideDrawer()}>
                            <Cross />
                        </div>
                    </div>
                </div>


                <div className="domain-settings-wrapper">
                    <div className="domain-settings-container">
                        
                        <div className="domain-page-top">
                            <div className="domain-page-title">
                                Domain
                            </div>

                            <div className="domain-page-description">
                                Your website is garaunted to work only with domains managed by Google.
                            </div>

                            <ul className="page-links-container">
                                <li className="page-link">
                                    <a href="#" className="line-hover">Buy domain on Google</a>
                                </li>
                                
                                <li className="page-link">
                                    <a href="#" className="line-hover">Transfer domain to Google</a>
                                </li>
                            </ul>
                        </div>

                        <div className="domain-page-bottom">
                            form here
                        </div>
                       
                    </div>

                </div>
            </div>

        )

    }
}

function mapStateToProps(state) {
    return {
        app: state.app,
        page: state.page,
        section: state.section,
        user: state.app.user,
        authenticated: state.auth.authenticated,
    };
}

export default withRouter(connect(mapStateToProps, {
    hideDrawer,
    showDrawer,
    updateProperty
})(DomainSettings));
