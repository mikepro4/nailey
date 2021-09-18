import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import classNames from "classnames"

class HomePage extends Component {

    state = {
	}

    renderHead = () => (
		<Helmet>
			<title>Nailey – Your Nail Artist</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
    )

	render() {
		return (
     		<div className="route-content home-route">
                {this.renderHead()}

                <div className="placeholder">Nailey</div>
			</div>
				
		);
	}
}

function mapStateToProps(state) {
	return {
        app: state.app
	};
}


export default {
	component: withRouter(connect(mapStateToProps, {
	})(HomePage))
}