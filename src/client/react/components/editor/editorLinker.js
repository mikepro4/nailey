import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import * as _ from "lodash"
import Button from "../button/"
import update from "immutability-helper";
import ContentEditable from 'react-contenteditable'

import Home from "../../components/svg/home"
import DragHandle from "../../components/svg/dragHandle"

class EditorLinker extends Component {

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
    }

    renderIcon = () => {
        return(
            <div className="linker-icon-container">
                <DragHandle/>
            </div>
        )
    }

    renderItem = (item, i) => {
        return (
            <div className="linker-item-container" key={i}>

                <div className="linker-item-left">
                    <div className="linker-icon-container">
                        <DragHandle/>
                    </div>
                    <ContentEditable
                        ref="name"
                        className="title-editable"
                        html={item.metadata.title} // innerHTML of the editable div
                        disabled={false} // use true to disable edition
                        onChange={(event) => this.handleChange(event, item)} // handle innerHTML change
                        onKeyDown={this.handleKeydown}
                    />

                </div>

                <div className="linker-item-right">
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
                    <Button 
                        icon="edit"
                        onClick={() => console.log("edit page")}
                    />
                </div>
                
                
            </div>
        )
    }

    renderHome = () => {
        return(
            <div className="linker-item-container">

                <div className="linker-item-left">
                    <div className="linker-icon-container home">
                        <Home/>
                    </div>
                    <ContentEditable
                        ref="name"
                        className="title-editable"
                        html="Home" // innerHTML of the editable div
                        disabled={false} // use true to disable edition
                        onChange={(event) => this.handleChange(event, item)} // handle innerHTML change
                        onKeyDown={this.handleKeydown}
                    />

                </div>

                <div className="linker-item-right">
                    <Button 
                        icon="duplicate"
                        minimal={true}
                        onClick={() => this.duplicateItem(item)}
                    />
                    <Button 
                        icon="edit"
                        onClick={() => console.log("edit page")}
                    />
                </div>
                
                
            </div>
        )
       
    }

    addItem = () => {
        // this.setState({
        //     value: this.state.value.concat(this.props.options.model)
        // }, () => {
        //     this.props.updateFunction(this.state.value)
        // })
    }

    render() {

        let pages = [
            {
                id: 1,
                metadata: {
                    title: "Home",
                    home: true
                }
            },
            {
                id: 1,
                metadata: {
                    title: "Services",
                }
            },
            {
                id: 1,
                metadata: {
                    title: "About",
                }
            },
            {
                id: 1,
                metadata: {
                    title: "Services",
                }
            }
        ]

        let filteredPages = _.filter(pages, (page,i) => {
            return !page.metadata.home
        })

        return (
            <div
                className={classNames({
                    "editor-row": true,
                    "editor-linker": true,
                })}
            >
                <div className="input-label">{this.props.options.label}</div>

                {this.renderHome()}
                {filteredPages.map((item, i) => {
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
})(withRouter(EditorLinker));
