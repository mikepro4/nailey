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
import { Card } from './editorDraggableItem';
import update from 'immutability-helper';
import * as _ from "lodash"

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

    moveCard = (dragIndex, hoverIndex) => {
        const dragCard = this.state.results[dragIndex];

        this.setState({
            results: update(this.state.results, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            })
        })
    }

    renderCard = (card, i) => {
        return (<Card key={card._id} index={i} id={card._id} text={card.metadata.title} moveCard={this.moveCard}/>);
    }

    render() {
        return (
            <div
                className={classNames({
                    "editor-draggable-container": true,
                })}
            > 

                <div style={{ width: "200px"}} >
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
