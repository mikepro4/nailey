import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import classNames from "classnames"
import { motion } from "framer-motion";

class HomePage extends Component {

    state = {
	}

    renderHead = (pageTitle) => (
		<Helmet>
			<title>{pageTitle}</title>
			<meta property="og:title" content={pageTitle} />
		</Helmet>
    )

	render() {
        let pageTitle = this.props.app.site.title + " – " + this.props.app.site.subtitle + " | Home"

        const heroTitle = {
            visible: { 
                scale: 1, 
                transition: {
                    duration: 1,
                    delay: 0.3
                } 
            },
            hidden: { 
                scale: 0.99
            },
        }

        const heroSubtitle = {
            visible: { 
                scale: 1, 
                y: 0,
                opacity: 1,
                transition: {
                    duration: 1,
                    delay: 0.55
                } 
            },
            hidden: { 
                scale: 0.99,
                opacity: 0
            },
        }

        const heroButton = {
            visible: { 
                scale: 1, 
                opacity: 1,
                transition: {
                    duration: 1,
                    delay: 0.65
                } 
            },
            hidden: { 
                scale: 0.99,
                opacity: 0
            },
        }

		return (
     		<div className="route-content home-route">
                {this.renderHead(pageTitle)}

                <div className="placeholder">

                    <div 
                        className="hero-container"
                        style={{
                            height: this.props.app.clientHeight-400 + "px"
                        }}
                    >

                        <div className="hero-content-container">
                            <motion.div 
                                className="hero-title animation-text-wipe animate-in"
                                initial="hidden"
                                animate="visible"
                                variants={heroTitle}
                            >
                                {this.props.app.site.subtitle}
                            </motion.div>
                            <motion.div 
                                className="hero-subtitle"
                                initial="hidden"
                                animate="visible"
                                variants={heroSubtitle}
                            >
                                {this.props.app.site.description}
                            </motion.div>
                            <motion.div 
                                className="hero-button"
                                initial="hidden"
                                animate="visible"
                                variants={heroButton}
                            >
                                Book Appointment
                            </motion.div>
                        </div>
                    </div>

                </div>
			</div>
				
		);
	}
}

function mapStateToProps(state) {
	return {
        app: state.app
	};
}


export default {
	component: withRouter(connect(mapStateToProps, {
	})(HomePage))
}