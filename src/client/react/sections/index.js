import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import * as _ from "lodash"
import HeroSection from "./hero";
import layout1 from "./hero/layout1";

import { showDrawer } from "../../redux/actions/appActions"
import { loadSection } from "../../redux/actions/sectionsActions"
import { layoutActive } from "../../redux/actions/layoutActions"

class Sections extends Component {

    sectionWrapper(section, component) {
        return (
            <div
                className="section-wrapper"
                onClick={() => {
                    this.props.loadSection(section.id)
                    this.props.showDrawer("section-edit")
                    this.props.layoutActive(section.id)
                }
                }
            >
                {component}
            </div>
        )
    }

    renderSection(section, i) {
        // return (<div key={i}>sections</div>)

        switch (section.sectionValue) {
            case "hero":
                return (this.sectionWrapper(section, <HeroSection section={section} position={i} />))
            case "textBlock":
                return (<div>Hero</div>)
        }
    }

    renderSections() {
        let page = this.props.page.currentPage
        let finalSections = _.map(page.metadata.sections, (section, i) => {
            return (<div key={i}>{this.renderSection(section, i)}</div>)
        })
        return finalSections
    }

    render() {
        return (
            <div
                className={classNames({
                    "main-sections": true
                })}
            >

                {this.renderSections()}


            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.app.user,
        app: state.app,
        location: state.router.location,
        page: state.page,
        layout: state.layout
    };
}

export default connect(mapStateToProps, {
    loadSection,
    showDrawer,
    layoutActive
})(withRouter(Sections));
