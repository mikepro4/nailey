import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import classNames from "classnames"
import { motion } from "framer-motion";
import Button from "../../components/button"
import Image from "../../components/image"

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
                scale: 1,
                opacity: 0
            },
        }

		return (
     		<div className="route-content home-route">
                {this.renderHead(pageTitle)}

                <div className="placeholder">
                    <div className="screen">
                        <div 
                            className="hero-container"
                            style={{
                                height: this.props.app.clientHeight + "px"
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
                                    <Button
                                        label={this.props.app.site.ctaText}
                                        linkUrl={this.props.app.site.ctaUrl}
                                        onClick={() => {alert("lol")}}
                                    />
                                </motion.div>
                            </div>
                        </div>

                        <Image
                            isVisible={this.state.isVisible}
                            top={150}
                            left={-120}
                            height={222}
                            width={222}
                            screen={0}
                            slowDown={6}
                            order={1}
                        />

                        <Image
                            isVisible={this.state.isVisible}
                            top={250}
                            right={-170}
                            height={335}
                            width={335}
                            screen={0}
                            slowDown={2}
                            order={1}
                        />

                        <Image
                            isVisible={this.state.isVisible}
                            bottom={150}
                            height={300}
                            left={150}
                            width={300}
                            screen={0}
                            slowDown={8}
                            order={1}
                        />

                        <Image
                            isVisible={this.state.isVisible}
                            bottom={-100}
                            height={400}
                            right={300}
                            width={400}
                            screen={0}
                            slowDown={4}
                            order={1}
                        />
                    </div>

                    <div className="screen"></div>
                    <div className="screen"></div>

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