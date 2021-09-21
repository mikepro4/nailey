import React, { ReactElement, useRef, useMemo, useState, useCallback, Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Switch, Icon, Button, Classes, Intent, Position, Toaster } from "@blueprintjs/core";
import * as _ from "lodash"
import moment from "moment"

import { uncheckAll } from "../../../../redux/actions/appActions"
import { setMainSite } from "../../../../redux/actions/sitesActions"


class SiteView extends Component {

    state = {
        isMain: false
    }

    componentDidMount() {
        if(this.props.item.metadata.main) {
            this.setState({
                isMain: true
            })
        }
    }

    componentDidUpdate(prevprops) {
        if(prevprops.app.uncheckAll !== this.props.app.uncheckAll) {
            if(this.props.item._id !== this.props.app.dontUncheck) {
                this.setState({
                    isMain: false
                })
            }
        }
    }

    handleSwitchChange = (data) => {
        this.props.uncheckAll(true, this.props.item._id)

        this.props.setMainSite(this.props.item,!this.state.isMain)

        setTimeout(() => {
                this.props.uncheckAll(false, this.props.app.dontUncheck)
        }, 1000)


        this.setState({
            isMain: !this.state.isMain
        }, () => {
        })
    }

    render() {
        return(
            <div className="site-view-container">

                <div className="site-view-left">
                    <Switch 
                        checked={this.state.isMain} 
                        onChange={this.handleSwitchChange} 
                    />
                    <div className="site-title">
                        {this.props.item.metadata.title}
                    </div>
                </div>

                <div className="site-view-right">

                </div>

                <div className="site-title">
                    {/* {this.props.item._id}
                    {this.props.item.metadata.title} {this.props.item.metadata.createdBy}  */}

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
        clientWidth: state.app.clientWidth,
    };
}

export default withRouter(connect(mapStateToProps, {
    setMainSite,
    uncheckAll
})(SiteView));
