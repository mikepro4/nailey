import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import * as _ from "lodash"
import axios from "axios";

import {
    showDrawer
} from '../../../redux/actions/appActions'

class ImageUploader extends Component {

    state = {
        imageUrl: ""
    };
    
    handleDrop = files => {
		const uploaders = files.map(file => {
			// Progress
			var config = {
				onUploadProgress: function(progressEvent) {
					let percentCompleted = Math.round(
						progressEvent.loaded * 100 / progressEvent.total
					);
					console.log(
						"onUploadProgress called with",
						arguments,
						"Percent Completed:" + percentCompleted
					);
				}
			};
			// Initial FormData
			const formData = new FormData();
			formData.append("file", file);
			formData.append("tags", `epic`);
			formData.append("upload_preset", "mainImage"); // Replace the preset name with your own
			formData.append("api_key", "xn-rZDW9uGV-V9lUfKHK782G-QY"); // Replace API key with your own Cloudinary key
			formData.append("timestamp", (Date.now() / 1000) | 0);

			return axios
				.post(
					"https://api.cloudinary.com/v1_1/hasana/image/upload",
					formData,
					config
				)
				.then(response => {
					const data = response.data;
                    const fileURL = data.secure_url;
                    
					this.setState({
						imageUrl: fileURL,
                    });
                    
					this.props.onSuccess(data.secure_url);
				});
		});
	};


	render() {
        let gradient 

        return(
            <section 
                className={"gradient-" +  gradient + " " + classNames({
                    "avatar-container": true,
                    "small": this.props.small,
                    "medium": this.props.medium,
                    "big": this.props.big,
                    "huge": this.props.huge,
                    "mini": this.props.mini,
                    "search": this.props.search
                })}
            >
                
                <img src={this.state.imageUrl}  />
                
            </section>
        )
       
	}
}

function mapStateToProps(state) {
	return {
        theme: state.app.theme,
        authenticated: state.auth.authenticated,
	};
}

export default connect(mapStateToProps, {
    showDrawer
})(ImageUploader);
