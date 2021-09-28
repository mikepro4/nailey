import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import classNames from "classnames"
import * as _ from "lodash"

class HomePage extends Component {

    state = {
    }

    renderPage(page) {
        if(page) {
            return(<div>{page.metadata.title}</div>)
        } else {
            return(<div>404</div>)
        }
    }
    
    getPage() {
        let mainPath = this.props.location.pathname

        let current = _.filter(this.props.page.allPages, {
            metadata: {
                url: mainPath
            }
        })

        return this.renderPage(current[0])
    }

	render() {
		return (
     		<div className="route-content home-route">
                {this.getPage()}
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
	})(HomePage))
}