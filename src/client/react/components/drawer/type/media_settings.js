import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import qs from "qs";
import * as _ from "lodash"
import update from "immutability-helper";

import { v4 as uuidv4 } from 'uuid';

import { hideDrawer, updateProperty } from "../../../../redux/actions/appActions"
import { loadPage} from "../../../../redux/actions/pagesActions"
import { loadSite } from "../../../../redux/actions/sitesActions"
import { layoutActive} from "../../../../redux/actions/layoutActions"

import Cross from "../../svg/cross"


class MediaSettings extends Component {

    state = {
        loading: false
    }


    render() {


        return (
            <div className={"app-drawer-content-container standard-drawer media-settings-drawer"}>
                <div className={"drawer-action-header"}>
                    
                    <div className="drawer-action-header-left">
                        <span className="drawer-action-header-title">
                            Media
                        </span>
                    </div>

                    <div className="drawer-action-header-right">
                        <div onClick={() => this.props.hideDrawer()}>
                            <Cross />
                        </div>
                    </div>
                </div>


                <div className="placeholder">
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
    hideDrawer,
    layoutActive,
    loadSite,
    updateProperty
})(MediaSettings));
