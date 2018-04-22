import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';

class Checkout extends Component {
	state = {
		ingredients: null,
		totalPrice: null
	};

	componentWillMount() {
		const query = new URLSearchParams( this.props.location.search );
		console.log( 'query', query );
		const ingredients = {};
		let price         = 0;
		for ( let param of query.entries() ) {

			if ( 'price' === param[ 0 ] ) {

				price = param[ 0 ];

			} else {

				ingredients[ param[ 0 ] ] = + param[ 1 ];

			}
		}

		this.setState( {
			               ingredients: ingredients,
			               totalPrice:  price
		               } );

	}

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	}

	checkoutContinueHandler = () => {
		this.props.history.push( '/checkout/contact-data' );
	}

	render() {

		return (
			<div>
				<CheckoutSummary
					ingredients={ this.state.ingredients }
					checkoutCancelled={ this.checkoutCancelledHandler }
					checkoutContinue={ this.checkoutContinueHandler }
				/>
				<Route path={ this.props.match.path + '/contact-data' }
				       render={ ( props ) => ( <ContactData ingredients={ this.state.ingredients } price={ this.state.totalPrice } { ...props } /> ) }
				/>
			</div>
		)

	}

}

export default Checkout;