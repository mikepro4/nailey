import React, { Component } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { withRouter, Link } from "react-router-dom";
import Button from "../../components/button"
import Image from "../../components/image"
import { getPose, findProperty } from "../helpers"
import classNames from "classnames";
import * as _ from "lodash"
import update from "immutability-helper";
import EditorEditableField from "../../components/editor/editorEditableField"

import { loadSite } from "../../../redux/actions/sitesActions"
import { updateProperty } from "../../../redux/actions/appActions"
import { loadPage } from "../../../redux/actions/pagesActions"
import { loadSection } from "../../../redux/actions/sectionsActions"

import EditableContent from "../helpers/editableContent"

class SectionHero extends Component {
    state = {
    };

    componentDidMount() {
        console.log("mount")
        this.setState({
            visible: true
        })
    }

    componentDidUpdate(prevprops) {
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
                className={
                    classNames({
                        "section-edge": true,
                        "section-hero": true
                    })
                }
                ref="screen"
                id={"layout-" + this.props.section.id}
            >
                <div
                    className="section-container"
                >

                    <div className="hero-content-container">
                        Layout 2
                        <motion.div
                            className={classNames({
                                "hero-title": true,
                                "animation-text-wipe": true,
                                "animate-in": this.state.visible
                            })}
                            initial="hidden"
                            animate={this.getPose()}
                            variants={heroTitle}
                        >
                            <EditableContent
                                section={this.props.section}
                                property="mainHeadline"
                            />
                        </motion.div>
                        <motion.div
                            className="hero-subtitle"
                            initial="hidden"
                            animate={this.getPose()}
                            variants={heroSubtitle}
                        >
                            <EditableContent
                                section={this.props.section}
                                property="subtitle"
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
        page: state.page,
        site: state.site.currentSite
    };
}

export default withRouter(connect(mapStateToProps, {
    updateProperty,
    loadSite,
    loadPage,
    loadSection
})(SectionHero));
