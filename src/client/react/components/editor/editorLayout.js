import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import * as _ from "lodash"
import update from "immutability-helper";
import { Icon } from "@blueprintjs/core";
import DragHandle from "../svg/dragHandle"
import Button from "../button"
import { EditorDraggableItem } from "../editor/editorDraggableItem";
import { showDrawer, setScrollTo } from "../../../redux/actions/appActions"
import { layoutActive } from "../../../redux/actions/layoutActions"
import { loadSection } from "../../../redux/actions/sectionsActions"
import EditorLayoutSectionAdd from "./editorLayoutSectionAdd"


class EditorLayout extends Component {

    state = {
        sections: []
    }

    componentDidMount() {
        setTimeout(() => {
            if(this.props.layout.active) {
                document.getElementById("editor-section-" + this.props.layout.active).scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
            }
        }, 500)
        if (this.props.options.value) {
            this.setState({
                sections: this.props.options.value
            })
        }
    }

    componentDidUpdate(prevprops) {
        if (prevprops.options.value !== this.props.options.value) {
            this.setState({
                sections: this.props.options.value
            })
        }

        // if(!_.isEqual(prevprops.page, this.props.page)) {
        //     this.setState({
        //         sections: this.props.options.value
        //     })
        // }
    }

    handleInputChange = (sections) => {
        this.setState({
            sections: sections
        })
        this.props.updateFunction(sections)
    }

    toggleLayoutActive(layoutId) {
        // if(this.props.layout.active == layoutId) {
        //     this.props.layoutActive()
        // } else {
        //     this.props.layoutActive(layoutId)
        // }
        this.props.layoutActive(layoutId)
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
            document.getElementById("section-"+ this.state.sections[dragIndex].id).scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
            this.props.updateFunction(this.state.sections)

        })

    }


    renderSection(section, i) {


        return (
            <div
                className="layout-section-container" key={i}
                id={"editor-section-" + section.id}
            >
                <EditorDraggableItem
                    key={section.id}
                    index={i}
                    id={section.id}
                    moveCard={_.debounce(this.moveCard, 1)}
                    style={{
                        backgroundColor: "white"
                    }}
                >

                    <div
                        className={classNames({
                            "layout-section": true,
                            "layout-section-active": this.props.layout.active == section.id
                        })}
                        onMouseDown={() => {
                            // this.props.setScrollTo(1000)
                            this.props.layoutActive(section.id)
                            document.getElementById("section-"+ section.id).scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
                        }
                        }
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
                                    })
                                }
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
                                        <Icon icon="caret-down" />
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
                                onClick={() => {
                                    this.props.showDrawer("section-edit")
                                    this.props.loadSection(section.id)
                                }}
                            />
                        </div>
                    </div>
                </EditorDraggableItem>

                <EditorLayoutSectionAdd position={i} />


            </div>
        )
    }

    renderSections(sections) {
        return (
            <div className="layout-section-wrapper">
                {sections.map((item, i) => {
                    return this.renderSection(item, i)
                })}
            </div>
        )
    }

    generatePreview = ({ itemType, item, style }) => {
        return this.renderSection(item, 0)
    }

    renderSectionsScreen() {
        let sections = this.props.page.metadata.sections

        if (sections.length < 1) {
            return (<EditorLayoutSectionAdd position={0} />)
        } else {


            return (<div>{this.renderSections(this.state.sections)}</div>)

            //     return(
            //         <DndProvider backend={dndBackend} options={this.state.backendOptions} >

            //             {this.renderSections(this.state.sections)}

            //             {/* {dndBackend == TouchBackend ? <Preview generator={this.generatePreview} /> : ""} */}

            //         </DndProvider>
            //        )
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
    layoutActive,
    loadSection,
    setScrollTo
})(withRouter(EditorLayout));
