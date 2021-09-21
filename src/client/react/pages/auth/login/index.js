import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import classnames from "classnames";
import { Link } from "react-router-dom";
import qs from "qs";
import { Position, Toaster, Intent } from "@blueprintjs/core";
import Button from "../../../components/button"

import { signinUser, authError } from '../../../../redux/actions/authActions'
import LoginForm from './login_form'

class Login extends Component {
	state = {
		loading: false
	}

	renderHead = () => (
		<Helmet>
			<title>Blade – Login</title>
			<meta property="og:title" content="Login" />
		</Helmet>
	);

	componentDidMount() {
        this.props.authError(null)
    }

    handleFormSubmit({ email, password }) {
        this.props.signinUser({ 
            email, 
            password,
            history: this.props.history
		})
		this.setState({
			loading: true
		})
    }

    componentDidUpdate() {
        if(this.props.error) {
			if(this.state.loading) {
				this.showFailToast(this.props.error)
				this.setState({
					loading: false
				})
			}
        }
    }

    showFailToast = (message, id) => {
		this.refs.toaster.show({
			message: message,
			intent: Intent.DANGER,
			iconName: "cross"
		});
	};

	render() {
        if(this.props.user) {
            return(
                <div className="login-error">
                    Already logged in as {this.props.user.email}
                    <Link to="/auth/logout" className="main-button ">Logout</Link>
                </div>
            )
            
        } else {
            return (
                <div className={"auth-container theme-" + this.props.theme }>
                    <LoginForm
                        enableReinitialize="true"
                        loading={this.state.loading}
                        onSubmit={this.handleFormSubmit.bind(this)}
                        theme={this.props.theme}
                    />
    
                    <div className="auth-footer-link">
                        <span className="auth-footer-link-label">Need an account?</span>
                        <Link to="/auth/signup"><Button minimal="true" className={"small-button transition-element theme-" + this.props.theme} label="Sign up" /></Link>
                    </div>
    
                    <Toaster position={Position.TOP_CENTER} ref="toaster" />
                </div>
            );
        }
		
	}
}


function mapStateToProps(state) {
	return {
        router: state.router,
        theme: state.app.theme,
        error: state.auth.error,
        user: state.app.user
	};
}

export default {
	component: connect(mapStateToProps, {
		signinUser, authError
	})(Login)
}
