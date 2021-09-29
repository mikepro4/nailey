import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import classNames from "classnames";
import Scroll from "./react/components/scroll"
import Header from "./react/components/header"
import UserMenu from "./react/components/userMenu"
import EditBar from "./react/components/editBar"
import Drawer from "./react/components/drawer"
import { FocusStyleManager } from "@blueprintjs/core";

import { loadSite} from "../client/redux/actions/sitesActions"
import { loadTheme} from "../client/redux/actions/themesActions"
import { showDrawer} from "../client/redux/actions/appActions"
import { authUser, fetchCurrentUser, clearCurrentUser } from "../client/redux/actions/authActions"
import { loadNewPageAsync } from "../client/redux/actions/pagesActions"
import {  loadSection  } from "../client/redux/actions/sectionsActions"

FocusStyleManager.onlyShowFocusOnTabs();

class App extends Component {

    static loadData(store, match, route, path, query, request) {
		return store.dispatch(loadSite(request.headers.host));
    }
    
	state = {
		appVisible: false
	}

	componentDidMount() {
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
       
        this.props.showDrawer("layout-selector")
        

        // Section editor open
        // this.props.loadSection("b452605d-d1b4-455c-8212-fe5e70ea23fb")
        // this.props.showDrawer("section-edit")
    }

    componentWillUnmount() {
    }     
    
    componentDidUpdate(prevprops) {
        if(prevprops.user !== this.props.user) {
            // this.props.clearCurrentUser()
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
        return(
            <div>
                {this.props.user && <UserMenu/>}
                <EditBar/>
            </div>
        )
    }


	render() {
        return (
            <div className="app">
                {this.props.currentSite ? (
                    <div>
                        <Header />

                        <div className="main-section">
                        <div className="app-route-container">
                            {renderRoutes(this.props.route.routes)}
                        </div>
                    </div>
                </div>
                ) :  (
                    <div>Select site</div>
                )}
                

                <Scroll/>

                {this.props.drawerOpen && <Drawer type={this.props.drawerType} />}

                {this.editComponents()}
            </div>
        )
		
	}
}
function mapStateToProps(state) {
	return {
		appReducer: state.appReducer,
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
        loadSection
	})(App))
};