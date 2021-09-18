import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import classNames from "classnames";
import { FocusStyleManager } from "@blueprintjs/core";
import Scroll from "./react/components/scroll"

FocusStyleManager.onlyShowFocusOnTabs();

class App extends Component {
	state = {
		appVisible: false
	}

	componentDidMount() {
    }

    componentWillUnmount() {
    }     
    
    componentDidUpdate(prevprops) {
	}

	render() {
		return (
            <div className="app">
                <div className="main-section">
                    <div className="app-route-container">
                        {renderRoutes(this.props.route.routes)}
                    </div>
                </div>

                <Scroll/>
			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		appReducer: state.appReducer,
        user: state.app.user,
	};
}

export default {
	component: withRouter(connect(mapStateToProps, {
	})(App))
};