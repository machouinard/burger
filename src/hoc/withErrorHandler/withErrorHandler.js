import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = ( WrappedComponent, axios ) => {

	return class extends Component {

		state = { error: null };

		componentWillMount() {
			this.reqInterceptor = axios.interceptors.request.use( req => {
				this.setState( { error: null } );

				return req;

			} );
			this.respInterceptor = axios.interceptors.response.use( resp => resp, error => {
				this.setState( { error: error } );
			} );
		}

		componentWillUnmount() {

			console.log( 'willUnmount', this.reqInterceptor, this.respInterceptor );

			axios.interceptors.request.eject( this.reqInterceptor );
			axios.interceptors.response.eject( this.respInterceptor );

		}

		errorConfirmedHandler = () => {

			this.setState( { error: null } );

		}

		render() {

			return (
				<Aux>
					<Modal
						show={ this.state.error }
						cancel={ this.errorConfirmedHandler }
					>
						{ this.state.error ? this.state.error.message : null }
					</Modal>
					<WrappedComponent { ...this.props } />
				</Aux>
			)

		}

	}

};

export default withErrorHandler;