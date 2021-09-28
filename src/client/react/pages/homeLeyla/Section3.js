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
            if (node && (this.refs.screen.offsetTop <= (this.props.totalScrolledPixels + (bodyHeight / 1.2)))) {
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
            <div className="section-text-content last-text" ref="screen">
                    <div className="text-container-wrapper">
                        <div className="text-container text-container-left">
                            <div className="text-content-headline-container">

                                <motion.div
                                    initial="exit"
                                    className="text-content-headline-number"
                                    variants={this.props.headline}
                                    animate={this.getPose()}
                                    custom={1}
                                >
                                    03
                                </motion.div>

                                <motion.div
                                    initial="exit"
                                    className="text-content-headline"
                                    variants={this.props.headline}
                                    animate={this.getPose()}
                                    custom={3}
                                >
                                    Passion
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
                        className="image-8"
                        imageId={1}
                        isVisible={isVisible}
                        slowDown={7}
                        order={9}
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
