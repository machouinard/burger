import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{ label: 'Lettuce', type: 'lettuce' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' }
];

const BuildControls = props => (

	<div className={ classes.BuildControls }>
		<p>Price: <strong>${ props.price.toFixed( 2 ) }</strong></p>
		{ controls.map( ctrl => (
			<BuildControl
				key={ ctrl.label }
				label={ ctrl.label }
				added={ () => props.ingredientAdded( ctrl.type ) }
				removed={ () => props.ingredientRemoved( ctrl.type ) }
				disabled={ props.disabled[ ctrl.type ] }
			/>
		) ) }
		<button
			className={ classes.OrderButton }
			onClick={ props.ordered }
			disabled={ ! props.buyable }
		>
			{ props.isAuth ? 'Order Now' : 'Sign In' }
		</button>
	</div>

);

export default BuildControls;