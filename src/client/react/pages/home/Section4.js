import React, { Component } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import Image from "../../components/image"
import ArrowLink from "../../components/svg/arrow-link"

class Section4 extends Component {
    state = {
    };

    componentDidMount() {
    }

    getPose() {
        if (this.refs.screen) {
            let node = this.refs.screen
            let bodyHeight = this.props.clientHeight
            if (node && (this.refs.screen.offsetTop <= (this.props.totalScrolledPixels + (bodyHeight / 2.2)))) {
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


        const epicLinkLine = {
            exit: i => ({
                opacity: 0,
                width: 0
            }),
            enter: i => ({ 
                width: "100%",
                opacity: 1,
                transition: {
                    duration: 1,
                    easing: "cubic-bezier(.19,1,.22,1)"
                },
            }),
        }

        const epicLinkText = {
            exit: i => ({
                opacity: 0
            }),
            enter: i => ({ 
                opacity: 1,
                transition: {
                    opacity: {
                        duration: 1,
                        delay:  i * 0.15,
                    }, 
                    easing: "cubic-bezier(.19,1,.22,1)"
                },
            }),
        }

        const epicLinkArrow= {
            exit: i => ({
                scale: 0
            }),
            enter: i => ({ 
                opacity: 1,
                scale: 1,
                transition: {
                    type: "spring",
                    stiffness: 122,
                    damping: 22,
                    delay:  i * 0.15,
                },
            }),
        }

        const epicLinkLabel= {
            exit: i => ({
                opacity: 0
            }),
            enter: i => ({ 
                opacity: 1,
                transition: {
                    opacity: {
                        duration: 1,
                        delay:  i * 0.15,
                    }, 
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

                <div className="section-social-media">

                        <motion.div
                            initial="exit"
                            className="epic-link-label"
                            variants={epicLinkLabel}
                            animate={this.getPose()}
                            custom={1}
                            
                        >
                            Follow for recent work & updates:
                        </motion.div>

                        <div className="epic-social-media-link-container">
                            <div className="epic-social-media-line-wrapper">
                                <motion.div
                                    initial="exit"
                                    className="epic-link-line"
                                    variants={epicLinkLine}
                                    animate={this.getPose()}
                                    custom={8}
                                    
                                />
                            </div>
                            
                            <motion.div
                                initial="exit"
                                className="epic-link-text"
                                variants={epicLinkText}
                                animate={this.getPose()}
                                custom={5}
                                
                            > 
                                <a className="line-hover" href="https://www.mikhail.co/">Instagram</a>
                            </motion.div>

                            <motion.div
                                initial="exit"
                                className="epic-link-arrow"
                                variants={epicLinkArrow}
                                animate={this.getPose()}
                                custom={8}
                                
                            >
                                <ArrowLink/>
                            </motion.div>
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
