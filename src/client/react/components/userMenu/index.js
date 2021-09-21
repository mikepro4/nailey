import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import MainLinks from "../main_links"
import Logo from "../logo"
import { motion } from "framer-motion";
import Button from "../button"

import { enableEdit } from "../../../redux/actions/appActions"

class EditButton extends Component {

	render() {

        return (
            <div 
                className={classNames({
                    "user-menu": true,
                    "hidden": this.props.app.edit
                })}
            >

                <Button
                    minimal="true"
                    label="Logout"
                    onClick={() => {
                        this.props.history.push("/auth/logout")
                    }}
                />

                <Button
                    label="Edit"
                    onClick={() => this.props.enableEdit()}
                />

                
               
            </div>
        );
	}
}

function mapStateToProps(state) {
	return {
        user: state.app.user,
        app: state.app,
        location: state.router.location,
	};
}

export default connect(mapStateToProps, {
    enableEdit
})(withRouter(EditButton));
