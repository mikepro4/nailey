import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import MainLinks from "../main_links"
import Logo from "../logo"
import Button from "../button"
import { motion } from "framer-motion";

import { disableEdit} from "../../../redux/actions/appActions"

class EditBar extends Component {

	render() {

        return (
            <div 
                className={classNames({
                    "edit-bar": true,
                    "hidden": !this.props.edit,
                    "visible": this.props.edit
                })}
            >
               <div className="edit-bar-left">
                   <div className="edit-bar-title">
                        Editing
                   </div>

                   <ul className="edit-bar-tab">
                       <li className="edit-bar-single-tab">
                           Site
                       </li>
                       <li className="edit-bar-single-tab">
                           Page
                       </li>
                       <li className="edit-bar-single-tab">
                           Sections
                       </li>
                   </ul>
               </div>

               <div className="edit-bar-right">
                <Button
                        minimal="true"
                        label="Cancel"
                        onClick={() => this.props.disableEdit()}
                    />

                    <Button
                        label="Save"
                        onClick={() => this.props.disableEdit()}
                    />
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
        edit: state.app.edit
	};
}

export default connect(mapStateToProps, {
    disableEdit
})(withRouter(EditBar));
