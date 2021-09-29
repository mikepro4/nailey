import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import * as _ from "lodash"
import { Icon } from "@blueprintjs/core";

import EditorLayoutSectionAdd from "./editorLayoutSectionAdd"


class EditorLayout extends Component {

    state = {
        sections: []
    }

    componentDidMount() { 
        if(this.props.options.value) {
            this.setState({
                sections: this.props.options.value
            })
        }
    }

    componentDidUpdate(prevprops) { 
        if(prevprops.options.value !== this.props.options.value) {
            this.setState({
                sections: this.props.options.value
            })
        }
    }

    handleInputChange = (sections) => {
        this.setState({
            sections: sections
        })
        this.props.updateFunction(sections)
    }

    renderSection(section, i) {
        return(
            <div key={i}>
                {section.label}
                <EditorLayoutSectionAdd  position={i}/>
            </div>
        )
    }

    renderSections(sections) {
        return(
            <div>
                {sections.map((item, i) => {
                    return this.renderSection(item, i)
                })}
            </div>
        )
    }

    renderSectionsScreen() {
        let sections = this.props.page.metadata.sections
        
        if(sections.length < 1) {
            return(<EditorLayoutSectionAdd position={0}/>)
        } else {
            return(this.renderSections(sections))
        }
    }

    render() {
        return (
            <div
                className={classNames({
                    "editor-row": true,
                    "editor-layout": true,
                })}
            > 
                {this.renderSectionsScreen()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.app.user,
        app: state.app,
        location: state.router.location,
        edit: state.app.edit,
        page: state.page.currentPage
    };
}

export default connect(mapStateToProps, {
})(withRouter(EditorLayout));
