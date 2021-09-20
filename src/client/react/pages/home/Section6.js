import React, { Component } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import classNames from "classnames";
import Button from "../../components/button"

class Section6 extends Component {
    state = {
    };

    componentDidMount() {
    }

    getPose() {

        if (this.refs.screen) {
            let node = this.refs.screen
            let bodyHeight = this.props.clientHeight
            if (node && (this.refs.screen.offsetTop <= (this.props.totalScrolledPixels + ((bodyHeight) / 2.2)))) {
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
                scale: 0.99,
            }),
            enter: i => ({ 
                scale: 1,
                opacity: 1,
                transition: {
                    duration: 1,
                    delay:  0,
                    easing: "cubic-bezier(.19,1,.22,1)"
                },
            }),
        }


        return (
            <div 
                className="footer"
                ref="screen"
            >
                <motion.div
                    initial="exit"
                    className="epic-button-container"
                    variants={epicDescription}
                    animate={this.getPose()}
                    custom={11}
                >
                    <Button
                        label={this.props.app.site.ctaText}
                        linkUrl={this.props.app.site.ctaUrl}
                        minimal={true}
                        extra={true}
                    />

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

export default connect(mapStateToProps, {})(Section6);
