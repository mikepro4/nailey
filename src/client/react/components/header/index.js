import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import MainLinks from "../main_links"
import Logo from "../logo"
import Button from "../button"

class Header extends Component {

	render() {
        return (
            <div 
                className={classNames({
                    "app-header": true
                })}
            >
                <MainLinks />
                <Logo/>
                <div className="header-right">
                    <Button/>
                </div>
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
})(withRouter(Header));
