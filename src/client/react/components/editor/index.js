import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import EditorSection from "./editorSection"

class Editor extends Component {

    state = {
        
    }

    renderSectionItems(section) {
        let editSections = this.props.configuration.map((section, i) => {
            return(
                <div key={i} className={"transition-element"}>
                    <EditorSection
                        section={section}
                    />
                </div>
                
            )
        })

        return editSections
    }

	render() {

        return (
            <div 
                className={classNames({
                    "editor": true,
                })}
            >
               <div className="editor-sections " >
                    {this.renderSectionItems()}
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
})(withRouter(Editor));
