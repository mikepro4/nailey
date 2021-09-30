import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import * as _ from "lodash"

import Layout1 from "./layout1"

class HeroSection extends Component {

    renderLayout(section) {
        switch(section.value) {
            case "layout1":
                return(<Layout1 section={this.props.section}/>)
         }
    }

	render() {
        let section = this.props.section
        return (
            <div 
                className={classNames({
                    "hero-section-container": true
                })}
            >

                {this.renderLayout(section)}
               
            </div>
        );
	}
}

function mapStateToProps(state) {
	return {
        user: state.app.user,
        app: state.app,
        location: state.router.location,
        page: state.page
	};
}

export default connect(mapStateToProps, {
})(withRouter(HeroSection));
