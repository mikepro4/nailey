import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import * as _ from "lodash"
import Button from "../button/"
import update from "immutability-helper";

class EditorCRUD extends Component {

    state = {
        value: []
    }

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

    duplicateItem = () => {
        let newModel = {
            ...this.props.options.model,
            title: "Copy of " + this.props.options.model.title
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
                {item.title} 

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
