// import React, { Component, useState, useCallback } from "react";
// import { connect } from "react-redux";
// import { Card } from './editorDraggableItem';
// import update from 'immutability-helper';
// const style = {
//     width: 400,
// };
// export const Container = (props) => {
//     {
//         const [cards, setCards] = useState(props.results);

//         const moveCard = useCallback((dragIndex, hoverIndex) => {
//             const dragCard = cards[dragIndex];
//             setCards(update(cards, {
//                 $splice: [
//                     [dragIndex, 1],
//                     [hoverIndex, 0, dragCard],
//                 ],
//             }));
//         }, [cards]);
//         const renderCard = (card, index) => {
//             return (<Card key={card._id} index={index} id={card._id} text={card.metadata.title} moveCard={moveCard}/>);
//         };
//         return (
//             <div style={style} >{cards.map((card, i) => renderCard(card, i))}</div>
//         );
//     }
// };
// export default Container


import React, { Component, useState, useCallback } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { EditorDraggableItem } from './editorDraggableItem';
import update from 'immutability-helper';
import * as _ from "lodash"
import Button from "../button/"
import EditorEditableField from "./editorEditableField"
import DragHandle from "../../components/svg/dragHandle"
import HomeIcon from "../../components/svg/home"



class EditorDraggableContainer extends Component {

    state = {
        results: []
    }

    componentDidMount() { 
        
    }

    componentDidUpdate(prevprops) {
        if(!_.isEqual(prevprops.results, this.props.results)) {
            this.setState({
                results:  this.props.results
            })
        }
    }

    simulateTouchEvent(element, type, touches) {
        const touchEvents = [];
      
        touches.forEach((touch) => {
          touchEvents.push(new Touch({
            clientX: touch.x,
            clientY: touch.y,
            identifier: touch.id,
            target: element,
          }));
        });
      
        element.dispatchEvent(new TouchEvent(type, {
          touches: touchEvents,
          view: window,
          cancelable: true,
          bubbles: true,
        }));
      }

    moveCard = (dragIndex, hoverIndex) => {
        const dragCard = this.state.results[dragIndex];

        let originalResults = _.map(this.state.results, (result, i) => {
            return({
                pageId: result._id,
                order: i
            })
        })

        this.setState({
            results: update(this.state.results, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            })
        }, () => {
            

            setTimeout(() => {
                let newResults = _.map(this.state.results, (result, i) => {
                    return({
                        pageId: result._id,
                        order: i
                    })
                })
                if(!_.isEmpty(originalResults) && !_.isEqual(originalResults, newResults)) {
                    console.log(newResults)
                    this.props.updateFunction(newResults)
                }
            }, 500)
            
        })

       
        // const timeInterval = setInterval(() => {
        //     this.simulateTouchEvent(document, "touchend", [{
        //         x: 100,
        //         y: 100,
        //         id: 1
        //     }])
        //     clearInterval(this.state.timeInterval);

        // }, 2000);

        // this.setState({ timeInterval });
    }

    renderItem(item, i) {

       
        return (
            <div className="linker-item-container">

                <div className="linker-item-left">
                    <div className="linker-icon-container">
                        {item.metadata.home ? <HomeIcon /> : <DragHandle/>}
                    </div>

                    <EditorEditableField
                        value={item.metadata.title}
                        updateField={(value) => this.props.handleChange(value, item)}
                    />
 
                </div>

                <div className="linker-item-right">
                    {!item.metadata.home && <Button 
                        icon="trash"
                        minimal={true}
                        onClick={() => this.props.deleteFunction(item)}
                    />}
                    
                    <Button 
                        icon="duplicate"
                        minimal={true}
                        onClick={() => this.props.duplicateFunction(item)}
                    />
                    <Button 
                        icon="edit"
                        onClick={() => console.log("edit page")}
                    />
                </div>
                
                
            </div>
        )
    }


    renderCard = (card, i) => {
        return (
            <EditorDraggableItem key={card._id} index={i} id={card._id} text={card.metadata.title} moveCard={this.moveCard}>
                {this.renderItem(card, i)}
            </EditorDraggableItem>
        );
    }

    render() {
        return (
            <div
                className={classNames({
                    "editor-draggable-container": true,
                })}
                id="draggableContainer"
            > 

                <div >
                    {this.state.results.map((card, i) => this.renderCard(card, i))}
                </div>
                
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
})(withRouter(EditorDraggableContainer));
