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
            value: [],
            results: []
        };
    };

    componentDidMount() {
        this.loadResults()
        this.setState({
            value: this.props.options.value
        })
    }

    loadResults() {
        this.props.options.loadResults((results) => {
            this.setState({
                results: results
            })
        })
    }

    handleInputChange = (value) => {
        this.setState({
            value: value
        })
        this.props.updateFunction(value)
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

    renderItem = (item, i) => {
        if(item.metadata.home) {
            return this.renderHome(item, i)
        }
        return (
            <div className="linker-item-container" key={i}>

                <div className="linker-item-left">
                    <div className="linker-icon-container">
                        <DragHandle/>
                    </div>
                    <ContentEditable
                        ref="name"
                        className="title-editable"
                        html={item.metadata.title ? item.metadata.title : ""} // innerHTML of the editable div
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

    renderHome = (item, i) => {
        return(
            <div className="linker-item-container" key={i}>

                <div className="linker-item-left">
                    <div className="linker-icon-container home">
                        <Home/>
                    </div>
                    <ContentEditable
                        ref="name"
                        className="title-editable"
                        html={item.metadata.title ? item.metadata.title : ""} // innerHTML of the editable div
                        disabled={true} // use true to disable edition
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

    removeItem = (item) => {
        this.props.options.deleteFunction(item._id, item, () => {
            this.loadResults()
        })
    }

    addItem = () => {
        this.props.options.createFunction(this.state.results.length, () => {
            this.loadResults()
        })
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

                {/* {this.renderHome()} */}
                {this.state.results.map((item, i) => {
                    return this.renderItem(item, i)
                })}

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
