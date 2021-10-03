import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import classNames from "classnames";
import keydown from "react-keydown";

import Scroll from "./react/components/scroll"
import Header from "./react/components/header"
import UserMenu from "./react/components/userMenu"
import EditBar from "./react/components/editBar"
import Drawer from "./react/components/drawer"
import { FocusStyleManager } from "@blueprintjs/core";

import { loadSite } from "../client/redux/actions/sitesActions"
import { loadTheme } from "../client/redux/actions/themesActions"
import { showDrawer, hideDrawer, setScrollTo, enableEdit, disableEdit } from "../client/redux/actions/appActions"
import { authUser, fetchCurrentUser, clearCurrentUser } from "../client/redux/actions/authActions"
import { loadNewPageAsync } from "../client/redux/actions/pagesActions"
import { loadSection } from "../client/redux/actions/sectionsActions"

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'

FocusStyleManager.onlyShowFocusOnTabs();

class App extends Component {

    static loadData(store, match, route, path, query, request) {
        return store.dispatch(loadSite(request.headers.host));
    }

    state = {
        appVisible: false
    }

    @keydown("esc")
    hideDrawer() {
        this.props.hideDrawer()
    }

    @keydown("ctrl + s")
    showSectionSettings() {
        if (this.props.app.user && this.props.app.edit) {
            this.props.showDrawer("section-user-settings")
        }
    }

    @keydown("ctrl + e")
    toggleEdit() {
        if (this.props.app.user) {
            if (this.props.app.edit) {
                this.props.disableEdit()
                this.props.hideDrawer()
            } else {
                this.props.enableEdit()
            }
        }
    }


    componentDidMount() {
        this.props.setScrollTo(0)
        this.auth()
        this.props.loadSite()
        this.props.loadTheme()

        // this.props.loadNewPageAsync("61529446985e527ab034c8c1", true, () => {
        //     this.props.showDrawer("page-edit")
        // })

        // this.props.loadNewSectionAsync("6152b301be94497dfd8e2bd4", true, () => {
        //     this.props.showDrawer("section-edit")
        // })

        // this.props.showDrawer("section-user-settings")

        // this.props.showDrawer("layout-selector")


        // Section editor open
        // this.props.loadSection("1fd46fd8-5775-4520-af18-dd0704c33f41")
        // this.props.showDrawer("layout-selector", { insertPosition: 1, forceOpen: "hero"})
        // this.props.showDrawer("domain-settings")
    }

    componentWillUnmount() {
    }

    componentDidUpdate(prevprops) {
        if (prevprops.user !== this.props.user) {
            // this.props.clearCurrentUser()
        }


        if (this.props.location.pathname !== prevprops.location.pathname) {
            console.log("here")
            this.props.setScrollTo(0)
        }
    }

    auth() {
        const token = localStorage.getItem('token');
        if (token) {
            this.props.authUser()
            this.loadUser()
        } else {

        }
    }

    loadUser() {
        this.props.fetchCurrentUser(() => {
        })
    }

    editComponents() {
        return (
            <div>
                {this.props.user && <UserMenu />}
                <EditBar />
            </div>
        )
    }


    render() {

        let dndBackend

        if (this.props.app.clientWidth < 500) {
            dndBackend = TouchBackend
        } else {
            dndBackend = HTML5Backend
        }

        return (

            <div 
                className={classNames({
                    "app": true,
                    "editing": this.props.app.edit
                })}
            >
                <DndProvider backend={HTML5Backend} >

                    {this.props.currentSite  ? (
                        <div>
                            {this.props.user && <Header /> }

                            <div className="main-section">
                                <div className="app-route-container">
                                    {renderRoutes(this.props.route.routes)}
                                </div>
                            </div>
                        </div>
                    ) : (
                            <div>Select site</div>
                        )}


                    <Scroll />

                    {this.props.drawerOpen && <Drawer type={this.props.drawerType} />}

                    {this.editComponents()}

                </DndProvider>

            </div>
        )

    }
}
function mapStateToProps(state) {
    return {
        appReducer: state.appReducer,
        app: state.app,
        user: state.app.user,
        edit: state.app.edit,
        drawerOpen: state.app.drawerOpen,
        drawerType: state.app.drawerType,
        currentSite: state.site.currentSite
    };
}

export default {
    component: withRouter(connect(mapStateToProps, {
        authUser,
        fetchCurrentUser,
        clearCurrentUser,
        showDrawer,
        loadSite,
        loadTheme,
        loadSection,
        hideDrawer,
        setScrollTo,
        enableEdit,
        disableEdit
    })(App))
};