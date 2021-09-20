import React, { Component } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import Image from "../../components/image"

class Section2 extends Component {
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

    render() {

        let isVisible = false

        if(this.getPose() == "visible") {
            isVisible = true
        }

        return (
            <div className="section-text-content" ref="screen">
                    <div className="text-container-wrapper">
                        <div className="text-container text-container-right">
                            <div className="text-content-headline-container">

                                <motion.div
                                    initial="exit"
                                    className="text-content-headline-number"
                                    variants={this.props.headline}
                                    animate={this.getPose()}
                                    custom={1}
                                >
                                    01
                                </motion.div>

                                <motion.div
                                    initial="exit"
                                    className="text-content-headline"
                                    variants={this.props.headline}
                                    animate={this.getPose()}
                                    custom={3}
                                >
                                    Love
                                </motion.div>
                            </div>

                            <motion.div
                                initial="exit"
                                className="text-content-description"
                                variants={this.props.headline}
                                animate={this.getPose()}
                                custom={4}
                            >
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                    Nulla mauris orci, facilisis eget quam nec, convallis dignissim nisl. 
                                    Maecenas vel lorem in turpis cursus fringilla. In in efficitur mauris, et 
                                    maximus nisl. Nulla eget mauris a augue porttitor egestas nec vestibulum libero. 
                                </p>

                                <p>Curabitur pulvinar egestas orci. Fusce hendrerit est ac ligula eleifend, vitae 
                                    bibendum ipsum dignissim. Vivamus sagittis felis gravida ornare hendrerit. 
                                    Sed nec metus non ante ullamcorper convallis. </p>
                            </motion.div>

                        </div>
                    </div>

                    <Image
                        className="image-5"
                        imageId={1}
                        isVisible={isVisible}
                        slowDown={10}
                        order={1}
                    />

                    <Image
                        className="image-6"
                        imageId={1}
                        isVisible={isVisible}
                        slowDown={4}
                        order={3}
                    />

                    <Image
                        className="image-7"
                        imageId={1}
                        isVisible={isVisible}
                        slowDown={6}
                        order={6}
                    />
                    
                </div>
        )
    }
}

function mapStateToProps({ app }) {
    return {
        totalScrolledPixels: app.totalScrolledPixels,
        clientHeight: app.clientHeight,
        app: app
    };
}

export default connect(mapStateToProps, {})(Section2);
