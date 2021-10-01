import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import * as _ from "lodash"
import { motion } from "framer-motion";

import { enableEdit, showDrawer } from "../../../redux/actions/appActions"

class EpicAddSection extends Component {

   
	render() {
        let section = this.props.section


        // const lineHeight = {
        //     visible: {
        //         opacity: 1,
        //         height: 222,
        //         transition: {
        //             type: "spring",
        //             stiffness: 10,
        //             damping: 1,
        //         },
        //     },
        //     hidden: {
        //         opacity: 0,
        //         height: 0
        //     },
        // }

        const lineHeight = {
            visible: {
                opacity: 1,
                height: 222,
                transition: {
                    type: "spring",
                    stiffness: 122,
                    damping: 60,
                },
            },
            hidden: {
                opacity: 0,
                height: 0
            },
        }

        const lineWidth = {
            visible: {
                opacity: 1,
                width: 222,
                transition: {
                    type: "spring",
                    stiffness: 122,
                    damping: 60,
                    delay: 0.8
                },
            },
            hidden: {
                opacity: 0,
                width: 0
            },
        }

        const title = {
            visible: {
                opacity: 1,
                scale: 1,
                transition: {
                    duration: 1,
                    delay: 0.5
                }
            },
            hidden: {
                opacity: 0,
                scale: 0.98
            },
        }

        const container = {
            visible: {
                opacity: 1,
                transition: {
                    duration: 0.6,
                }
            },
            hidden: {
                opacity: 0,
            },
        }

        return (
            <div 
                className={classNames({
                    "epic-add-section": true,
                    "editing": this.props.app.edit
                })}
            >
                <motion.div
                    className={classNames({
                        "epic-add-section-container": true,
                        
                    })}
                    initial="hidden"
                    animate={"visible"}
                    variants={container}
                    onClick={() => {
                        this.props.enableEdit()
                        this.props.showDrawer("layout-selector", { forceOpen: "hero"})
                    }}
                >
                    <div className="epic-plus">
                        <motion.div
                            className={classNames({
                                "epic-line-height": true
                            })}
                            initial="hidden"
                            animate={"visible"}
                            variants={lineHeight}
                        />

                        <motion.div
                            className={classNames({
                                "epic-line-width": true
                            })}
                            initial="hidden"
                            animate={"visible"}
                            variants={lineWidth}
                        />
                    </div>

                    <motion.div
                        className={classNames({
                            "epic-title": true
                        })}
                        initial="hidden"
                        animate={"visible"}
                        variants={title}
                    >
                        Add section
                    </motion.div>
                </motion.div>
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
})(withRouter(EpicAddSection));
