import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import * as _ from "lodash"
import { Icon } from "@blueprintjs/core";

import { showDrawer } from "../../../redux/actions/appActions"

class EditorLayoutSectionAdd extends Component {

    state = {
    }

    render() {
        return(
            <div className="layout-add-section" onClick={() => this.props.showDrawer("layout-selector", { insertPosition: this.props.position })}>
                <div className="layout-add-icon-wrapper">
                    <Icon icon="plus"/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.app.user,
        app: state.app,
        location: state.router.location,
        edit: state.app.edit,
    };
}

export default connect(mapStateToProps, {
    showDrawer
})(withRouter(EditorLayoutSectionAdd));
