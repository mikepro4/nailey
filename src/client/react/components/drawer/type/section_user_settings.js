import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Classes, Intent, Position, Toaster } from "@blueprintjs/core";

import qs from "qs";
import * as _ from "lodash"

import { hideDrawer } from "../../../../redux/actions/appActions"
import { loadPage} from "../../../../redux/actions/pagesActions"

import Cross from "../../svg/cross"
import Editor from "../../editor"


class SectionUserSettings extends Component {

    state = {
        loading: false
    }

    getQueryParams = () => {
        return qs.parse(this.props.location.search.substring(1));
    };
    

    handleTitleChange = (item, value) => {
        this.props.updateSectionProperty(item, "title", value, () => {
            this.props.loadSection()
            this.props.loadSite()
        })
    } 

    render() {

        let page = this.props.page.currentPage;

        let layoutEditorConfiguration = []

        if(page && page.metadata) {
            layoutEditorConfiguration = [
                {
                    collapsible: false,
                    noPadding: true,
                    components: [
                        {
                            type: "layout",
                            updateFunction: (layout) => {
                                console.log(layout)
                                // this.props.updateProperty("page", page, "sections", value, () => {
                                //     this.props.loadNewPageAsync(page._id, true)
                                // })
                            },
                            value: page && page.metadata.sections
                        }  
                    ]
                }
            ]
        }

        return (
            <div className={"app-drawer-content-container standard-drawer section-settings-drawer"}>
                <div className={"drawer-action-header"}>
                    
                    <div className="drawer-action-header-left">
                        <span className="drawer-action-header-title">
                            Sections
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
                        configuration={layoutEditorConfiguration}
                    />
                </div>
            </div>

        )


    }
}

function mapStateToProps(state) {
    return {
        app: state.app,
        user: state.app.user,
        authenticated: state.auth.authenticated,
        page: state.page
    };
}

export default withRouter(connect(mapStateToProps, {
    loadPage,
    hideDrawer
})(SectionUserSettings));
