import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import * as _ from "lodash"
import { Icon } from "@blueprintjs/core";
import DragHandle from "../svg/dragHandle"
import Button from "../button"  

import { showDrawer } from "../../../redux/actions/appActions"
import { layoutActive } from "../../../redux/actions/layoutActions"
import EditorLayoutSectionAdd from "./editorLayoutSectionAdd"


class EditorLayout extends Component {

    state = {
        sections: []
    }

    componentDidMount() { 
        if(this.props.options.value) {
            this.setState({
                sections: this.props.options.value
            })
        }
    }

    componentDidUpdate(prevprops) { 
        if(prevprops.options.value !== this.props.options.value) {
            this.setState({
                sections: this.props.options.value
            })
        }
    }

    handleInputChange = (sections) => {
        this.setState({
            sections: sections
        })
        this.props.updateFunction(sections)
    }

    toggleLayoutActive(layoutId) {
        if(this.props.layout.active == layoutId) {
            this.props.layoutActive(null)
        } else {
            this.props.layoutActive(layoutId)
        }
    }

    renderSection(section, i) {
        return(
            <div 
                className="layout-section-container" key={i}
            >

                <div 
                    className={classNames({
                        "layout-section": true,
                        "layout-section-active": this.props.layout.active == section.id
                    })}
                    onClick={() => {
                        this.toggleLayoutActive(section.id)
                    }}
                >
                    <div className="layout-section-left">
                        <div className="layout-section-drag-handle">
                            <DragHandle />
                        </div>

                        <div 
                            className="layout-section-details-container"
                            onClick={() => {
                                this.props.layoutActive(section.id)
                                this.props.showDrawer("layout-selector", { 
                                    replacePosition: i, 
                                    replaceValue: section.value, 
                                    sectionOpen: section.sectionName,
                                    forceOpen: section.sectionValue
                                })}
                            }
                        >
                            <div className="layout-section-details-section-name">
                                {section.sectionName}
                            </div>

                            <div className="layout-section-details-layout-name">
                                <span className="layout-name-container">
                                    {section.label}
                                </span>
                                <span className="layout-name-icon">
                                    <Icon icon="caret-down"/>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="layout-section-right">
                        <Button 
                            icon="trash"
                            minimal={true}
                            onClick={() => this.props.options.deleteFunction(i)}
                        />
                        <Button 
                            icon="duplicate"
                            minimal={true}
                            onClick={() => this.props.options.duplicateFunction(i, section)}
                        />
                        <Button 
                            icon="edit"
                            onClick={() => console.log("edit page")}
                        />
                    </div>
                </div>
                <EditorLayoutSectionAdd  position={i}/>
            </div>
        )
    }

    renderSections(sections) {
        return(
            <div className="layout-section-wrapper">
                {sections.map((item, i) => {
                    return this.renderSection(item, i)
                })}
            </div>
        )
    }

    renderSectionsScreen() {
        let sections = this.props.page.metadata.sections
        
        if(sections.length < 1) {
            return(<EditorLayoutSectionAdd position={0}/>)
        } else {
            return(this.renderSections(sections))
        }
    }

    render() {
        return (
            <div
                className={classNames({
                    "editor-row": true,
                    "editor-layout": true,
                })}
            > 
                {this.renderSectionsScreen()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.app.user,
        app: state.app,
        location: state.router.location,
        edit: state.app.edit,
        page: state.page.currentPage,
        layout: state.layout,
    };
}

export default connect(mapStateToProps, {
    showDrawer,
    layoutActive
})(withRouter(EditorLayout));
