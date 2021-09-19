import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import MainLinks from "../main_links"
import Logo from "../logo"
import Button from "../button"
import { motion } from "framer-motion";

class Header extends Component {

	render() {
        const logo = {
            visible: { 
                y: 0, 
                opacity: 1, 
                transition: {
                    type: "spring",
                    stiffness: 122,
                    damping: 22,
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
                    "app-header": true
                })}
            >
                <div className="header-wrapper">
                    <MainLinks />
                    <Logo/>

                    <div className="header-right">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={logo}
                        >
                            <Button
                                label={this.props.app.site.ctaText}
                                linkUrl={this.props.app.site.ctaUrl}
                                minimal={true}
                            />
                        </motion.div>
                    </div>
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
	};
}

export default connect(mapStateToProps, {
})(withRouter(Header));
