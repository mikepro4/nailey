import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"
import { Link } from "react-router-dom";

class Button extends Component {
    state = {
        isVisible: false
    };

    componentDidUpdate(prevprops) {
    }

    componentDidMount() {
    }

    isLink() {
        return this.props.linkUrl && this.props.linkUrl.length > 0
    }

    getButtonLabel() {
        if (this.props.label) {
            return <span className="main-button-text">{this.props.label}</span>
        } else {
            return
        }
    }

    render() {
        let buttonClasses = classNames({
            "main-button": true,
            "main-button-link": this.isLink(),
            "main-button-minimal": this.props.minimal,
            "main-button-regular": this.props.regular,
            "extra": this.props.extra,
        })

        if (this.isLink()) {
            return (
                <a href={this.props.linkUrl} target="_blank" className={buttonClasses} title={this.props.title}>
                    {this.getButtonLabel()}
                </a>
            )
        }

        return (
            <button 
                className={buttonClasses} 
                title={this.props.title}
                onClick={this.props.onClick}
            >
                {this.getButtonLabel()}
            </button>
        )
    }
}

function mapStateToProps({ app }) {
    return {};
}

export default connect(mapStateToProps, {})(Button);
