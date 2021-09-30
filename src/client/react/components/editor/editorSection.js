import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import CaretDown from "../svg/caret-down"
import CaretUp from "../svg/caret-up"
import EditorSwitch from "./editorSwitch"
import EditorInput from "./editorInput"
import EditorNumericInput from "./editorNumericInput"
import EditorTextarea from "./editorTextarea"
import EditorSelect from "./editorSelect"
import EditorSelectAsync from "./editorSelectAsync"
import EditorTab from "./editorTab"
import EditorCRUD from "./editorCRUD"
import EditorImage from "./editorImage"
import EditorLinker from "./editorLinker"
import EditorLayout from "./editorLayout"
import Test from "./test";
import { Icon } from "@blueprintjs/core";

class EditorSection extends Component {

    state = {
        active: false
    }

    componentDidMount() {
        // if(this.props.section.title == "Pages") {
        //     this.setState({
        //         active: true
        //     })
        // }

        if(this.props.section.forceOpen) {
            this.setState({
                active: true
            })
        }
    }

    conditionalRender(component, children) {
        if(component.conditionalPropertyExpectedValue || component.conditionalPropertyExpectedValue === false)  {
            if(component.conditionalPropertyExpectedValue == component.conditionalPropertyActualValue) {
                return children
            }
        } else {
            return children
        }
    }

    renderComponent = (component, i) => {
        switch(component.type) {
            case "switch":
                return(
                    this.conditionalRender(component, <EditorSwitch key={i} options={component} updateFunction={(value) => component.updateFunction(value)}/>)
                )
            case "input":
                return(
                    this.conditionalRender(component, <EditorInput key={i} options={component} updateFunction={(value) => component.updateFunction(value)}/>)
                )
            case "numericInput":
                return(
                    this.conditionalRender(component, <EditorNumericInput key={i} options={component} updateFunction={(value) => component.updateFunction(value)}/>)
                )
            case "textarea":
                return(
                    this.conditionalRender(component, <EditorTextarea key={i} options={component} updateFunction={(value) => component.updateFunction(value)}/>)
                )
            case "select":
                return(
                    this.conditionalRender(component, <EditorSelect key={i} options={component}  updateFunction={(value) => component.updateFunction(value)}/>)
                )
            case "selectAsync":
                return(
                    this.conditionalRender(component, <EditorSelectAsync key={i} options={component}  updateFunction={(value) => component.updateFunction(value)}/>)
                )
            case "tab":
                return(
                    this.conditionalRender(component, <EditorTab key={i} options={component} updateFunction={(value) => component.updateFunction(value)}/>)
                )
            case "CRUD":
                return(
                    this.conditionalRender(component, <EditorCRUD key={i} options={component} updateFunction={(value) => component.updateFunction(value)}/>)
                )
            case "image":
                return(
                    this.conditionalRender(component, <EditorImage key={i} options={component} updateFunction={(value) => component.updateFunction(value)}/>)
                )
            case "linker":
                return(
                    this.conditionalRender(component, <EditorLinker key={i} options={component} updateFunction={(value) => component.updateFunction(value)}/>)
                )
            case "layout":
                return(
                    this.conditionalRender(component, <EditorLayout key={i} options={component} updateFunction={(value) => component.updateFunction(value)}/>)
                )
            case "layoutOptionSelector":
                return(
                    this.conditionalRender(component, <Test key={i} options={component} updateFunction={(value) => component.updateFunction(value)}/>)
                )
        }
    }

    maybeRenderIcon() { 
        if(this.props.section.icon) {
            return (
                <div className="section-icon-container">
                    <Icon icon={this.props.section.icon} />
                </div>
            )
        }
    }

    render() {

        return (
            <div
                className={classNames({
                    "editor-section": true,
                    "editor-section-noBottom": this.props.section.noPadding,
                })}
            >
                {this.props.section.collapsible && <div
                    className={classNames({
                        "editor-section-header": true,
                        "header-active": this.state.active
                    })}
                    onClick={() => {
                        this.setState({
                            active: !this.state.active
                        })
                    }}
                >
                    <div className="editor-section-left">
                        {this.maybeRenderIcon()}
                        {this.props.section.title}
                    </div>

                    <div className="editor-section-right">
                        {this.state.active ? <CaretUp/> : <CaretDown/> }
                        
                    </div>
                </div>}
                

                <div
                    className={classNames({
                        "editor-section-content": true,
                        "editor-section-content-hidden": this.props.section.collapsible && !this.state.active,
                        "editor-section-content-visible": this.state.active,
                        "editor-section-content-notCollapsible": !this.props.section.collapsible,
                        "editor-section-content-noPadding": this.props.section.noPadding,
                    })}
                >

                    {this.props.section.components.map((item, i) => {
                        return this.renderComponent(item, i)
                    })}
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.app.user,
        app: state.app,
        location: state.router.location,
        edit: state.app.edit
    };
}

export default connect(mapStateToProps, {
})(withRouter(EditorSection));
