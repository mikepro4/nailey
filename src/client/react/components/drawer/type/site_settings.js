import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster  } from "@blueprintjs/core";

import qs from "qs";
import * as _ from "lodash"


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
                    content

                    <div className="placeholder"></div>

                </div>
            </div>

        )
 
		
	}
}

function mapStateToProps(state) {
	return {
        theme: state.app.theme,
        user: state.app.user,
        authenticated: state.auth.authenticated,
	};
}

export default withRouter(connect(mapStateToProps, {
})(SiteSettings));
