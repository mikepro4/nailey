import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import CaretDown from "../svg/caret-down"
import CaretUp from "../svg/caret-up"

class EditorSection extends Component {

    state = {
        active: false
    }

    render() {

        return (
            <div
                className={classNames({
                    "editor-section": true,
                })}
            >
                {this.props.section.collapsible && <div
                    className={classNames({
                        "editor-section-header": true,
                        "header-active": this.state.active
                    })}
                    onClick={() => {
                        this.setState({
                            active: !this.state.active
                        })
                    }}
                >
                    <div className="editor-section-left">
                        {this.props.section.title}
                    </div>

                    <div className="editor-section-right">
                        {this.state.active ? <CaretUp/> : <CaretDown/> }
                        
                    </div>
                </div>}
                

                <div
                    className={classNames({
                        "editor-section-content": true,
                        "editor-section-content-hidden": this.props.section.collapsible && !this.state.active,
                        "editor-section-content-visible": this.state.active,
                        "editor-section-content-notCollapsible": !this.props.section.collapsible,
                    })}
                >
                    Content
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.app.user,
        app: state.app,
        location: state.router.location,
        edit: state.app.edit
    };
}

export default connect(mapStateToProps, {
})(withRouter(EditorSection));
