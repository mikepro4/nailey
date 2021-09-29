import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Classes, Intent, Position, Toaster } from "@blueprintjs/core";

import qs from "qs";
import * as _ from "lodash"

import Editor from "../../editor"

import ArrowBack from "../../svg/arrow-back"
import Cross from "../../svg/cross"
import update from "immutability-helper";
import { hideDrawer, showDrawer, updateProperty, getOptions } from "../../../../redux/actions/appActions"

import { loadSite} from "../../../../redux/actions/sitesActions"
import { setMainsection, loadNewSectionAsync } from "../../../../redux/actions/sectionsActions"

import { fieldCategories, fieldCategoriesIcons, fieldCategoriesTitles } from "../../../sections/fieldCategories"

class SectionEdit extends Component {

    state = {
        loading: false
    }

    updateField(field, value) {

        let page = this.props.page.currentPage
        let indexOfEditingSection = _.findIndex(page.metadata.sections,this.props.section.currentSection)

        let fieldToUpdate = _.filter(this.props.section.currentSection.properties, {
            propertyValue: field.propertyValue
        })

        let fieldToUpdateIndex = _.findIndex(this.props.section.currentSection.properties, fieldToUpdate[0])

        let newField = {
            ...fieldToUpdate[0],
            value: value
        }

        let newProperties = update(this.props.section.currentSection.properties, {
            $splice: [[fieldToUpdateIndex, 1, newField]]
        });


        let newSection = {
            ...this.props.section.currentSection,
            properties: newProperties
        }

        let finalLayout = update(page.metadata.sections, {
            $splice: [[indexOfEditingSection, 1, newSection]]
        });


        this.props.updateProperty("page", page, "sections", finalLayout, () => {
            this.props.loadSite()
        })
    }

    getComponent(field, i) { 
        
        switch(field.propertyType) {
            case "string":
                return {
                    id: i,
                    type: "input",
                    label: field.propertyLabel,
                    updateFunction: (value) => {
                       this.updateField(field, value)
                    },
                    value: field.value
                }
            case "boolean":
                return {
                    id: i,
                    type: "switch",
                    label: field.propertyLabel,
                    updateFunction: (value) => {
                        this.updateField(field, value)
                     },
                    active: field.value
                }
         }
            
    }

    generateFields = (section) => {
        let fields = _.map(section.properties, (field, i) => {
            return (this.getComponent(field, i))
        })
        return fields
    }

    generateSections = () => {

        let newCategories = _.map(this.props.section.currentSection.activeCategories, (section, i) => {
            let filteredComponents = _.filter(this.props.section.currentSection.properties, {
                category: section
            })

            let fields = _.map(filteredComponents, (field, i) => {
                return (this.getComponent(field, i))
            })
            return {
                title: fieldCategoriesTitles[i],
                icon: fieldCategoriesIcons[i],
                collapsible: true,
                forceOpen: true,
                components: fields
            }
        })

        return newCategories
    }

    render() {
        let section = this.props.section.currentSection

        
        if(section) {
            let sectionEditorConfiguration = this.generateSections()

            return (
                <div className="app-drawer-content-container standard-drawer section-edit-drawer">
                    <div className="drawer-action-header">
    
                        <div className="drawer-action-header-left">
                            <div onClick={() => this.props.showDrawer("section-user-settings")}>
                                <ArrowBack />
                            </div>
                            <span className="drawer-action-header-title">
                                {section && section.label}
                            </span>
                        </div>
    
                        <div className="drawer-action-header-right">
                            <div onClick={() => this.props.showDrawer("section-user-settings")}>
                                <Cross />
                            </div>
                        </div>
                    </div>
    
    
                    <div className="placeholder">
                        <Editor
                            configuration={sectionEditorConfiguration}
                            model="section"
                        />
    
                    </div>
                </div>
    
            )
        } else {
            return (<div/>)
        }

        


    }
}

function mapStateToProps(state) {
    return {
        app: state.app,
        page: state.page,
        section: state.section,
        user: state.app.user,
        authenticated: state.auth.authenticated,
    };
}

export default withRouter(connect(mapStateToProps, {
    hideDrawer,
    showDrawer,
    updateProperty,
    setMainsection,
    loadNewSectionAsync,
    getOptions,
    loadSite
})(SectionEdit));
