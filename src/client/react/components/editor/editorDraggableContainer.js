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
        clearInterval(this.state.timeInterval);
        const dragCard = this.state.results[dragIndex];

        this.setState({
            results: update(this.state.results, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            })
        })
        // const timeInterval = setInterval(() => {
        //     window.dispatchEvent(new Event('resize'));
             
        // }, 1000);

        // this.setState({ timeInterval });
        const timeInterval = setInterval(() => {
            // const touch = new Touch({
            //     identifier: "123",
            //     target: document.getElementById('draggableContainer'),
            //   });
              
            //   const touchEvent = new TouchEvent("touchstart", {
            //     touches: [touch],
            //     view: window,
            //     cancelable: true,
            //     bubbles: true,
            //   });
              
            //   target.dispatchEvent(touchEvent);
              this.simulateTouchEvent(document, "touchend", [{
                  x: 100,
                  y: 100,
                  id: 1
              }])
              clearInterval(this.state.timeInterval);
            // window.dispatchEvent(new Event('touchstart'));
            // var e = new Event('touchstart');
            // target.dispatchEvent(e);

        }, 2000);

        this.setState({ timeInterval });
    }

    renderItem(item, i) {
       
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
