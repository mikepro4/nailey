import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Switch } from "@blueprintjs/core";

class EditorSwitch extends Component {

    state = {
        active: false
    }

    componentDidMount() { 
        if(this.props.options.active) {
            this.setState({
                active: true
            })
        }
    }

    componentDidUpdate(prevprops) {
        if(prevprops.options.active !== this.props.options.active) {
            this.setState({
                active: this.props.options.active
            })
        }
    }
    handleSwitchChange = (data) => {
 
        this.setState({
            active: !this.state.active
        }, () => {
            this.props.updateFunction(this.state.active)
        })
    }

    render() {
        return (
            <div
                className={classNames({
                    "editor-switch": true,
                    "editor-row": true
                })}
            >
                <Switch 
                    checked={this.state.active} 
                    onChange={this.handleSwitchChange} 
                    label={this.props.options.label}
                />

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
})(withRouter(EditorSwitch));
