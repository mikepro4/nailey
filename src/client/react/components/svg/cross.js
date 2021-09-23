import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

class Cross extends Component {
    render() {
        return (
            <div className="svg-wrapper">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="17"
                    fill="none"
                    viewBox="0 0 18 17"
                >
                    <path
                        fill="#000"
                        d="M9.358 8.354L17.004.707 16.297 0 8.65 7.646 1.004 0 .297.707l7.646 7.647L.297 16l.707.707L8.65 9.061l7.647 7.646.707-.707-7.646-7.646z"
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

export default connect(mapStateToProps, {})(Cross);
