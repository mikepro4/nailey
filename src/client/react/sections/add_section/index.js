import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import * as _ from "lodash"
import { motion } from "framer-motion";
import { Icon } from "@blueprintjs/core";

import { enableEdit, showDrawer } from "../../../redux/actions/appActions"

class AddSection extends Component {
   
	render() {

        return (
            <div 
                className={classNames({
                    "add-section": true,
                    "editing": this.props.app.edit,
                    "active": this.props.active
                })}
            >

                <div className="epic-plus-container">
                    <Icon icon="plus" />
                </div>

            </div>
        );
	}
}

function mapStateToProps(state) {
	return {
        user: state.app.user,
        app: state.app,
        location: state.router.location,
        page: state.page
	};
}

export default connect(mapStateToProps, {
    enableEdit,
    showDrawer
})(withRouter(AddSection));
