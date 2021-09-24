import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"

import Select from "react-select";

import ImageUploader from "../image_uploader"

class EditorImage extends Component {

    state = {
        value: ""
    }

    capitalize(s) {
        return s[0].toUpperCase() + s.slice(1);
    }

    componentDidMount() { 
        if(this.props.options.value) {
            this.setState({
                value:  {
                    value: this.props.options.value,
                    label: this.capitalize(this.props.options.value)
                }
            })
        }
    }

    handleInputChange = (value) => {
        this.setState({
            value: value
        })
        this.props.updateFunction(value)
    }

    render() {
        return (
            <div
                className={classNames({
                    "editor-row": true,
                    "editor-image": true,
                })}
            > 
                <div className="input-label">{this.props.options.label}</div>

                <ImageUploader
                    canUpload={true}
                    onSuccess={(value) => this.handleInputChange(value)}
                    imageUrl={this.props.options.value}
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
})(withRouter(EditorImage));
