import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinueHandler = () => {
		this.props.history.push( '/checkout/contact-data' );
	};

	render() {

		let summary = <Redirect to="/"/>;

		if ( this.props.ings ) {

			const boughtRedirect = this.props.bought ? <Redirect to="/" /> : null;

			summary = (
				<div>
					{ boughtRedirect }
					<CheckoutSummary
						ingredients={ this.props.ings }
						checkoutCancelled={ this.checkoutCancelledHandler }
						checkoutContinue={ this.checkoutContinueHandler }
					/>
					<Route path={ this.props.match.path + '/contact-data' }
					       component={ ContactData }
					/>
				</div>
			);
		}

		return ( summary );

	}

}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		bought: state.order.bought
	};
};

export default connect( mapStateToProps )( Checkout );