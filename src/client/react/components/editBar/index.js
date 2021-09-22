import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import MainLinks from "../main_links"
import Logo from "../logo"
import Button from "../button"
import { motion } from "framer-motion";

import { disableEdit, showDrawer, hideDrawer} from "../../../redux/actions/appActions"

class EditBar extends Component {

    state = {
        sections: [
            {
                title: "Site",
                drawerType: "site-settings"
            },
            {
                title: "Page",
                drawerType: "page-settings"
            },
            {
                title: "Themes",
                drawerType: "theme-settings"
            },
            {
                title: "Sections",
                drawerType: "section-settings"
            },
            {
                title: "Products",
                drawerType: "product-settings"
            },
            ,
            {
                title: "Fonts",
                drawerType: "font-settings"
            }
        ]
    }

    toggleDrawer(drawer) {
        if(this.props.app.drawerType == drawer) {
            this.props.hideDrawer()
        } else {
            this.props.showDrawer(drawer)
        }
    }

    renderSectionItems(section) {
        let finalItem = this.state.sections.map((section, i) => {
            return(
                <li 
                    className={classNames({
                        "edit-bar-single-tab": true,
                        "tab-active": this.props.app.drawerType == section.drawerType
                    })}
                    key={i}
                    onClick={() =>  this.toggleDrawer(section.drawerType)
                }>
                    {section.title}
                </li>
            )
        })

        return finalItem
    }

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
                   {/* <div className="edit-bar-title">
                        Editing
                   </div> */}

                   <ul className="edit-bar-tab">
                       {this.renderSectionItems()}
                   </ul>
               </div>

               <div className="edit-bar-right">
                <Button
                        minimal="true"
                        label="Hide"
                        onClick={() =>  {
                                this.props.disableEdit()
                                this.props.hideDrawer()
                            }
                        }
                    />

                    {/* <Button
                        label="Save"
                        onClick={() => this.props.disableEdit()}
                    /> */}
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
    disableEdit,
    showDrawer,
    hideDrawer
})(withRouter(EditBar));
