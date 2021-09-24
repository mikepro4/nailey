import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import MainLinks from "../main_links"
import Logo from "../logo"
import Button from "../button"
import { motion } from "framer-motion";

class Header extends Component {

    getWidthValue() {
        let finalWidth

        if(this.props.site.fullWidth) {
            finalWidth = "100%"
        } else {
            finalWidth = this.props.site.maxWidth + "px"
        }

        return finalWidth
    }

    renderCTA() {
        if(this.props.site.mainCTA) {
            const logo = {
                visible: { 
                    y: 0, 
                    opacity: 1, 
                    transition: {
                        type: "spring",
                        delay: 0.5,
                        stiffness: 122,
                        damping: 22,
                    } 
                },
                hidden: { 
                    opacity: 0 
                },
            }
    
            return(
                <div className="header-right">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={logo}
                    >
                        <Button
                            label={this.props.site.mainCTAText}
                            linkUrl={this.props.site.mainCTAURL}
                            minimal={true}
                        />
                    </motion.div>
                </div>
            )
        }
        
    }

    getOrder() {

    }

    createLayout() {
        
        if(this.props.site.logoPosition == "left") {
            return(
                <div 
                    className={classNames({
                        "header-wrapper": true,
                        "logo-align-left": true,
                        "links-align-center": this.props.site.mainLinksPosition == "center",
                        "links-align-left": this.props.site.mainLinksPosition == "left",
                        "links-align-right": this.props.site.mainLinksPosition == "right",
                        "cta-align-center": this.props.site.mainCTAPosition == "center",
                        "cta-align-left": this.props.site.mainCTAPosition == "left",
                        "cta-align-right": this.props.site.mainCTAPosition == "right",
                    })}
                >
                    <Logo/>
                    <MainLinks />
                    {this.renderCTA()}
                </div>
               
            )
        }

        if(this.props.site.logoPosition == "center") {
            return(
                <div 
                    className={classNames({
                        "header-wrapper": true,
                        "logo-align-center": true,
                        "links-align-center": this.props.site.mainLinksPosition == "center",
                        "links-align-left": this.props.site.mainLinksPosition == "left",
                        "links-align-right": this.props.site.mainLinksPosition == "right",
                        "cta-align-center": this.props.site.mainCTAPosition == "center",
                        "cta-align-left": this.props.site.mainCTAPosition == "left",
                        "cta-align-right": this.props.site.mainCTAPosition == "right",
                    })}
                >
                    <MainLinks />
                    <Logo/>
                    {this.renderCTA()}
                </div>
               
            )
        }

        if(this.props.site.logoPosition == "right") {
            return(
                <div 
                    className={classNames({
                        "header-wrapper": true,
                        "logo-align-right": true,
                        "links-align-center": this.props.site.mainLinksPosition == "center",
                        "links-align-left": this.props.site.mainLinksPosition == "left",
                        "links-align-right": this.props.site.mainLinksPosition == "right",
                        "cta-align-center": this.props.site.mainCTAPosition == "center",
                        "cta-align-left": this.props.site.mainCTAPosition == "left",
                        "cta-align-right": this.props.site.mainCTAPosition == "right",
                    })}
                >
                    <MainLinks />
                    {this.renderCTA()}
                    <Logo/>

                </div>
               
            )
        }
    }

	render() {
        
        
        return (
            <div 
                className={classNames({
                    "app-header": true
                })}
            >
                {/* <div 
                    className="header-wrapper"
                    style={{
                        maxWidth: this.getWidthValue()
                    }}
                >
                    <MainLinks />
                    <Logo/>

                    <div className="header-right">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={logo}
                        >
                            <Button
                                label={this.props.app.site.ctaText}
                                linkUrl={this.props.app.site.ctaUrl}
                                minimal={true}
                            />
                        </motion.div>
                    </div> */}

                    {this.createLayout()}
                {/* </div> */}
               
            </div>
        );
	}
}

function mapStateToProps(state) {
	return {
        user: state.app.user,
        app: state.app,
        location: state.router.location,
        site: state.site.currentSite.metadata
	};
}

export default connect(mapStateToProps, {
})(withRouter(Header));
