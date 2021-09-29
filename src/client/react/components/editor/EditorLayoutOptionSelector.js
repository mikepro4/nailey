import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import * as _ from "lodash"
import { Icon } from "@blueprintjs/core";

import EditorLayoutSectionAdd from "./editorLayoutSectionAdd"


class EditorLayoutOptionSelector extends Component {

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

    render() {
        console.log(this.state.sections)
        return (
            <div
                className={classNames({
                    "editor-row": true,
                    "editor-layout-option-selector": true,
                })}
            > 
                Layout option selector
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
    };
}

export default connect(mapStateToProps, {
})(withRouter(EditorLayoutOptionSelector));
