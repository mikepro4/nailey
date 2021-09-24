import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

class DragHandle extends Component {
    render() {
        return (
            <div className="svg-wrapper">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="6"
                    fill="none"
                    viewBox="0 0 16 6"
                >
                    <path
                        fill="#000"
                        fillRule="evenodd"
                        d="M0 0h16v1H0V0zm0 5h16v1H0V5z"
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

export default connect(mapStateToProps, {})(DragHandle);
