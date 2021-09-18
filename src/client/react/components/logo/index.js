import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { motion } from "framer-motion";

class Logo extends Component {

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
                        <Link to="/" className="app-logo-name">Nailey</Link>
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
	};
}

export default connect(mapStateToProps, {
})(withRouter(Logo));
