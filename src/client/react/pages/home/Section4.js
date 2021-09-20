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

        return transform
    }

    render() {

        let isVisible = false

        if(this.getPose() == "visible") {
            isVisible = true
        }


        const epicHeadline = {
            exit: i => ({
                webkitMaskPosition: "180%",
                opacity: 0
            }),
            enter: i => ({ 
                webkitMaskPosition: "140%",
                opacity: 1,
                transition: {
                    opacity: {
                        duration: 3
                    }, 
                        webkitMaskPosition: {
                            duration: 4
                        }
                    ,
                    easing: "cubic-bezier(.19,1,.22,1)"
                },
            }),
        }

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
                                variants={epicHeadline}
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

                        {/* <Image
                        className="image-13"
                        imageId={1}
                        isVisible={isVisible}
                        slowDown={2.1}
                        order={1} */}
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
