import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, StaticRouter } from "react-router-dom";
import classNames from "classnames"
import { motion } from "framer-motion"
import * as _ from "lodash"

class MainLinks extends Component {
    state = {
        pages: [],
        item: {
            visible: {
                y: 0,
                opacity: 1,
                transition: {
                    type: "spring",
                    stiffness: 122,
                    damping: 22,

                }
            },
            hidden: {
                opacity: 0
            },
        },
        list: {
            visible: {
                opacity: 1,
                when: "beforeChildren",
                transition: {
                    duration: 1,
                    delayChildren: 0.3,
                    staggerChildren: 0.05,

                }
            },
            hidden: {
                opacity: 0
            }
        }
    }
    isActivePath = (pathname) => {
        return this.props.location.pathname.indexOf(pathname) !== -1
    }

    componentDidMount() {
        this.setState({
            pages: this.props.site.currentSite.metadata.pages
        })
    }

    componentDidUpdate(prevprops) {
        if (!_.isEqual(prevprops.site, this.props.site)) {
            this.setState({
                pages: this.props.site.currentSite.metadata.pages
            })
        }
    }

    getPageProperty(id, property) {
        let page = _.find(this.props.page.allPages, {
            _id: id
        })
        if(page) {
            return page.metadata[property]
        }
    }

    getLink(page) {
        let link = this.getPageProperty(page.pageId, "url")

        if(link) {
            return link
        } else {
            return "/"
        }
    }

    renderPage(page, i) {
        if(page) {
            return (
                <li
                    key={i}
                    className={classNames("main-link-container", {
                        "main-link-active": this.isActivePath(this.getPageProperty(page.pageId, "url"))
                    })}
                >
                    <motion.div
                        variants={this.state.item}
                    >
                        <Link to={this.getLink(page)} className="main-link line-hover ">
                            <span className="main-link-label">{this.getPageProperty(page.pageId, "title")}</span>
                        </Link>
                    </motion.div>
                </li>
            )
        } 
        

    }

    render() {

        return (
            <div className="main-links-container" >
                <motion.ul
                    className={classNames({ "active": !(this.props.location.pathname == "/") }, "main-links")}
                    initial="hidden"
                    animate="visible"
                    variants={this.state.list}
                >
                    {this.state.pages.map((page, i) => {
                        if (this.getPageProperty(page.pageId, "home")) {
                            if (this.getPageProperty(page.pageId, "displayHomeLink")) {
                                return this.renderPage(page, i)
                            }
                        } else {
                            return this.renderPage(page, i)
                        }

                    })}
                </motion.ul>
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        location: state.router.location,
        page: state.page,
        site: state.site
    };
}

export default connect(mapStateToProps, {})(MainLinks);
