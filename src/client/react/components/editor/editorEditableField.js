import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import * as _ from "lodash"
import Button from "../button/"
import update from "immutability-helper";
import ContentEditable from 'react-contenteditable'

class EditorEditableField extends Component {

    constructor(props) {
        super(props)
        this.contentEditable = React.createRef();
        this.state = {
            value: "",
        };
    };

    componentDidMount() {
        this.setState({
            value: this.props.value
        })
    }

    handleChange =(event) => {
        this.setState({
            value: event.target.value
        }, () => {
            this.props.updateField(event.target.value )
        })
    }

    handleKeydown = evt => {
        if(evt.key === "Enter" ) {
            window.getSelection().removeAllRanges()
            evt.preventDefault()
        }
    };

    render() {
        return (
            <ContentEditable
                ref="name"
                className="title-editable"
                html={this.state.value} 
                disabled={false} 
                onChange={(event) => this.handleChange(event)} 
                onKeyDown={this.handleKeydown}
            />
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
})(withRouter(EditorEditableField));
