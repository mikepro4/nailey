import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import * as _ from "lodash"
import { findProperty } from "../helpers"

class HeroSectionLayout1 extends Component {

    renderLayout() {

    }

	render() {
        let section = this.props.section
        console.log(section.value)
        return (
            <div 
                className={classNames({
                    "main-section": true,
                    [section.value]: true,
                    [section.sectionValue]: true
                })}
            >

                {findProperty(section, "mainHeadline").value}
                {findProperty(section, "subtitle").value}
                
               
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
})(withRouter(HeroSectionLayout1));
