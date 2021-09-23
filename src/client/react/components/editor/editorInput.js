import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { InputGroup } from "@blueprintjs/core";

class EditorInput extends Component {

    state = {
        value: ""
    }

    componentDidMount() { 
        console.log(this.props.options.value)
        if(this.props.options.value) {
            this.setState({
                value: this.props.options.value
            })
        }
    }

    handleInputChange = (event) => {
      this.setState({
          value: event.target.value
      })
      this.props.updateFunction(event.target.value)
    }

    render() {
        return (
            <div
                className={classNames({
                    "editor-input": true,
                })}
            > {this.props.options.label}
                <InputGroup 
                    asyncControl={true}
                    disabled={this.props.disabled}
                    large={this.props.large}
                    onChange={this.handleInputChange}
                    placeholder="Type title..."
                    small={this.props.large}
                    value={this.state.value}
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
})(withRouter(EditorInput));
