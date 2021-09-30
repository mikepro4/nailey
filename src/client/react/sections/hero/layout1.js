import React, { Component } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import Button from "../../components/button"
import Image from "../../components/image"
import { getPose, findProperty } from "../helpers"
import classNames from "classnames";

class SectionHero extends Component {
    state = {
    };

    componentDidMount() {
        this.setState({
            visible: true
        })
    }

    getPose() {
       return getPose(this.refs.screen, this.props.clientHeight, this.props.totalScrolledPixels, 1.5)
    }

    render() {
        const heroTitle = {
            visible: { 
                opacity: 1,
                scale: 1, 
                transition: {
                    duration: 1,
                } 
            },
            hidden: { 
                opacity: 0,
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
                    delay: 0.25
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
                    delay: 0.35
                } 
            },
            hidden: { 
                scale: 1,
                opacity: 0
            },
        }

        return (
            <div 
                className="section-edge section-hero" ref="screen"
                className={
                    classNames({
                        "section-edge": true,
                        "section-hero": true
                    })
                }
            >
                <div
                    className="section-container"
                >

                    <div className="hero-content-container">
                        <motion.div
                            className="hero-title animation-text-wipe animate-in"
                            initial="hidden"
                            animate={this.getPose()}
                            variants={heroTitle}
                        >
                            {findProperty(this.props.section, "mainHeadline").value}
                        </motion.div>
                        <motion.div
                            className="hero-subtitle"
                            initial="hidden"
                            animate={this.getPose()}
                            variants={heroSubtitle}
                        >
                            {findProperty(this.props.section, "subtitle").value}
                        </motion.div>
                        <motion.div
                            className="hero-button"
                            initial="hidden"
                            animate={this.getPose()}
                            variants={heroButton}
                        >
                            <Button
                                label={this.props.app.site.ctaText}
                                linkUrl={this.props.app.site.ctaUrl}
                                onClick={() => { alert("lol") }}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        totalScrolledPixels: state.app.totalScrolledPixels,
        clientHeight: state.app.clientHeight,
        app: state.app,
        page: state.page
    };
}

export default connect(mapStateToProps, {})(SectionHero);
