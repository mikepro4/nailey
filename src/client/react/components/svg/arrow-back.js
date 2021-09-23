import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

class ArrowBack extends Component {
    render() {
        return (
            <div className="svg-wrapper">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="13"
                    fill="none"
                    viewBox="0 0 21 13"
                >
                    <path
                        fill="#000"
                        d="M6.3 12.7L7 12 2 7.2h18.7v-1H1.9L7.1.7 6.3 0 0 6.7l6.3 6z"
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

export default connect(mapStateToProps, {})(ArrowBack);
