import React, { Component } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import Image from "../../components/image"
import ArrowLink from "../../components/svg/arrow-link"

class Section5 extends Component {
    state = {
    };

    componentDidMount() {
    }

    getPose() {

        if (this.refs.screen) {
            let node = this.refs.screen
            let bodyHeight = this.props.clientHeight
            if (node && (this.refs.screen.offsetTop <= (this.props.totalScrolledPixels + ((bodyHeight) / 0.9)))) {
                return "enter"
            } else {
                return "exit"
            }
        } else {
            return "exit"
        }
    }
    

    render() {

        let isVisible = false

        if(this.getPose() == "visible") {
            isVisible = true
        }

        const epicDescription= {
            exit: i => ({
                width: 0,
            }),
            enter: i => ({ 
                width: "750px",
                transition: {
                    type: "spring",
                    stiffness: 122,
                    damping: 22,
                    delay:  0.55,
                },
            }),
        }

        const epicDescriptionText= {
            exit: i => ({
                opacity: 0
            }),
            enter: i => ({ 
                opacity: 0.5,
                transition: {
                    opacity: {
                        duration: 1,
                        delay:  i * 0.15,
                    }, 
                    easing: "cubic-bezier(.19,1,.22,1)"
                },
            }),
        }

        const epicDescriptionHeadline= {
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

        const epicImage= {
            exit: i => ({
                width: 0,
                opacity: 0,
            }),
            enter: i => ({ 
                width: "100%",
                opacity: 1,
                transition: {
                    type: "spring",
                    stiffness: 122,
                    damping: 22,
                    delay:  i * 0.15,
                },
            }),
        }

        return (
            <div className="epic-image-container description-left" ref="screen">

                <motion.div
                    initial="exit"
                    className="epic-image"
                    variants={epicImage}
                    animate={this.getPose()}
                    custom={1}
                    
                >
                    
                </motion.div>

                <motion.div
                    initial="exit"
                    className="epic-description"
                    variants={epicDescription}
                    animate={this.getPose()}
                    custom={1}
                    
                >
                    <div className="epic-description-content">
                        <motion.div
                            initial="exit"
                            className="epic-description-headline"
                            variants={epicDescriptionHeadline}
                            animate={this.getPose()}
                            custom={3}
                            
                        >
                            Lyfestyle
                        </motion.div>

                        <motion.div
                            initial="exit"
                            className="epic-description-text"
                            variants={epicDescriptionText}
                            animate={this.getPose()}
                            custom={4}
                            
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mauris orci, facilisis eget quam nec, convallis dignissim nisl. Maecenas vel lorem in turpis cursus fringilla. 
                            In in efficitur mauris, et maximus nisl. Nulla eget mauris a augue porttitor egestas nec vestibulum libero. 
                        </motion.div>
                    </div>
                    
                </motion.div>
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

export default connect(mapStateToProps, {})(Section5);
