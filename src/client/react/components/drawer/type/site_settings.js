import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Classes, Intent, Position, Toaster  } from "@blueprintjs/core";

import qs from "qs";
import * as _ from "lodash"

import { createSite } from "../../../../redux/actions/sitesActions"

import Button from "../../button"


class SiteSettings extends Component {

    state = {
        loading: false
    }

    getQueryParams = () => {
		return qs.parse(this.props.location.search.substring(1));
    };


	render() {
        return (
            <div className={"app-drawer-content-container standard-drawer site-settings-drawer theme-" + this.props.theme}>
                
                <div className={"details-container theme-" + this.props.theme}>
                    <Button 
                        label="create site"
                        onClick={() => {
                           this.props.createSite({
                                metadata: {
                                    title: "Untitled",
                                    createdBy: this.props.user._id
                                }
                           }) 
                        }}
                    />

                    <div className="placeholder"></div>
                </div>
            </div>

        )
 
		
	}
}

function mapStateToProps(state) {
	return {
        user: state.app.user,
        authenticated: state.auth.authenticated,
	};
}

export default withRouter(connect(mapStateToProps, {
    createSite
})(SiteSettings));
