import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { NumericInput } from "@blueprintjs/core";

class EditorNumericInput extends Component {

    state = {
        value: ""
    }

    componentDidMount() { 
        if(this.props.options.value) {
            this.setState({
                value: this.props.options.value
            })
        }
    }

    handleInputChange = (value) => {
      this.setState({
          value: value
      })
      this.props.updateFunction(value)
    }

    render() {
        return (
            <div
                className={classNames({
                    "editor-row": true,
                    "editor-input": true,
                })}
            > 
                <div className="input-label">{this.props.options.label}</div>
                <NumericInput 
                    asyncControl={true}
                    onValueChange={this.handleInputChange}
                    value={this.state.value}
                    stepSize={1}
                    min={0}
                    max={200}
                    allowNumericCharactersOnly={true}
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
})(withRouter(EditorNumericInput));
