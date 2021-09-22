import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import * as _ from "lodash"

import {
    hideDrawer
} from '../../../redux/actions/appActions'

import SiteSettings from "./type/site_settings"
import ThemeSettings from "./type/theme_settings"
import SectionSettings from "./type/section_settings"
import ProductSettings from "./type/product_settings"

class Drawer extends Component {

    state = {
        hide: false
    }

    hideDrawer() {
        this.setState({
            hide: true
        })
        setTimeout(() => {
            this.props.hideDrawer()
        }, 300)
    }

    renderDrawer(type) {
        switch (type) {
            case "site-settings":
                return (<SiteSettings hideDrawer={() => this.hideDrawer()} enablePortal/>)
            case "theme-settings":
                return (<ThemeSettings hideDrawer={() => this.hideDrawer()} enablePortal/>)
            case "section-settings":
                return (<SectionSettings hideDrawer={() => this.hideDrawer()} enablePortal/>)
            case "product-settings":
                return (<ProductSettings hideDrawer={() => this.hideDrawer()} enablePortal/>)
            default:
                return ;
        }
    }

	render() {

        return (
            <div className={"app-drawer theme-" + this.props.theme + " " + classNames({
                "full-screen": this.props.fullScreen
            })}>
                <div 
                    className={"app-drawer-background theme-" + this.props.theme + " " + classNames({
                        "hide": this.state.hide
                    })}
                    onClick={() =>  {
                           this.hideDrawer()
                        }
                    }
                >

                </div>

                <div className={"app-drawer-content theme-" + this.props.theme + " " + classNames({
                        "hide": this.state.hide
                    })}>
                    {this.renderDrawer(this.props.type)}
                </div>
            </div>

        )
		
	}
}

function mapStateToProps(state) {
	return {
        theme: state.app.theme,
        user: state.app.user,
        authenticated: state.auth.authenticated,
        drawerData: state.app.drawerData
	};
}

export default connect(mapStateToProps, {
    hideDrawer
})(Drawer);
