import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

class CaretUp extends Component {
    render() {
        return (
            <div className="svg-wrapper">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="10"
                    fill="none"
                    viewBox="0 0 17 10"
                >
                    <path
                        fill="#000"
                        fillRule="evenodd"
                        d="M16.855 9.147l-.707.707-7.646-7.647L.856 9.854l-.708-.707L8.502.793l8.353 8.354z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps, {})(CaretUp);
