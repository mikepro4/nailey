import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Classes, Intent, Position, Toaster } from "@blueprintjs/core";

import qs from "qs";
import * as _ from "lodash"

import { updateCollection, uncheckAll } from "../../../../redux/actions/appActions"
import { createTheme, searchThemes, loadTheme, deleteTheme, updateThemeProperty, setMainTheme} from "../../../../redux/actions/themesActions"
import { loadSite} from "../../../../redux/actions/sitesActions"

import Button from "../../button"
import ListResults from "../../list"


class ThemeSettings extends Component {

    state = {
        loading: false
    }

    getQueryParams = () => {
        return qs.parse(this.props.location.search.substring(1));
    };
    

    handleTitleChange = (item, value) => {
        this.props.updateThemeProperty(item, "title", value, () => {
            this.props.loadTheme()
            this.props.loadSite()
        })
    } 


    render() {
        return (
            <div className={"app-drawer-content-container standard-drawer theme-settings-drawer theme-" + this.props.theme}>
                <div className={"drawer-action-header theme-" + this.props.theme}>
                    
                    <div className="drawer-action-header-left">
                        {this.props.theme.count} theme{this.props.theme.count > 1 ? "s" : ""}
                    </div>

                    <div className="drawer-action-header-right">
                        <Button
                            label="Create theme"
                            onClick={() => {
                                this.props.createTheme({
                                    metadata: {
                                        title: "Untitled",
                                        createdBy: this.props.user._id
                                    }
                                }, () => {
                                    this.props.updateCollection(true)
                                    this.props.loadTheme()
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
                        searchCollection={this.props.searchThemes}
                        onDelete={(item) => {
                            this.props.deleteTheme(item._id, item, () => {
                                this.props.updateCollection(true)
                                this.props.loadTheme()
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
                            this.props.createTheme(finalItem, () => {
                                this.props.updateCollection(true)
                                this.props.loadTheme()
                                this.props.loadSite()
                            })
                        }}
                        onEdit={(item, value) => {
                            this.handleTitleChange(item, value)
                        }}
                        mainSwitch={true}
                        mainFunction={(item, isMain) => {
                            this.props.uncheckAll(true, item._id)

                            this.props.setMainTheme(item,!isMain, () => {
                                this.props.loadTheme()
                                this.props.loadSite()
                            })

                            setTimeout(() => {
                                this.props.uncheckAll(false, this.props.app.dontUncheck)
                            }, 1000)

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
        theme: state.theme,
        user: state.app.user,
        authenticated: state.auth.authenticated,
    };
}

export default withRouter(connect(mapStateToProps, {
    createTheme,
    searchThemes,
    updateCollection,
    loadTheme,
    deleteTheme,
    updateThemeProperty,
    uncheckAll,
    setMainTheme,
    loadSite
})(ThemeSettings));
