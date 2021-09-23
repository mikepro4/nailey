import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import * as _ from "lodash"

class EditorCRUD extends Component {

    state = {
        value: ""
    }

    componentDidMount() { 
        
    }

    handleInputChange = (value) => {
        console.log(value)
        this.setState({
            value: value
        })
        this.props.updateFunction(value)
    }

    render() {
        console.log(this.props)
        return (
            <div
                className={classNames({
                    "editor-row": true,
                    "editor-select": true,
                })}
            > 
                <div className="input-label">{this.props.options.label}</div>

                CRUD

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.app.user,
        app: state.app,
        location: state.router.location,
        edit: state.app.edit
    };
}

export default connect(mapStateToProps, {
})(withRouter(EditorCRUD));
