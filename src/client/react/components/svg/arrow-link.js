import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

class ArrowLink extends Component {
    render() {
        return (
            <div className="svg-wrapper">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 16 16"
                >
                    <path
                        fill="#000"
                        fillRule="evenodd"
                        d="M6.082 0H16v9.5h-1V1.707L1.354 15.354l-.708-.708L14.293 1H6.082V0z"
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

export default connect(mapStateToProps, {})(ArrowLink);
