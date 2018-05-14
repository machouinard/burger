import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
	state = {
		ingredients: {
			bacon:  1,
			cheese: 1,
			meat:   1,
			salad:  2
		}
};

	componentDidMount() {
		const query = new URLSearchParams( this.props.location.search );
		console.log( 'query', query );
		const ingredients = {};
		for ( let param of query.entries() ) {
			ingredients[ param[0]] = +param[1];
		}

		this.setState( {
			ingredients: ingredients
		               } );

	}

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	}

	checkoutContinueHandler = () => {
		this.props.history.push( '/checkout/contact-data' );
	}

render()
{

	return (
		<div>
			<CheckoutSummary
				ingredients={ this.state.ingredients }
				checkoutCancelled={ this.checkoutCancelledHandler }
				checkoutContinue={ this.checkoutContinueHandler }
			/>
		</div>
	)

}

}

export default Checkout;