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
            <div className={"app-drawer-content-container standard-drawer font-settings-drawer "}>
                <div className={"drawer-action-header"}>
                    
                    <div className="drawer-action-header-left">
                        Fonts
                    </div>

                    <div className="drawer-action-header-right">
                        <Button
                            label="Create font"
                            onClick={() => {
                                this.props.createFont({
                                    metadata: {
                                        title: "Untitled",
                                        createdBy: this.props.user._id
                                    }
                                }, () => {
                                    this.props.updateCollection(true)
                                    this.props.loadFont()
                                    this.props.loadSite()
                                })
                            }}
                        />
                    
                    </div>
                </div>


                <div className="placeholder">
                    <ListResults
                        type="site"
                        resultType="site"
                        searchCollection={this.props.searchFonts}
                        onDelete={(item) => {
                            this.props.deleteFont(item._id, item, () => {
                                this.props.updateCollection(true)
                                this.props.loadFont()
                                this.props.loadSite()
                            })
                        }}
                        onCreate={(item) => {
                            let finalItem = {
                                ...item,
                                metadata: {
                                    ...item.metadata,
                                    title: "Copy of " + item.metadata.title,
                                    main: false
                                }
                            }
                            this.props.createFont(finalItem, () => {
                                this.props.updateCollection(true)
                                this.props.loadFont()
                                this.props.loadSite()
                            })
                        }}
                        onEdit={(item, value) => {
                            this.handleTitleChange(item, value)
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
