import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"

class Logo extends Component {

	render() {
        return (
            <div 
                className={classNames({
                    "app-logo": true
                })}
            >
                <Link to="/">Nailey</Link>
            </div>
        );
	}
}

function mapStateToProps(state) {
	return {
		user: state.app.user,
        location: state.router.location,
	};
}

export default connect(mapStateToProps, {
})(withRouter(Logo));
