import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Classes, Intent, Position, Toaster } from "@blueprintjs/core";

import qs from "qs";
import * as _ from "lodash"

import { updateCollection, uncheckAll } from "../../../../redux/actions/appActions"
import { createSection, searchSections, loadSection, deleteSection, updateSectionProperty, setMainSection} from "../../../../redux/actions/sectionsActions"
import { loadSite} from "../../../../redux/actions/sitesActions"


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
        return (
            <div className={"app-drawer-content-container standard-drawer section-settings-drawer"}>
                <div className={"drawer-action-header"}>
                    
                    <div className="drawer-action-header-left">
                        Sections
                    </div>

                    <div className="drawer-action-header-right">
           
                    </div>
                </div>


                <div className="placeholder">
                    Human sections
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
    };
}

export default withRouter(connect(mapStateToProps, {
    createSection,
    searchSections,
    updateCollection,
    loadSection,
    deleteSection,
    updateSectionProperty,
    uncheckAll,
    setMainSection,
    loadSite
})(SectionUserSettings));
