import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import * as _ from "lodash"
import Button from "../button/"
import update from "immutability-helper";
import ContentEditable from 'react-contenteditable'
import HTML5Backend from "react-dnd-html5-backend";
import { DropTarget, DragDropContext } from "react-dnd";

import Home from "../../components/svg/home"
import DragHandle from "../../components/svg/dragHandle"

import EditorEditableField from "./editorEditableField"
import DraggableField from "./editorDraggableField"

@DragDropContext(HTML5Backend)
class EditorLinker extends Component {

    constructor(props) {
        super(props)
        this.contentEditable = React.createRef();
        this.state = {
            dragging: false,
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
    }

    renderItem = (item, i) => {
        if(item.metadata.home) {
            return this.renderHome(item, i)
        }
        return (
            <div className="linker-item-container" key={i}>

                <div className="linker-item-left">
                    <div className="linker-icon-container drag-space">
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

    moveField = (dragIndex, hoverIndex) => {
        console.log(dragIndex, hoverIndex)
		const { results } = this.state;
        const dragField = results[dragIndex];

        this.setState(
			update(this.state, {
				results: {
					$splice: [[dragIndex, 0], [hoverIndex, 1, dragField]]
				}
			})
		);
	};

	dragStart = () => {
		this.setState({
			dragging: true,
			
		});
	};

	dragEnd = () => {
		this.setState({
            dragging: false,
        });
	};

    render() {
        return (
            <div
                className={classNames({
                    "editor-row": true,
                    "editor-linker": true,
                })}
            >
                <div className="input-label">{this.props.options.label}</div>

                {this.state.results.map((item, i) => {
                    return (
                        <DraggableField
                            key={i}
                            id={item._id}
                            index={i}
                            moveField={this.moveField}
                            dragStart={this.dragStart}
                            dragEnd={this.dragEnd}
                        >
                            {this.renderItem(item, i)}
                        </DraggableField>
                    )})
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
