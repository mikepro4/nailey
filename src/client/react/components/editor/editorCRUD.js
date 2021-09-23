import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import * as _ from "lodash"
import Button from "../button/"
import update from "immutability-helper";
import ContentEditable from 'react-contenteditable'

class EditorCRUD extends Component {

    constructor(props) {
        super(props)
        this.contentEditable = React.createRef();
        this.state = {
            value: []
        };
    };

    componentDidMount() {
        this.setState({
            value: this.props.options.value
        })
    }

    handleInputChange = (value) => {
        this.setState({
            value: value
        })
        this.props.updateFunction(value)
    }

    removeItem = (item) => {
        let keyToDeactivateIndex = _.findIndex(this.state.value, item);
        let newValue = update(this.state.value, {
            $splice: [[keyToDeactivateIndex, 1]] 
        })

        this.setState({
            value: newValue
        }, () => {
            this.props.updateFunction(newValue)
        })

    }

    handleChange =(event, item) => {
        let keyToUpdateIndex = _.findIndex(this.state.value, item);

        let newItem = {
            ...item,
            title: event.target.value
        }

        let newValue = update(this.state.value, {
            $splice: [[keyToUpdateIndex, 1, newItem]] 
        })

        this.setState({
            value: newValue
        }, () => {
            this.props.updateFunction(newValue)
        })
    }

    handleKeydown = evt => {
        if(evt.key === "Enter" ) {
            window.getSelection().removeAllRanges()
            evt.preventDefault()
        }
    };


    duplicateItem = (item) => {
        let newModel = {
            ...item,
            title: "Copy of " + item.title
        }
        this.setState({
            value: this.state.value.concat(newModel)
        }, () => {
            this.props.updateFunction(this.state.value)
        })
    }

    renderItem = (item, i) => {
        return (
            <div key={i}>

                <ContentEditable
                    ref="name"
                    className="title-editable"
                    html={item.title} // innerHTML of the editable div
                    disabled={false} // use true to disable edition
                    onChange={(event) => this.handleChange(event, item)} // handle innerHTML change
                    onKeyDown={this.handleKeydown}
                />

                <Button 
                    icon="trash"
                    minimal={true}
                    onClick={() => this.removeItem(item)}
                />
                <Button 
                    icon="duplicate"
                    minimal={true}
                    onClick={() => this.duplicateItem(item)}
                />
            </div>
        )
    }

    addItem = () => {
        this.setState({
            value: this.state.value.concat(this.props.options.model)
        }, () => {
            this.props.updateFunction(this.state.value)
        })
    }

    render() {
        return (
            <div
                className={classNames({
                    "editor-row": true,
                    "editor-select": true,
                })}
            >
                <div className="input-label">{this.props.options.label}</div>


                {this.state.value.map((item, i) => {
                    return this.renderItem(item, i)
                })
                }

                <Button 
                    icon="plus"
                    minimal={true}
                    onClick={() => this.addItem()}
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
})(withRouter(EditorCRUD));
