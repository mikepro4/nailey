import React, { ReactElement, useRef, useMemo, useState, useCallback, Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Switch, Icon, Classes, Intent, Position, Toaster } from "@blueprintjs/core";
import * as _ from "lodash"
import moment from "moment"
import ContentEditable from 'react-contenteditable'

import { uncheckAll, updateCollection } from "../../../../redux/actions/appActions"

import Button from "../../button"


class SiteView extends Component {

    constructor(props) {
        super(props)
        this.contentEditable = React.createRef();
        this.state = {
            html: this.props.item.metadata.title,
            isMain: false,
            updatedTitle: false,
            updatedMain: false
        }
    };

    handleChange = (evt, finalItem) => {
        this.setState({html: evt.target.value});
        this.props.onEdit(finalItem, evt.target.value)
        this.setState({
            updatedTitle: true,
            updatedMain: true
        })
    };

    handleKeydown = evt => {
        if(evt.key === "Enter" ) {
            window.getSelection().removeAllRanges()
            evt.preventDefault()
        }
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
                    html: this.props.item.metadata.title,
                })
            }
        }
    }

    handleSwitchChange = (data, item) => {
        this.props.mainFunction(item, this.state.isMain)
 
        this.setState({
            isMain: !this.state.isMain
        }, () => {
        })
    }

    render() {
       let  finalItem = {
            ...this.props.item,
            metadata: {
                ...this.props.item.metadata,
                title: this.state.html,
                main: this.state.isMain
            }
        }
   
        return(
            <div className="site-view-container transition-element">

                <div className="site-view-left">
                    {this.props.mainSwitch && <Switch 
                        checked={this.state.isMain} 
                        onChange={(data) => this.handleSwitchChange(data, finalItem)} 
                    />}
                    
                    <div className="site-title">
                        <ContentEditable
                            ref="name"
                            className="title-editable"
                            html={this.state.html} // innerHTML of the editable div
                            disabled={false} // use true to disable edition
                            onChange={(data) => {this.handleChange(data, finalItem)}} // handle innerHTML change
                            onKeyDown={this.handleKeydown}
                        />
                    </div>
                </div>

                <div className="site-view-right">
                    

                    <Button
                        icon="trash"
                        minimal={true}
                        onClick={() => {
                            this.props.onDelete(finalItem)
                        }}
                    />

                    <Button
                        icon="duplicate"
                        minimal={true}
                        onClick={() => {
                            this.props.onCreate(finalItem)
                        }}
                    />

                    <Button
                        icon="edit"
                        onClick={() => {
                            this.props.onItemEdit(finalItem)
                        }}
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
        clientWidth: state.app.clientWidth,
    };
}

export default withRouter(connect(mapStateToProps, {
    uncheckAll,
    updateCollection,
})(SiteView));
