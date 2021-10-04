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
import SiteEdit from "./type/site_edit"
import ThemeSettings from "./type/theme_settings"
import SectionGodSettings from "./type/section_god_settings"
import SectionUserSettings from "./type/section_user_settings"
import SectionEdit from "./type/section_edit"
import ProductSettings from "./type/product_settings"
import FontSettings from "./type/font_settings"
import PageSettings from "./type/page_settings"
import PageEdit from "./type/page_edit"
import ProjectSettings from "./type/project_settings"
import ProjectEdit from "./type/project_edit"
import LayoutSelector from "./type/layout_selector"
import DomainSettings from "./type/domain_settings"
import MediaSettings from "./type/media_settings"

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
            case "site-edit":
                return (<SiteEdit hideDrawer={() => this.hideDrawer()} enablePortal/>)
            case "theme-settings":
                return (<ThemeSettings hideDrawer={() => this.hideDrawer()} enablePortal/>)
            case "section-god-settings":
                return (<SectionGodSettings hideDrawer={() => this.hideDrawer()} enablePortal/>)
            case "section-user-settings":
                return (<SectionUserSettings hideDrawer={() => this.hideDrawer()} enablePortal/>)
            case "product-settings":
                return (<ProductSettings hideDrawer={() => this.hideDrawer()} enablePortal/>)
            case "font-settings":
                return (<FontSettings hideDrawer={() => this.hideDrawer()} enablePortal/>)
            case "page-settings":
                return (<PageSettings hideDrawer={() => this.hideDrawer()} enablePortal/>)
            case "project-settings":
                return (<ProjectSettings hideDrawer={() => this.hideDrawer()} enablePortal/>)
            case "project-edit":
                return (<ProjectEdit hideDrawer={() => this.hideDrawer()} enablePortal/>)
            case "page-edit":
                return (<PageEdit hideDrawer={() => this.hideDrawer()} enablePortal/>)
            case "section-edit":
                return (<SectionEdit hideDrawer={() => this.hideDrawer()} enablePortal/>)
            case "layout-selector":
                return (<LayoutSelector hideDrawer={() => this.hideDrawer()} enablePortal/>)
            case "domain-settings":
                return (<DomainSettings hideDrawer={() => this.hideDrawer()} enablePortal/>)
            case "media-settings":
                return (<MediaSettings hideDrawer={() => this.hideDrawer()} enablePortal/>)
            default:
                return ;
        }
    }

	render() {

        return (
            <div  className={"app-drawer theme-" + this.props.theme + " " + classNames({
                "full-screen": this.props.fullScreen,
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

                <div  className={"app-drawer-content theme-" + this.props.theme + " " + classNames({
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
