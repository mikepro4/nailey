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
            },
            indicatorSeparator: (provided, state) => {
                return({
                    ...provided,
                    opacity: 0
                })
            },
            dropdownIndicator: (provided, state) => {
                return({
                    ...provided,
                    background: `url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI1IiB2aWV3Qm94PSIwIDAgOCA1IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTggMC41QzggMC4yMiA3Ljc4IDAgNy41IDBIMC41QzAuMjIgMCAwIDAuMjIgMCAwLjVDMCAwLjYzIDAuMDUgMC43NCAwLjEzIDAuODNMMy42MyA0LjgzQzMuNzIgNC45MyAzLjg1IDUgNCA1QzQuMTUgNSA0LjI4IDQuOTMgNC4zNyA0LjgzTDcuODcgMC44M0M3Ljk1IDAuNzQgOCAwLjYzIDggMC41WiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==) center center no-repeat`,
                    '& > svg': {
                        display: "none"
                    },
                    width: "34px"
                })
            },
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
                    defaultValue={{
                        value: this.props.options.value,
                        label: this.props.options.value
                    }}
                    isSearchable={false}
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
