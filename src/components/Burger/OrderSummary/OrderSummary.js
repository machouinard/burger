import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../../components/UI/Button/Button';

const orderSummary = props => {

	const ingredientSummary = Object.keys( props.ingredients )
	                                .map( key => {
		                                return <li key={ key }>
			                                <span
				                                style={ { textTransform: 'capitalize' } }>{ key }</span>: { props.ingredients[ key ] }
		                                </li>
	                                } );

	return (
		<Aux>
			<h3>Your Order</h3>
			<p>Your Ingredients</p>
			<ul>
				{ ingredientSummary }
			</ul>
			<p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
			<p>Checkout?</p>
			<Button buttonType="Danger" clicked={ props.cancelled }>CANCEL</Button>
			<Button buttonType="Success" clicked={ props.orderContinue }>BUY</Button>
		</Aux>
	)

};

export default orderSummary;