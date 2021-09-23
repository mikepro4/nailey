import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"

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
                <div
                    className="editor-section-header"
                    onClick={() => {
                        if(this.props.section.collapsible) {
                            this.setState({
                                active: !this.state.active
                            })
                        }
                    }}
                >
                    <div className="editor-section-left">
                        {this.props.section.title}
                    </div>

                    <div className="editor-section-right">
                    </div>
                </div>

                <div
                    className={classNames({
                        "editor-section-content": true,
                        "editor-section-content-hidden": this.props.section.collapsible && !this.state.active,
                        "editor-section-content-visible": this.state.active,
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
