import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import classNames from "classnames"

import Image from "../../components/image"
import SectionHero from "./SectionHero"
import Section1 from "./Section1"
import Section2 from "./Section2"
import Section3 from "./Section3"
import Section4 from "./Section4"
import Section5 from "./Section5"

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
        const headline = {
            exit: i => ({
                opacity: 0,
            }),
            enter: i => ({ 
                opacity: 1,
                scale: 1,
                translateY: 0,
                transition: {
                    duration: 2,
                    delay:  i * 0.15,
                    easing: "cubic-bezier(.19,1,.22,1)"
                },
            }),
        }
		return (
     		<div className="route-content home-route">
                {this.renderHead(pageTitle)}

                <SectionHero />

                <Section1
                    headline={headline}
                />

                <Section2
                    headline={headline}
                />

                <Section3
                    headline={headline}
                />

                {/* <Section4
                    headline={headline}
                /> */}
                
                <Section5
                    headline={headline}
                    headline="Lifestyle"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mauris orci, facilisis eget quam nec, convallis dignissim nisl. Maecenas vel lorem in turpis cursus fringilla. In in efficitur mauris, et maximus nisl. Nulla eget mauris a augue porttitor egestas nec vestibulum libero."
                    alignment="left"
                />

                <Section5
                    headline={headline}
                    headline="Lifestyle"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mauris orci, facilisis eget quam nec, convallis dignissim nisl. Maecenas vel lorem in turpis cursus fringilla. In in efficitur mauris, et maximus nisl. Nulla eget mauris a augue porttitor egestas nec vestibulum libero."
                    alignment="right"
                />

                <Section5
                    headline={headline}
                    headline="Lifestyle"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mauris orci, facilisis eget quam nec, convallis dignissim nisl. Maecenas vel lorem in turpis cursus fringilla. In in efficitur mauris, et maximus nisl. Nulla eget mauris a augue porttitor egestas nec vestibulum libero."
                    alignment="left"
                />


                <div className="placeholder">
                    
                </div>
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