import React, { Component } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import Image from "../../components/image"

class Section4 extends Component {
    state = {
    };

    componentDidMount() {
    }

    getPose() {
        if (this.refs.screen) {
            let node = this.refs.screen
            let bodyHeight = this.props.clientHeight
            if (node && (this.refs.screen.offsetTop <= (this.props.totalScrolledPixels + (bodyHeight / 0.9)))) {
                return "enter"
            } else {
                return "exit"
            }
        } else {
            return "exit"
        }
    }

    headlineTransform = () => {
        let transform = `translate(-${this.props.totalScrolledPixels / 0.8 - this.props.clientWidth * 0.2}px, ${this.props.totalScrolledPixels / 10}px)`
        console.log(transform)

        return transform
    }

    render() {

        let isVisible = false

        if(this.getPose() == "visible") {
            isVisible = true
        }

        console.log(this.props.clientWidth)

        return (
            <div className="section-epic-headline" ref="screen">
                    <div className="epic-headline-container">
                        <div 
                            style={{
                                transform: this.headlineTransform()
                            }}
                        >

                            <motion.div
                                initial="exit"
                                className="epic-headline"
                                variants={this.props.headline}
                                animate={this.getPose()}
                                custom={1}
                                
                                
                            >
                                Your favorite secret
                            </motion.div>

                        </div>
                        
                    </div>

                    
                </div>
        )
    }
}

function mapStateToProps({ app }) {
    return {
        totalScrolledPixels: app.totalScrolledPixels,
        clientHeight: app.clientHeight,
        clientWidth: app.clientWidth,
        app: app
    };
}

export default connect(mapStateToProps, {})(Section4);
