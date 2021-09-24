import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { motion } from "framer-motion";

import Leyla from "../svg/leyla"
import Nailey from "../svg/nailey"

class Logo extends Component {

    renderLogo() {
        if(this.props.site.metadata.logoType == "image" && this.props.site.metadata.logoUrl) {
            return (
                <img src={this.props.site.metadata.logoUrl} />
            )
        }

        if(this.props.site.metadata.logoType == "text" && this.props.site.metadata.logoText) {
            return (
                <div className="logo-mai-text">{this.props.site.metadata.logoText}</div>
            )
        }
    }

	render() {

        const logo = {
            visible: { 
                opacity: 1, 
                transition: {
                    duration: 0.5,
                    delay: 0.3
                } 
            },
            hidden: { 
                opacity: 0 
            },
        }

        return (
            <div 
                className={classNames({
                    "app-logo": true
                })}

            >   <div className="logo-wrapper">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={logo}
                    >
                        <Link to="/" className="app-logo-name">
                            {this.renderLogo()}
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
	}
}

function mapStateToProps(state) {
	return {
		user: state.app.user,
        location: state.router.location,
        site: state.site.currentSite
	};
}

export default connect(mapStateToProps, {
})(withRouter(Logo));
