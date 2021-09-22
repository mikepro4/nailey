import React, { ReactElement, useRef, useMemo, useState, useCallback, Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Switch, Icon, Classes, Intent, Position, Toaster } from "@blueprintjs/core";
import * as _ from "lodash"
import moment from "moment"
import ContentEditable from 'react-contenteditable'

import { uncheckAll, updateCollection } from "../../../../redux/actions/appActions"
import { setMainSite, updateSiteProperty, createSite, deleteSite, loadSite } from "../../../../redux/actions/sitesActions"

import Button from "../../button"


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
        // if(evt.key === "Enter" ) {
        //     evt.preventDefault()
        //     console.log("here")
        // }
        this.setState({html: evt.target.value});
        this.props.updateSiteProperty(this.props.item, "title", evt.target.value, () => {
            this.props.loadSite()
        })
    };

    handleKeydown = evt => {
        if(evt.key === "Enter" ) {
            window.getSelection().removeAllRanges()
            evt.preventDefault()
        }
        // this.setState({html: evt.target.value});
        // this.props.updateSiteProperty(this.props.item, "title", evt.target.value, () => {
        //     this.props.loadSite()
        // })
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

        this.props.setMainSite(this.props.item,!this.state.isMain, () => {
            this.props.loadSite()
        })

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
                            ref="name"
                            className="title-editable"
                            html={this.state.html} // innerHTML of the editable div
                            disabled={false} // use true to disable edition
                            onChange={this.handleChange} // handle innerHTML change
                            onKeyDown={this.handleKeydown}
                        />
                    </div>
                </div>

                <div className="site-view-right">
                    

                    <Button
                        icon="trash"
                        minimal={true}
                        onClick={() => {
                            this.props.deleteSite(this.props.item._id, this.props.item, () => {
                                this.props.updateCollection(true)
                                this.props.loadSite()
                            })
                        }}
                    />

                    <Button
                        icon="duplicate"
                        minimal={true}
                        onClick={() => {
                            let finalItem = {
                                ...this.props.item,
                                metadata: {
                                    ...this.props.item.metadata,
                                    title: "Copy of " + this.props.item.metadata.title,
                                    main: false
                                }
                            }
                            this.props.createSite(finalItem, () => {
                                this.props.updateCollection(true)
                                this.props.loadSite()
                            })
                        }}
                    />

                    <Button
                        icon="edit"
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
    setMainSite,
    uncheckAll,
    updateSiteProperty,
    createSite,
    updateCollection,
    deleteSite,
    loadSite
})(SiteView));
