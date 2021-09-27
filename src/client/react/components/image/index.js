import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

import { motion } from "framer-motion";

class Image extends Component {
    state = {
        isVisible: false
    };

    componentDidUpdate(prevprops) {
        if(this.props.isVisible == true && this.state.isVisible == false) {
          this.setState({
            isVisible: true
          })
        }
      }

    componentDidMount() {
        if (!this.props.loadedImages[this.props.imageId]) {
        }
    }

    getPose() {
        if (this.refs.image_container) {
            let node = this.refs[this.props.imageId]
            let bodyHeight = document.getElementById("body").clientHeight
            if ( node && (this.refs.image_container.offsetTop <= (this.props.totalScrolledPixels + (bodyHeight / 0.7)))) {
                return "enter"
            } else {
                return "exit"
            }
        } else {
            return "exit"
        }
    }

    getScreenHeight = () => {
        if (this.props.screen) {
            if (this.props.screen == 0) {
                return 1
            } else {
                let screenHeight = this.props.clientHeight

                if (this.props.clientHeight <= 970) {
                    screenHeight = 970
                }

                return screenHeight * this.props.screen
            }
        } else {
            return 1
        }
    }

    calcTop = () => {
        if (this.props.top) {
            let originalTop = this.props.top * 100 / this.getScreenHeight();
            let newTop = originalTop * this.getScreenHeight() / 100
            if (this.props.clientHeight > 1200) {
                return newTop + 0
            } else {
                return newTop
            }
        } else {
            return 0
        }

    }

    getHeight = () => {
        if (this.refs.image_container) {
            if (this.props.square) {
                return this.refs.image_container.clientWidth
            } else {
                let height = (this.props.height * 100) / 970;
                let screenHeight = this.props.clientHeight

                if (this.props.clientHeight <= 970) {
                    screenHeight = 970
                }

                let newHeight = (height * screenHeight) / 100
                return newHeight
            }
        }
    }

    imageTransform = () => {
        let transform = `translateY(0px)`;

        if (this.props.slowDown) {
            transform = `translateY(${this.props.totalScrolledPixels / this.props.slowDown}px)`
        }

        return transform
    }

    mayberRenderImage() {
        if (this.refs.image_container) {
            return (
                <div className="image-wrapper"
                    ref={this.props.imageId}
                >
                    <img src={this.props.url} />
                </div>
            )
        }
    }

    render() {

        const variants = {
            exit: i => ({
                opacity: 0,
                scale: 1.1,
            }),
            enter: order => ({ 
                opacity: 1,
                scale: 1,
                translateY: 0,
                transition: {
                    duration: 2,
                    delay: 0.5 + order * 0.15,
                    easing: "cubic-bezier(.19,1,.22,1)"
                },
            }),
        }

        let imageVariants = {
            exit: {
                opacity: 0,
                scale: 1.1,
                translateY: 30
            },
            enter: {
                opacity: 1,
                scale: 1,
                translateY: 0,
                transition: {
                    scale: {
                        duration: 0.2
                    },
                    opacity: {
                        duration: 0.2,
        
                    },
                    translateY: {
                        duration: 0.2,
                        easing: "cubic-bezier(.19,1,.22,1)"
                    },
                    delay: ({ custom }) => {
                        return custom * 1000
                    }
                },
                
            }
        }
        return (
            <div
                className={classNames({ "grid-image": true }, this.props.className)}
                style={{
                    // top: !this.props.bottom && `calc(${this.getScreenHeight()}px + ${this.calcTop()}px)`,
                    // top: this.props.top,
                    // height: this.getHeight() + "px",
                    // height: this.props.height,
                    // width: this.props.width,
                    // left: this.props.left,
                    // right: this.props.right,
                    // bottom: this.props.bottom,
                    transform: this.imageTransform()
                }}
                ref="image_container"
            >

                <motion.div
                    initial="exit"
                    className="image-container"
                    custom={this.props.order}
                    variants={variants}
                    animate={this.getPose()}
                >
                    {this.mayberRenderImage()}
                </motion.div>
            </div>
        )

    }
}

function mapStateToProps({ app }) {
    return {
        loadedImages: [],
        totalScrolledPixels: app.totalScrolledPixels,
        clientHeight: app.clientHeight,
        clientWidth: app.clientWidth
    };
}

export default connect(mapStateToProps, { })(Image);
