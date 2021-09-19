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

                <div className="section-hero">
                    <div 
                        className="hero-container"
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
                        className="image-1"
                        imageId={1}
                        isVisible={this.state.isVisible}
                        slowDown={6}
                        order={1}
                    />

                    <Image
                        className="image-2"
                        imageId={2}
                        isVisible={this.state.isVisible}
                        slowDown={3}
                        order={1}
                    />

                    <Image
                        className="image-3"
                        imageId={3}
                        isVisible={this.state.isVisible}
                        slowDown={10}
                        order={1}
                    />

                    <Image
                        className="image-4"
                        imageId={4}
                        isVisible={this.state.isVisible}
                        slowDown={3.5}
                        order={1}
                    />
                </div>

                <div className="section-text-content">
                    <div className="text-container-wrapper">
                        <div className="text-container text-container-left">
                            <div className="text-content-headline-container">
                                <div className="text-content-headline-number">01</div>
                                <div className="text-content-headline">Care</div>
                            </div>

                            <div className="text-content-description">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                    Nulla mauris orci, facilisis eget quam nec, convallis dignissim nisl. 
                                    Maecenas vel lorem in turpis cursus fringilla. In in efficitur mauris, et 
                                    maximus nisl. Nulla eget mauris a augue porttitor egestas nec vestibulum libero. 
                                </p>

                                <p>Curabitur pulvinar egestas orci. Fusce hendrerit est ac ligula eleifend, vitae 
                                    bibendum ipsum dignissim. Vivamus sagittis felis gravida ornare hendrerit. 
                                    Sed nec metus non ante ullamcorper convallis. </p>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className="section-text-content">
                    <div className="text-container-wrapper">
                        <div className="text-container text-container-right">
                            <div className="text-content-headline-container">
                                <div className="text-content-headline-number">02</div>
                                <div className="text-content-headline">Love</div>
                            </div>

                            <div className="text-content-description">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                    Nulla mauris orci, facilisis eget quam nec, convallis dignissim nisl. 
                                    Maecenas vel lorem in turpis cursus fringilla. In in efficitur mauris, et 
                                    maximus nisl. Nulla eget mauris a augue porttitor egestas nec vestibulum libero. 
                                </p>
                                
                                <p>Curabitur pulvinar egestas orci. Fusce hendrerit est ac ligula eleifend, vitae 
                                    bibendum ipsum dignissim. Vivamus sagittis felis gravida ornare hendrerit. 
                                    Sed nec metus non ante ullamcorper convallis. </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section-text-content">
                    <div className="text-container-wrapper">
                        <div className="text-container text-container-left">
                            <div className="text-content-headline-container">
                                <div className="text-content-headline-number">03</div>
                                <div className="text-content-headline">Passion</div>
                            </div>

                            <div className="text-content-description">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                    Nulla mauris orci, facilisis eget quam nec, convallis dignissim nisl. 
                                    Maecenas vel lorem in turpis cursus fringilla. In in efficitur mauris, et 
                                    maximus nisl. Nulla eget mauris a augue porttitor egestas nec vestibulum libero. 
                                </p>
                                
                                <p>Curabitur pulvinar egestas orci. Fusce hendrerit est ac ligula eleifend, vitae 
                                    bibendum ipsum dignissim. Vivamus sagittis felis gravida ornare hendrerit. 
                                    Sed nec metus non ante ullamcorper convallis. </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="placeholder"></div>

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