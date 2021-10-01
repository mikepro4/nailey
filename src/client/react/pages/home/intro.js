import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { motion } from "framer-motion";
import Button from "../../components/button"

class Intro extends Component {

    state = {
        pages: [],
        epic: {
            visible: {
                y: 0,
                opacity: 1,
                scale: 1,
                transition: {
                    duration: 2
                }
            },
            hidden: {
                opacity: 0,
                scale: 0.99
            },
        },
        item: {
            visible: {
                y: 0,
                opacity: 1,
                transition: {
                    type: "spring",
                    stiffness: 122,
                    damping: 22,

                }
            },
            hidden: {
                opacity: 0
            },
        },
        buttons: {
            visible: {
                opacity: 1,
                when: "beforeChildren",
                transition: {
                    duration: 1,
                    delayChildren: 0.3,
                    staggerChildren: 0.1,
                    delay: 0.2
                }
            },
            hidden: {
                opacity: 0
            }
        }
    }

    renderLogo() {
    }

	render() {

        return (
            <div 
                className={classNames({
                    "epic-intro": true
                })}

            >   <div className="epic-intro-container">
                    <motion.div
                        className="epic-intro-title"
                        initial="hidden"
                        animate="visible"
                        variants={this.state.epic}
                    >
                        Epic
                    </motion.div>

                    <motion.ul
                        className="epic-auth-button"
                        initial="hidden"
                        animate="visible"
                        variants={this.state.buttons}
                    >
                        <li className="epic-auth-button">
                            <motion.div
                                variants={this.state.item}
                            >
                                <Button
                                    internalLink={true}
                                    label="Login"
                                    minimal={true}
                                    linkUrl="/auth/login"
                                />
                            </motion.div>
                        </li>

                        <li className="epic-auth-button">
                            <motion.div
                                variants={this.state.item}
                            >
                                <Button
                                    internalLink={true}
                                    label="Sign up"
                                    linkUrl="/auth/signup"
                                />
                            </motion.div>
                        </li>
                        
                    </motion.ul>
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
})(withRouter(Intro));
