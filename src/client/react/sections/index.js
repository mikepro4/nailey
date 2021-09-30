import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import * as _ from "lodash"
import update from "immutability-helper";

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'

import HeroSection from "./hero";

import { loadSite} from "../../redux/actions/sitesActions"
import { showDrawer, updateProperty } from "../../redux/actions/appActions"
import { loadSection } from "../../redux/actions/sectionsActions"
import { layoutActive } from "../../redux/actions/layoutActions"
import { loadPage } from "../../redux/actions/pagesActions"

import  { EditorDraggableItem } from "../components/editor/editorDraggableItem"

class Sections extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sections: this.props.page.currentPage.metadata.sections
        };
    };

    componentDidMount() { 
        this.setState({
            sections: this.props.page.currentPage.metadata.sections
        })
    }

    componentDidUpdate(prevprops) { 
        if(!_.isEqual(prevprops.page.currentPage.metadata.sections, this.props.page.currentPage.metadata.sections)) {
            this.setState({
                sections: this.props.page.currentPage.metadata.sections
            })
        }
    }

    moveCard = (dragIndex, hoverIndex) => {
        const dragCard = this.state.sections[dragIndex];

        this.setState({
            sections: update(this.state.sections, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            })
        }, () => {
            // console.log(this.state.sections)
            // this.props.updateFunction(this.state.sections)
            this.props.updateProperty("page", this.props.page.currentPage, "sections", this.state.sections, () => {
                this.props.loadSite()
                this.props.loadPage()
            })
            
        })

    }

    showEditDrawer(section) {
        this.props.layoutActive(section.id)
        this.props.showDrawer("section-edit")
        this.props.loadSection(section.id)
    }

    sectionWrapper(section, component, i) {
        return (
            <EditorDraggableItem 
                key={section.id} 
                index={i} 
                id={section.id} 
                moveCard={_.debounce(this.moveCard, 1)}
            >

                <div
                    className={classNames({
                        "section-wrapper": true,
                        "section-active": this.props.layout.active == section.id,
                        "section-editable": this.props.app.edit
                    })}
                    onMouseDown={() => {
                        this.props.layoutActive(section.id)
                    }}
                    onClick={() => {
                        if(this.props.app.drawerType == "section-edit") {
                            this.showEditDrawer(section)
                        }
                    }}
                    onDoubleClick={() => {
                        this.showEditDrawer(section)
                    }
                    }
                >
                    {component}
                </div>
            </EditorDraggableItem>
        )
    }

    renderSection(section, i) {
        // return (<div key={i}>sections</div>)

        switch (section.sectionValue) {
            case "hero":
                return (this.sectionWrapper(section, <HeroSection section={section} position={i} offset={0.5} />, i))
            case "textBlock":
                return (<div>Hero</div>)
        }
    }

    renderSections() {
        let page = this.props.page.currentPage
        let finalSections = _.map(this.state.sections, (section, i) => {
            return (
                <div className="transition-element" key={i}>
                        {this.renderSection(section, i)}
                </div>
            )
        })
        return finalSections
    }

    render() {

        return (
            <div
                className={classNames({
                    "main-sections": true
                })}
            >
                    {this.renderSections()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.app.user,
        app: state.app,
        location: state.router.location,
        page: state.page,
        layout: state.layout,
        section: state.section
    };
}

export default connect(mapStateToProps, {
    loadSection,
    showDrawer,
    layoutActive,
    updateProperty,
    loadSite,
    loadPage
})(withRouter(Sections));
