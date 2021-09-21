import React, { ReactElement, useRef, useMemo, useState, useCallback, Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster } from "@blueprintjs/core";
import * as _ from "lodash"
import moment from "moment"


class SiteView extends Component {

    render() {
        return(
            <div className="site-view">
               <div className="site-title">
                    {this.props.item._id}
                    {this.props.item.metadata.title} {this.props.item.metadata.createdBy} 

               </div>
            </div>
        )
        
    }
}

function mapStateToProps(state) {
    return {
        user: state.app.user,
        authenticated: state.auth.authenticated,
        clientWidth: state.app.clientWidth,
    };
}

export default withRouter(connect(mapStateToProps, {
})(SiteView));
