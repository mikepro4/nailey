import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

class CaretDown extends Component {
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
                        d="M.148.854L.856.146l7.646 7.647L16.148.146l.707.708-8.353 8.353L.148.854z"
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

export default connect(mapStateToProps, {})(CaretDown);
