import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import * as _ from "lodash"
import { Icon } from "@blueprintjs/core";
import { v4 as uuidv4 } from 'uuid';

import { hideDrawer, showDrawer, setScrollTo} from "../../../redux/actions/appActions"
import Button from "../../components/button"

import { loadNewPage, clearNewPage } from "../../../redux/actions/pagesActions"
import { layoutActive } from "../../../redux/actions/layoutActions"

import update from "immutability-helper";

class EditorLayoutOptionSelector extends Component {

    state = {
        options: []
    }

    componentDidMount() {
        if (this.props.options.options) {
            this.setState({
                options: this.props.options.options
            })
        }
    }

    componentDidUpdate(prevprops) {
        if (prevprops.options.options !== this.props.options.options) {
            this.setState({
                options: this.props.options.options
            })
        }
    }

    selectLayout = (layout) => {
        this.props.updateFunction(layout)
    }

    renderButton = (option) => {
        if (this.props.options.value == option.value) {
            return (<Button
                label="Selected"
                minimal={true}
            />)
        } else {
            return (
                <Button
                    icon="plus"
                />
            )
        }
    }

    toggleLayoutOption(option) {
        if (this.props.options.value == option.value) {
            // this.props.layoutActive(null)
        } else {
            this.props.layoutActive(option.value)
            this.props.showDrawer("section-user-settings")
        }
        

        this.selectLayout(option.value)
    }

    layoutHover(option) {
        let drawerData = this.props.app.drawerData

        if(!drawerData.replacePosition) {
            this.props.layoutActive(null)
        }

        let section = this.props.options.section

        let sectionToChange = _.filter(this.props.layout.allLayouts, {
            sectionValue: section
        })
        let commonProperties = sectionToChange[0].commonProperties
        let layouts = sectionToChange[0].layouts
        let page = this.props.page.currentPage

        let selectedLayout = _.filter(layouts, {
            value: option.value
        })

        let newProperties = _.concat(commonProperties, selectedLayout[0].properties)

        let finalSelectedLayout = {
            ...selectedLayout[0],
            sectionName: "",
            sectionValue: section,
            properties: newProperties,
            activeCategories: sectionToChange[0].activeCategories,
            id: uuidv4()
        }


        let finalLayout

        if(drawerData && drawerData.insertPosition >= 0 && finalSelectedLayout) {
            if(page.metadata.sections.length == 0) {
                finalLayout = [finalSelectedLayout]
            } else {

                finalLayout = update(page.metadata.sections, {
                    $splice: [[drawerData.insertPosition +1 , 0, finalSelectedLayout]]
                });

            }
        }

        if(drawerData && drawerData.replacePosition >= 0 && finalSelectedLayout) {
            if(page.metadata.sections.length == 0) {
                finalLayout = [finalSelectedLayout]
            } else {

                finalLayout = update(page.metadata.sections, {
                    $splice: [[drawerData.replacePosition, 1, finalSelectedLayout]]
                });

            }
        }
        this.props.loadNewPage({
            ...this.props.page.currentPage,
            metadata: {
                ...this.props.page.currentPage.metadata,
                sections: finalLayout
            }
        })

    }

    layoutHoverOut(option) {
        // console.log("layoutHoverOut", this.props.page.currentPage)
        this.props.layoutActive(option.value)
        this.props.clearNewPage()
    }

    renderItem = (option, i) => {
        return (
            <div
                className={classNames({
                    "layout-option-container": true,
                    "layout-option-active": this.props.options.value == option.value
                })}
                onClick={() => this.toggleLayoutOption(option)}
                onMouseEnter={() => {
                    this.layoutHover(option)
                }}
                onMouseLeave={() => {
                    this.layoutHoverOut(option)
                }}
                key={i}

            >

                <div className="layout-option-left">
                    <div className="layout-option-title">
                        {option.label}
                    </div>
                </div>

                <div className="layout-option-right">
                    {this.renderButton(option)}
                </div>

            </div>
        )
    }

    render() {
        return (
            <div
                className={classNames({
                    "editor-row": true,
                    "editor-layout-option-selector": true,
                })}
            >
                {this.state.options.map((item, i) => {
                    return (this.renderItem(item, i))
                })}
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
        layout: state.layout,
        page: state.page
    };
}

export default connect(mapStateToProps, {
    hideDrawer,
    showDrawer,
    layoutActive,
    setScrollTo,
    loadNewPage, 
    clearNewPage
})(withRouter(EditorLayoutOptionSelector));
