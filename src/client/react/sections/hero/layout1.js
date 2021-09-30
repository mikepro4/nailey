import React, { Component } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import Button from "../../components/button"
import Image from "../../components/image"
import { getPose, findProperty } from "../helpers"
import classNames from "classnames";

import update from "immutability-helper";
import EditorEditableField from "../../components/editor/editorEditableField"

import { loadSite } from "../../../redux/actions/sitesActions"
import { updateProperty } from "../../../redux/actions/appActions"
import { loadPage } from "../../../redux/actions/pagesActions"
import { loadSection } from "../../../redux/actions/sectionsActions"

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

    updateProperty = (value, property, section) => {

        let toChangeProperty = _.filter(this.props.section.properties, {
            propertyValue: property
        })

        let indexPropertyToUpdate = _.findIndex(section.properties, {
            propertyValue: property
        })

        let newValue = {
            ...toChangeProperty[0],
            value: value
        }

        let newProperties = update(section.properties, {
            $splice: [[indexPropertyToUpdate, 1, newValue]]
        })

        let page = this.props.page.currentPage

        let newSection = {
            ...section,
            properties: newProperties
        }

        let indexSectionToUpdate = _.findIndex(page.metadata.sections, {
            id: section.id
        })

        let finalLayout = update(page.metadata.sections, {
            $splice: [[indexSectionToUpdate, 1, newSection]]
        })

        this.props.updateProperty("page", page, "sections", finalLayout, () => {
            this.props.loadSite()
            this.props.loadPage()
            this.props.loadSection(section.id)

        })

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
                            <EditorEditableField
                                value={findProperty(this.props.section, "mainHeadline").value}
                                updateField={(value) => {
                                    this.updateProperty(value, "mainHeadline", this.props.section)

                                }
                                }
                            />
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

export default connect(mapStateToProps, {
    updateProperty,
    loadSite,
    loadPage,
    loadSection
})(SectionHero);
