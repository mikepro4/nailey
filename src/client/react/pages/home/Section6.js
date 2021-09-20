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
            if (node && (this.refs.screen.offsetTop <= (this.props.totalScrolledPixels + ((bodyHeight) / 1.2)))) {
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
            <div 
                className="footer"
                ref="screen"
            >

                <Button
                    label={this.props.app.site.ctaText}
                    linkUrl={this.props.app.site.ctaUrl}
                    minimal={true}
                    extra={true}
                />

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
