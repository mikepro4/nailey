import React, { ReactElement, useRef, useMemo, useState, useCallback, Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Switch, Icon, Button, Classes, Intent, Position, Toaster } from "@blueprintjs/core";
import * as _ from "lodash"
import moment from "moment"
import ContentEditable from 'react-contenteditable'

import { uncheckAll } from "../../../../redux/actions/appActions"
import { setMainSite, updateSiteProperty } from "../../../../redux/actions/sitesActions"


class SiteView extends Component {

    constructor(props) {
        super(props)
        this.contentEditable = React.createRef();
        this.state = {
            html: this.props.item.metadata.title,
            isMain: false
        };
    };

    handleChange = evt => {
        this.setState({html: evt.target.value});
        this.props.updateSiteProperty(this.props.item, "title", evt.target.value)
    };

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
                    isMain: false,
                    html: this.props.item.metadata.title
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
                        <ContentEditable
                            className="title-editable"
                            html={this.state.html} // innerHTML of the editable div
                            disabled={false} // use true to disable edition
                            onChange={this.handleChange} // handle innerHTML change
                        />
                    </div>
                </div>

                <div className="site-view-right">
                    Edit delete
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
    uncheckAll,
    updateSiteProperty
})(SiteView));
