import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { motion } from "framer-motion"

class MainLinks extends Component {
    isActivePath = (pathname) => {
        return this.props.location.pathname.indexOf(pathname) !== -1
    }
    render() {

        let links = [
            {
                url: "/services",
                name: "Services"
            },
            {
                url: "/about",
                name: "About"
            },
            {
                url: "/contact",
                name: "Contact"
            }
        ]

        const list = {
            visible: { 
                opacity: 1,
                when: "beforeChildren",
                transition: {
                    duration: 1,
                    delayChildren: 0,
                    staggerChildren: 0.05,

                }
            },
            hidden: { 
                opacity: 0 
            },
          }
          
        const item = {
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
        }
          
        return(
            <div className = "main-links-container" >
                <motion.ul
                    className={classNames({ "active": !(this.props.location.pathname == "/") }, "main-links")}
                    initial="hidden"
                    animate="visible"
                    variants={list}
                >
                    {links.map((link, i) => {
                        return (
                            <li
                                key={link.url}
                                className={classNames("main-link-container", {
                                    "main-link-active": this.isActivePath(link.url)
                                })}
                            >   
                                <motion.div
                                    variants={item}
                                >
                                    <Link to={link.url} className="main-link line-hover ">
                                        <span className="main-link-label">{link.name}</span>
                                    </Link>
                                </motion.div>
                            </li>
                        )
                    })}
                </motion.ul>
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        location: state.router.location
    };
}

export default connect(mapStateToProps, {})(MainLinks);
