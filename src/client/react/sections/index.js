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

import { loadSite } from "../../redux/actions/sitesActions"
import { showDrawer, updateProperty } from "../../redux/actions/appActions"
import { loadSection } from "../../redux/actions/sectionsActions"
import { layoutActive } from "../../redux/actions/layoutActions"
import { loadPage } from "../../redux/actions/pagesActions"

import { EditorDraggableItem } from "../components/editor/editorDraggableItem"

import EpicAddSection from "./epic_add_section"
import AddSection from "./add_section"

class Sections extends Component {

    constructor(props) {
        super(props)
        this.state = {
            addButtonArea: 100,
            sections: this.props.page.currentPage.metadata.sections
        };
    };

    componentDidMount() {
        this.setState({
            sections: this.props.page.currentPage.metadata.sections
        })
    }

    componentDidUpdate(prevprops) {
        if (!_.isEqual(prevprops.page.currentPage.metadata.sections, this.props.page.currentPage.metadata.sections)) {
            this.setState({
                sections: this.props.page.currentPage.metadata.sections
            })
        }

        if (!_.isEqual(this.props.page.newPage, prevprops.page.newPage)) {
            if (this.props.page.newPage && this.props.page.newPage.metadata && this.props.page.newPage.metadata.sections) {
                this.setState({
                    sections: this.props.page.newPage.metadata.sections
                })
            } else {
                this.setState({
                    sections: this.props.page.currentPage.metadata.sections
                })
            }

            // this.setState({
            //     sections: this.props.page.newPage.metadata.sections
            // })
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

    renderSectionContent(section, component, i) {
        return (
            <div
                className={classNames({
                    "section-wrapper": true,
                    "section-active": this.props.layout.active == section.id,
                    "section-editable": this.props.app.edit
                })}
                onMouseDown={() => {
                    this.props.layoutActive(section.id)
                    let node = document.getElementById("editor-section-" + section.id)
                    if (node) {
                        document.getElementById("editor-section-" + section.id).scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
                    }
                }}
                onClick={() => {
                    if (this.props.app.drawerType == "section-edit") {
                        this.showEditDrawer(section)
                    }
                }}
                onDoubleClick={() => {
                    if (this.props.app.edit) {
                        this.showEditDrawer(section)
                    }
                }
                }
            >
                {component}
            </div>
        )
    }

    regularTrack(section, position, i, x, y, node) {
        if (this.props.app.clientY + this.state.addButtonArea > y &&
            this.props.app.clientY - this.state.addButtonArea < y) {
            if (this.state.hoverSection == section.id) {

                if (this.props.app.clientX > x && this.props.app.clientX < x + node.clientWidth) {
                    return true
                }
            }
        }
    }

    activeTrack(section, position, i, x, y, node) {
        if (position == "top") {
            if (this.props.app.clientY + this.state.addButtonArea > y &&
                this.props.app.clientY - this.state.addButtonArea < y
            ) {
                if (this.props.app.clientX > x && this.props.app.clientX < x + node.clientWidth) {
                    return true
                }
            }
        }

        if (position == "bottom") {
            let offsetFix = 0

            if (i == this.state.sections.length - 1) {
                offsetFix = -100
            }

            if (this.props.app.clientY + this.state.addButtonArea - 25 > y &&
                this.props.app.clientY - this.state.addButtonArea + offsetFix < y
            ) {
                if (this.props.app.clientX > x && this.props.app.clientX < x + node.clientWidth) {
                    return true
                }
            }
        }
    }

    addDisplay(section, position, i) {
        let activeIndex = _.findIndex(this.state.sections, ({
            id: this.props.layout.active
        }))

        let node

        if (position == "top") {
            node = document.getElementById("section-top-add-" + section.id)
        } else if (position == "bottom") {
            node = document.getElementById("section-bottom-add-" + section.id)
        }

        if (node) {

            let y = node.getBoundingClientRect().y
            let x = node.getBoundingClientRect().x

            if (activeIndex >= 0) {
                return this.activeTrack(section, position, i, x, y, node)
            } else {
                return this.regularTrack(section, position, i, x, y, node)
            }
        }


    }

    sectionWrapper(section, component, i) {
        if (this.props.app.edit) {
            return (
                <div
                    className="epic-section-container"
                    id={"epic-section-" + section.id}
                    onMouseEnter={() => this.setState({
                        hoverSection: section.id
                    })}
                >
                    {i !== 0 && (
                        <div
                            className={classNames({
                                "section-add-container": true,
                                "section-top-add": true,
                                "display-add-section": this.addDisplay(section, "top", i)
                            })}
                        >
                            <div
                                className="add-section"
                                id={"section-top-add-" + section.id}
                            >
                                <AddSection
                                    active={section.id == this.props.layout.active}
                                    insertPosition={(i - 1)}
                                />
                            </div>
                        </div>
                    )}


                    <EditorDraggableItem
                        key={section.id}
                        index={i}
                        id={section.id}
                        moveCard={_.debounce(this.moveCard, 1)}
                    >
                        {this.renderSectionContent(section, component, i)}
                    </EditorDraggableItem>

                    <div
                        className={classNames({
                            "section-add-container": true,
                            "section-bottom-add": true,
                            "display-add-section": this.addDisplay(section, "bottom", i)
                        })}
                    >
                        <div
                            className="add-section"
                            id={"section-bottom-add-" + section.id}
                        >
                            <AddSection
                                active={section.id == this.props.layout.active}
                                insertPosition={i}
                            />
                        </div>
                    </div>
                </div>

            )
        } else {
            return this.renderSectionContent(section, component, i)
        }

    }

    renderSection(section, i) {
        // return (<div key={i}>sections</div>)

        switch (section.sectionValue) {
            case "hero":
                return (this.sectionWrapper(section, <HeroSection section={section} key={section.id} position={i} offset={0.5} />, i))
            case "textBlock":
                return (<div>Hero</div>)
        }
    }

    renderSections() {
        let finalSections = _.map(this.state.sections, (section, i) => {
            return (

                <div className="transition-element" id={"section-" + section.id} key={i}>
                    {this.renderSection(section, i)}
                </div>
            )
        })

        if (finalSections.length == 0) {
            return (<EpicAddSection />)
        } else {
            return (finalSections)
        }


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

export default withRouter(connect(mapStateToProps, {
    loadSection,
    showDrawer,
    layoutActive,
    updateProperty,
    loadSite,
    loadPage
})(withRouter(Sections)));
