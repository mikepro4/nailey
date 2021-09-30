import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import classNames from "classnames"
import * as _ from "lodash"

import { loadPage } from "../../../redux/actions/pagesActions"

import Sections from "../../sections/index"

class HomePage extends Component {

    state = {
    }

    componentDidUpdate(prevprops) {
        if(prevprops.location.pathname !== this.props.location.pathname) {
            this.props.loadPage()
        }
    }

    renderPage(page) {
        if(page) {
            return(<div><Sections/></div>)
        } else {
            return(<div>404</div>)
        }
    }
    

	render() {
		return (
     		<div className="route-content home-route">
                {this.renderPage(this.props.page.currentPage)}
            </div>
				
		);
	}
}

function mapStateToProps(state) {
	return {
        app: state.app,
        page: state.page
	};
}


export default {
	component: withRouter(connect(mapStateToProps, {
        loadPage
	})(HomePage))
}