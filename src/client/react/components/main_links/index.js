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

        const variants = {
            visible: i => ({
              opacity: 1,
              transition: {
                delay: i * 0.3,
              },
            }),
            hidden: { opacity: 0 },
        }
          
        return(
            <div className = "main-links-container" >
                    <motion.ul
                        className={classNames({ "active": !(this.props.location.pathname == "/") }, "main-links")}
                    >
                        {links.map((link, i) => {
                            console.log(i)
                            return (
                                <motion.li
                                    custom={i}
                                    variants={variants}
                                    initial="hidden"
                                    animate="visible"
                                    key={link.url}
                                    className={classNames("main-link-container", {
                                        "main-link-active": this.isActivePath(link.url)
                                    })}
                                >
                                    <Link to={link.url} className="main-link">
                                        <span className="main-link-label">{link.name}</span>
                                    </Link>
                                </motion.li>
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
