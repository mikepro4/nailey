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

import EditorEditableField from "./editorEditableField"

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'

import { Preview } from 'react-dnd-preview'

import EditorDraggableContainer from "./editorDraggableContainer"

class EditorLinker extends Component {

    constructor(props) {
        super(props)
        this.contentEditable = React.createRef();
        this.state = {
            value: [],
            results: [],
            backendOptions: {}
        };
    };

    componentDidMount() {
        

        let backendOptions 

        const hasNative = document && (document.elementsFromPoint || document.msElementsFromPoint)
        
        function getDropTargetElementsAtPoint(x, y, dropTargets) {
            return dropTargets.filter((t) => {
            const rect = t.getBoundingClientRect()
            return (
                x >= rect.left && x <= rect.right && y <= rect.bottom && y >= rect.top
            )
            })
        }
        
        backendOptions = {
            // getDropTargetElementsAtPoint: !hasNative && getDropTargetElementsAtPoint,
            scrollAngleRanges: [
                { start: 30, end: 150 },
                { start: 210, end: 330 }
            ],
        }
            

        this.loadResults()
        this.setState({
            value: this.props.options.value,
            backendOptions: backendOptions
        })

    }
    componentDidUpdate(prevprops) {
        if(!_.isEqual(prevprops.options.collection, this.props.options.collection)) {
            this.loadResults()
        }
    }

    loadResults() {
        this.props.options.loadResults((results) => {

            let newResults = _.map(this.props.options.collection, (item,i) => {
                let pageIndex = _.findIndex(results, {
                    _id: item.pageId
                })

                return (results[pageIndex])
            })
            this.setState({
                results: newResults
            })
        })
    }

    handleInputChange = (value) => {
        this.setState({
            value: value
        })
        this.props.updateFunction(value)
    }

   

    handleChange =(value, item) => {
        this.setState({
            value: value
        }, () => {
            this.props.options.updateItemFunction(value, item, () => {
                this.loadResults()
            })
        })
    }

    handleKeydown = evt => {
        if(evt.key === "Enter" ) {
            window.getSelection().removeAllRanges()
            evt.preventDefault()
        }
    };


    duplicateItem = (item) => {
        this.props.options.duplicateFunction(item, () => {
            this.loadResults()
        })
    }

    generatePreview = ({itemType, item, style}) => {
        let finalItem = _.findIndex(this.state.results, {
            _id: item.id
        })
        return (
            <div className="item-list__item" style={style}>
                <div className="generated-preview">
                    {this.renderItem(this.state.results[finalItem], item.index)}
                </div>
            </div>)
    }
    

    renderItem = (item, i) => {
        return (
            <div className="linker-item-container" key={i}>

                <div className="linker-item-left">
                    <div className="linker-icon-container">
                        <DragHandle/>
                    </div>
 
                    <EditorEditableField
                        value={item.metadata.title}
                        updateField={(value) => this.handleChange(value, item)}
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

    duplicateItem = (item) => {
        this.props.options.duplicateFunction(item, () => {
            this.loadResults()
        })
    }

    render() {

        let dndBackend 

        if(this.props.app.clientWidth < 500) {
            dndBackend = TouchBackend
        } else {
            dndBackend = HTML5Backend
        }

        return (
            <div
                className={classNames({
                    "editor-row": true,
                    "editor-linker": true,
                })}
            >
                <div className="input-label">{this.props.options.label}</div>
                {/* {this.state.results.map((item, i) => {
                        return this.renderItem(item, i)
                    })}
                 */}
               

                <DndProvider backend={dndBackend} options={this.state.backendOptions} >
                    <EditorDraggableContainer 
                        results={this.state.results} 
                        updateFunction={this.props.updateFunction}
                        deleteFunction={this.removeItem}
                        duplicateFunction={this.duplicateItem}
                    />

                    {dndBackend == TouchBackend ? <Preview generator={this.generatePreview} /> : ""}
                    
                </DndProvider>

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
