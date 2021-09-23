import React, { Component } from "react";
import { connect, ReactReduxContext } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import * as _ from "lodash"

import AsyncSelect from 'react-select/async';

class EditorSelectAsync extends Component {

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

        const customStyles = {
            menuPortal: base => ({ ...base, zIndex: 9999 }),
           
            control: (provided, state) => {
                return({
                    ...provided,
                    fontWeight: 500,
                    boxShadow: "none",
                    border: "1px solid rgba(0,0,0,0.15)",
                    '&:hover': {
                        border: '1px solid rgba(0,0,0,0.20)'
                    }
                })
            }
        }

        return (
            <div
                className={classNames({
                    "editor-row": true,
                    "editor-select": true,
                })}
            >
                <div className="input-label">{this.props.options.label}</div>

                <AsyncSelect
                    onChange={_.debounce(this.handleInputChange, 1)}
                    cacheOptions
                    loadOptions={_.debounce(this.props.options.loadOptions, 1000)}
                    defaultOptions
                    autoload={true}
                    isClearable={false}
                    defaultInputValue={this.props.options.value}
                    menuPortalTarget={document.body}
                    styles={customStyles}
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
})(withRouter(EditorSelectAsync));
