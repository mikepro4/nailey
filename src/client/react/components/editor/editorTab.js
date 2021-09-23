import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import * as _ from "lodash"

class EditorTab extends Component {

    state = {
        value: "",
        tabOptions:[]
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

    componentDidMount = () => {
        this.setState({
            value: this.props.options.value,
            tabOptions: this.props.tabOptions
        })
    }

    componentDidUpdate = (prevprops) => {
       
    }

    render() {
        return (
            <div
                className={classNames({
                    "editor-row": true,
                    "editor-tab": true,
                    "tabgroup-container": true
                })}
            >
                <div className="input-label">{this.props.options.label}</div>
                <div className="control-container">
                    <div
                        className="control-tab-container"
                        ref="tab"
                    >
                        <ul className="tab-options">
                            {this.props.options.tabOptions.map((tabOption) => {
                                return (
                                    <li
                                        className={classNames({
                                            "tab-option-active": this.state.value == tabOption.value
                                        }, "tab-option")}
                                        onClick={() => this.handleInputChange(tabOption.value)}
                                        key={tabOption.value}
                                    >
                                        <div className="tab-option-label">{tabOption.label}</div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
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
})(withRouter(EditorTab));
