import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

class Home extends Component {
    render() {
        return (
            <div className="svg-wrapper">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="16"
                    fill="none"
                    viewBox="0 0 15 16"
                >
                <path
                    fill="#000"
                    d="M7.294 0L0 5.647V16h4.941V9.882h4.706V16h4.941V5.647L7.294 0z"
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

export default connect(mapStateToProps, {})(Home);
