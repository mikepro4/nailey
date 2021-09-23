import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import * as _ from "lodash"

import AsyncSelect from 'react-select/async';

class EditorSelectAsync extends Component {

    state = {
        value: ""
    }

    componentDidMount() { 
        if(this.props.options.value) {
            // this.setState({
            //     value:  {
            //         value: this.props.options.value,
            //         label: this.capitalize(this.props.options.value)
            //     }
            // })
        }
    }

    handleInputChange = (value) => {
      this.setState({
          value: value
      })
      this.props.updateFunction(value.value)
    }

    render() {
        return (
            <div
                className={classNames({
                    "editor-row": true,
                    "editor-select": true,
                })}
            > 
                <div className="input-label">{this.props.options.label}</div>

                <AsyncSelect
                    onInputChange={value => this.handleInputChange(value)}
                    loadOptions={this.props.options.loadOptions}
					autoload={true}
                    value={this.state.value}
                    menuPortalTarget={document.body} 
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
				/>

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
})(withRouter(EditorSelectAsync));
