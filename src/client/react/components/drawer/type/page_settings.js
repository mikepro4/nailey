import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Classes, Intent, Position, Toaster } from "@blueprintjs/core";

import qs from "qs";
import * as _ from "lodash"

import { updateCollection, uncheckAll } from "../../../../redux/actions/appActions"
import { createFont, searchFonts, loadFont, deleteFont, updateFontProperty, setMainFont} from "../../../../redux/actions/fontsActions"
import { loadSite} from "../../../../redux/actions/sitesActions"

import Button from "../../button"
import ListResults from "../../list"


class FontSettings extends Component {

    state = {
        loading: false
    }

    getQueryParams = () => {
        return qs.parse(this.props.location.search.substring(1));
    };
    

    handleTitleChange = (item, value) => {
        this.props.updateFontProperty(item, "title", value, () => {
            this.props.loadFont()
            this.props.loadSite()
        })
    } 


    render() {
        return (
            <div className={"app-drawer-content-container standard-drawer page-settings-drawer"}>
                <div className={"drawer-action-header"}>
                    
                    <div className="drawer-action-header-left">
                        Page
                    </div>

                    <div className="drawer-action-header-right">
                    
                    </div>
                </div>


                <div className="placeholder">
                   Page
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
    createFont,
    searchFonts,
    updateCollection,
    loadFont,
    deleteFont,
    updateFontProperty,
    uncheckAll,
    setMainFont,
    loadSite
})(FontSettings));
