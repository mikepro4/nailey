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

import { hideDrawer, showDrawer, updateProperty, getOptions } from "../../../../redux/actions/appActions"

import { setMainsection, loadNewSectionAsync } from "../../../../redux/actions/sectionsActions"

class SectionEdit extends Component {

    state = {
        loading: false
    }

    render() {
        let section = this.props.section.newSection
        
        if(section && section.metadata) {
            let sectionEditorConfiguration = [
                {
                    collapsible: false,
                    components: [
                        {
                            type: "input",
                            label: "Title",
                            updateFunction: (value) => {
                                this.props.updateProperty("section", section, "title", value, () => {
                                    this.props.loadNewSectionAsync(section._id, true)
                                })
                            },
                            value: section && section.metadata.title
                        }
                    ]
                }
            ]
            // let sectionEditorConfiguration = [
            //     {
            //         collapsible: false,
            //         components: [
            //             {
            //                 type: "input",
            //                 label: "Title",
            //                 updateFunction: (value) => {
            //                     this.props.updateProperty("section", section, "title", value, () => {
            //                         this.props.loadNewSectionAsync(section._id, true)
            //                     })
            //                 },
            //                 value: section && section.metadata.title
            //             },
            //             {
            //                 type: "input",
            //                 label: "Headline",
            //                 updateFunction: (value) => {
            //                     this.props.updateProperty("section", section, "headline", value, () => {
            //                         this.props.loadNewSectionAsync(section._id, true)
            //                     })
            //                 },
            //                 value: section && section.metadata.headline
            //             },
            //             {
            //                 type: "input",
            //                 label: "Description",
            //                 updateFunction: (value) => {
            //                     this.props.updateProperty("section", section, "description", value, () => {
            //                         this.props.loadNewSectionAsync(section._id, true)
            //                     })
            //                 },
            //                 value: section && section.metadata.description
            //             },
            //             {
            //                 type: "switch",
            //                 label: "Display CTA",
            //                 updateFunction: (value) => {
            //                     this.props.updateProperty("section", section, "displayCTA", value, () => {
            //                         this.props.loadNewPageAsync(section._id, true)
            //                     })
            //                 },
            //                 active: section && section.metadata.displayCTA,
            //             }
                           
            //         ]
            //     }
            // ]
            return (
                <div className="app-drawer-content-container standard-drawer section-edit-drawer">
                    <div className="drawer-action-header">
    
                        <div className="drawer-action-header-left">
                            <div onClick={() => this.props.showDrawer("section-god-settings")}>
                                <ArrowBack />
                            </div>
                            <span className="drawer-action-header-title">
                                {section && section.metadata.title}
                            </span>
                        </div>
    
                        <div className="drawer-action-header-right">
                            <div onClick={() => this.props.hideDrawer()}>
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
    getOptions
})(SectionEdit));
