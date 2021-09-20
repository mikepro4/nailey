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
        let transform = `translate(-${this.props.totalScrolledPixels-100 / 1.2- this.props.clientWidth * 0.1}px, ${this.props.totalScrolledPixels / 10.5}px)`
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
            <div className="epic-section-container" ref="screen">
                <div className="section-epic-headline" ref="screen">
                    <div className="epic-headline-container">
                        <div 
                            className="epic-headline-wrapper"
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
                <div className="epic-images-container">
                    <Image
                        className="image-9"
                        imageId={1}
                        isVisible={isVisible}
                        slowDown={4}
                        order={1}
                    />

                    <Image
                        className="image-10"
                        imageId={1}
                        isVisible={isVisible}
                        slowDown={2.5}
                        order={1}
                    />

                    <Image
                        className="image-11"
                        imageId={1}
                        isVisible={isVisible}
                        slowDown={3.5}
                        order={1}
                    />

                    <Image
                        className="image-12"
                        imageId={1}
                        isVisible={isVisible}
                        slowDown={2.2}
                        order={1}
                    />  

                        <Image
                        className="image-13"
                        imageId={1}
                        isVisible={isVisible}
                        slowDown={2.1}
                        order={1}
                    />  
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
