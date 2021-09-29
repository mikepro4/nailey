import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import * as _ from "lodash"
import { Icon } from "@blueprintjs/core";

import { hideDrawer, showDrawer } from "../../../redux/actions/appActions"
import Button from "../../components/button"

class EditorLayoutOptionSelector extends Component {

    state = {
        options: []
    }

    componentDidMount() {
        if (this.props.options.options) {
            this.setState({
                options: this.props.options.options
            })
        }
    }

    componentDidUpdate(prevprops) {
        if (prevprops.options.options !== this.props.options.options) {
            this.setState({
                options: this.props.options.options
            })
        }
    }

    selectLayout = (layout) => {
        this.props.updateFunction(layout)
        this.props.showDrawer("layout-selector", { selectedLayout: layout})

    }

    renderButton = (option) => {
        if (this.props.options.value == option.value) {
            return (<Button
                label="Selected"
                minimal={true}
            />)
        } else {
            return (
                <Button
                    icon="plus"
                />
            )
        }
    }

    toggleLayoutOption(option) {
        if (this.props.options.value == option.value) {
            this.props.showDrawer("layout-selector", { selectedLayout: null })
        } else {
            this.selectLayout(option.value)
        }
    }


    renderItem = (option, i) => {
        return (
            <div
                className={classNames({
                    "layout-option-container": true,
                    "layout-option-active": this.props.options.value == option.value
                })}
                onClick={() => this.toggleLayoutOption(option)}
                key={i}

            >

                <div className="layout-option-left">
                    <div className="layout-option-title">
                        {option.label}
                    </div>
                </div>

                <div className="layout-option-right">
                    {this.renderButton(option)}
                </div>

            </div>
        )
    }

    render() {
        return (
            <div
                className={classNames({
                    "editor-row": true,
                    "editor-layout-option-selector": true,
                })}
            >
                {this.state.options.map((item, i) => {
                    return (this.renderItem(item, i))
                })}
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
    hideDrawer,
    showDrawer
})(withRouter(EditorLayoutOptionSelector));
