import React, { Component } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
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
            this.props.loadSite(null, () => {
                this.props.loadPage()
                setTimeout(() => {
                    this.props.loadSection(section.id)
                }, 10)
            })

        })

    }


    render() {
        if (this.props.app.edit) {
            return (
                <EditorEditableField
                    value={findProperty(this.props.section, this.props.property).value}
                    updateField={(value) => {
                        this.updateProperty(value, this.props.property, this.props.section)
                    }
                    }
                />
            )
        } else {
            return findProperty(this.props.section, this.props.property).value
        }
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
