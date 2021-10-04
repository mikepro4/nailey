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

    // renderMousePositions(section) {
    //     let bottomNode = document.getElementById("section-bottom-add-" + section.id)
    //     let sectionNode = document.getElementById("epic-section-" + section.id)
       
    //     if(bottomNode) {

    //         let y = bottomNode.getBoundingClientRect().y
    //         let displayStatus = "no"
    
    //         if(this.state.clientY + 100 > y && this.state.clientY - 100 < y) {
    //             displayStatus = "yes"
    //         }
    //         return(
    //             <div className="mouse-positions">
    //                 <div>{this.state.clientX} / {this.state.clientY} / {this.state.pageY}</div>
    //                 <div>{y}</div>
    //                 <div>{displayStatus}</div>
    //                 <div>
    //                     {sectionNode.getBoundingClientRect().x} / 
    //                     {sectionNode.getBoundingClientRect().y} / 
    //                     {sectionNode.getBoundingClientRect().height}
    //                 </div>
    //                 <div>
    //                     {this.state.hoverSection}
    //                 </div>
    //             </div>
    //         )
    //     }
    // }

    // renderMousePositions(section) {
    //     let bottomNode = document.getElementById("section-top-add-" + section.id)
    //     let sectionNode = document.getElementById("epic-section-" + section.id)
       
    //     if(bottomNode) {

    //         let y = bottomNode.getBoundingClientRect().y
    //         let displayStatus = "no"
    
    //         if(this.state.clientY + 100 > y && this.state.clientY - 100 < y) {
    //             displayStatus = "yes"
    //         }
    //         return(
    //             <div className="mouse-positions">
    //                 <div>{this.state.clientX} / {this.state.clientY} / {this.state.pageY}</div>
    //                 <div>{y}</div>
    //                 <div>{displayStatus}</div>
    //                 <div>
    //                     {sectionNode.getBoundingClientRect().x} / 
    //                     {sectionNode.getBoundingClientRect().y} / 
    //                     {sectionNode.getBoundingClientRect().height}
    //                 </div>
    //                 <div>
    //                     {this.state.hoverSection}
    //                 </div>
    //             </div>
    //         )
    //     }
    // }

    // bottomAddDisplay(section) {
    //     let bottomNode = document.getElementById("section-bottom-add-" + section.id)
    //     let sectionNode = document.getElementById("epic-section-" + section.id)
    //     if(bottomNode) {
    //         let y = bottomNode.getBoundingClientRect().y
    //         let sectionHeight = sectionNode.getBoundingClientRect().height

    //         if(this.state.clientY + 100 > y && this.state.clientY - 100 < y) {
    //             if(this.state.hoverSection == section.id) {
    //                 return true
    //             } else {
    //                 return false
    //             }
    //         } else {
    //             return false
    //         }
    //     }
    // }

    // topAddDisplay(section) {
    //     let bottomNode = document.getElementById("section-top-add-" + section.id)
    //     let sectionNode = document.getElementById("epic-section-" + section.id)
    //     if(bottomNode) {
    //         let y = bottomNode.getBoundingClientRect().y
    //         let sectionHeight = sectionNode.getBoundingClientRect().height

    //         if(this.state.clientY + 100 > y && this.state.clientY - 100 < y) {
    //             if(this.state.hoverSection == section.id) {
    //                 return true
    //             } else {
    //                 return false
    //             }
    //         } else {
    //             return false
    //         }
    //     }
    // }

    addDisplay(section, position, i) {
        // hover index is less than active index

        let hoverIndex = _.findIndex(this.state.sections, ({
            id: this.state.hoverSection
        }))


        let activeIndex = _.findIndex(this.state.sections, ({
            id: this.props.layout.active
        }))

        

        if(activeIndex > hoverIndex) {
            console.log("preserve top")
        }

        let node 

        if(position == "top") {
            node = document.getElementById("section-top-add-" + section.id)
        } else if (position == "bottom") {
            node = document.getElementById("section-bottom-add-" + section.id)
        }

        if(node) {
            let y = node.getBoundingClientRect().y

            if(this.state.clientY + 100 > y && this.state.clientY - 100 < y) {
                if(this.state.hoverSection == section.id) {
                    return true
                }
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
                    
                    <div 
                        id={"section-top-add-" + section.id}
                        className={classNames({
                            "section-top-add": true,
                            "display-add-section": this.addDisplay(section, "top", i)
                        })}
                    >
                        <AddSection active={section.id == this.props.layout.active}/>
                    </div>

                    <EditorDraggableItem
                        key={section.id}
                        index={i}
                        id={section.id}
                        moveCard={_.debounce(this.moveCard, 1)}
                    >
                        {this.renderSectionContent(section, component, i)}
                    </EditorDraggableItem>

                    {/* {this.renderMousePositions(section)} */}
                    
                    <div 
                        id={"section-bottom-add-" + section.id}
                        className={classNames({
                            "section-bottom-add": true,
                            "display-add-section": this.addDisplay(section, "bottom", i)
                        })}
                    >
                        <AddSection active={section.id == this.props.layout.active}/>
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

    onMouseMove = (e) => {
        this.setState({
            clientY: e.clientY,
            clientX: e.clientX,
            pageY: e.pageY
        })
	}

    render() {
        return (
            <div
                className={classNames({
                    "main-sections": true
                })}
                onMouseMove={this.onMouseMove.bind(this)}
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
