import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import classNames from "classnames"

import Image from "../../components/image"
import SectionHero from "./SectionHero"

class HomePage extends Component {

    state = {
	}

    renderHead = (pageTitle) => (
		<Helmet>
			<title>{pageTitle}</title>
			<meta property="og:title" content={pageTitle} />
		</Helmet>
    )

	render() {
        let pageTitle = this.props.app.site.title + " – " + this.props.app.site.subtitle + " | Home"

		return (
     		<div className="route-content home-route">
                {this.renderHead(pageTitle)}

                <SectionHero />

                <div className="section-text-content">
                    <div className="text-container-wrapper">
                        <div className="text-container text-container-left">
                            <div className="text-content-headline-container">
                                <div className="text-content-headline-number">01</div>
                                <div className="text-content-headline">Care</div>
                            </div>

                            <div className="text-content-description">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                    Nulla mauris orci, facilisis eget quam nec, convallis dignissim nisl. 
                                    Maecenas vel lorem in turpis cursus fringilla. In in efficitur mauris, et 
                                    maximus nisl. Nulla eget mauris a augue porttitor egestas nec vestibulum libero. 
                                </p>

                                <p>Curabitur pulvinar egestas orci. Fusce hendrerit est ac ligula eleifend, vitae 
                                    bibendum ipsum dignissim. Vivamus sagittis felis gravida ornare hendrerit. 
                                    Sed nec metus non ante ullamcorper convallis. </p>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className="section-text-content">
                    <div className="text-container-wrapper">
                        <div className="text-container text-container-right">
                            <div className="text-content-headline-container">
                                <div className="text-content-headline-number">02</div>
                                <div className="text-content-headline">Love</div>
                            </div>

                            <div className="text-content-description">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                    Nulla mauris orci, facilisis eget quam nec, convallis dignissim nisl. 
                                    Maecenas vel lorem in turpis cursus fringilla. In in efficitur mauris, et 
                                    maximus nisl. Nulla eget mauris a augue porttitor egestas nec vestibulum libero. 
                                </p>
                                
                                <p>Curabitur pulvinar egestas orci. Fusce hendrerit est ac ligula eleifend, vitae 
                                    bibendum ipsum dignissim. Vivamus sagittis felis gravida ornare hendrerit. 
                                    Sed nec metus non ante ullamcorper convallis. </p>
                            </div>
                        </div>
                    </div>

                    <Image
                        className="image-5"
                        imageId={1}
                        isVisible={this.state.isVisible}
                        slowDown={10}
                        order={1}
                    />

                    <Image
                        className="image-6"
                        imageId={1}
                        isVisible={this.state.isVisible}
                        slowDown={4}
                        order={1}
                    />

                    <Image
                        className="image-7"
                        imageId={1}
                        isVisible={this.state.isVisible}
                        slowDown={6}
                        order={1}
                    />
                </div>

                <div className="section-text-content">
                    <div className="text-container-wrapper">
                        <div className="text-container text-container-left">
                            <div className="text-content-headline-container">
                                <div className="text-content-headline-number">03</div>
                                <div className="text-content-headline">Passion</div>
                            </div>

                            <div className="text-content-description">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                    Nulla mauris orci, facilisis eget quam nec, convallis dignissim nisl. 
                                    Maecenas vel lorem in turpis cursus fringilla. In in efficitur mauris, et 
                                    maximus nisl. Nulla eget mauris a augue porttitor egestas nec vestibulum libero. 
                                </p>
                                
                                <p>Curabitur pulvinar egestas orci. Fusce hendrerit est ac ligula eleifend, vitae 
                                    bibendum ipsum dignissim. Vivamus sagittis felis gravida ornare hendrerit. 
                                    Sed nec metus non ante ullamcorper convallis. </p>
                            </div>
                        </div>
                    </div>

                    <Image
                        className="image-8"
                        imageId={1}
                        isVisible={this.state.isVisible}
                        slowDown={7}
                        order={12}
                    />

                   
                </div>



                <div className="placeholder"></div>

			</div>
				
		);
	}
}

function mapStateToProps(state) {
	return {
        app: state.app
	};
}


export default {
	component: withRouter(connect(mapStateToProps, {
	})(HomePage))
}