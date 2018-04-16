import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../../components/UI/Button/Button';

class OrderSummary extends Component {

	componentWillUpdate() {

		console.log( '[OrderSummary] willUpdate' );

	}


	render() {

		const ingredientSummary = Object.keys( this.props.ingredients )
		                                .map( key => {
			                                return <li key={ key }>
			                                <span
				                                style={ { textTransform: 'capitalize' } }>{ key }</span>: { this.props.ingredients[ key ] }
			                                </li>
		                                } );

		return (
			<Aux>
				<h3>Your Order</h3>
				<p>Your Ingredients</p>
				<ul>
					{ ingredientSummary }
				</ul>
				<p><strong>Total Price: ${ this.props.price.toFixed( 2 ) }</strong></p>
				<p>Checkout?</p>
				<Button buttonType="Danger" clicked={ this.props.cancelled }>CANCEL</Button>
				<Button buttonType="Success" clicked={ this.props.orderContinue }>BUY</Button>
			</Aux>
		)

	}

};

export default OrderSummary;