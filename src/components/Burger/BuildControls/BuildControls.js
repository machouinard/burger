import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{ label: 'Meat', type: 'meat' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Lettuce', type: 'salad' }
];

const BuildControls = props => (

	<div className={ classes.BuildControls }>
		<p>Price: <strong>${props.price.toFixed(2)}</strong></p>
		{ controls.map( ctrl => (
				<BuildControl
					key={ ctrl.label }
					label={ ctrl.label }
					added={ () => props.ingredientAdded( ctrl.type ) }
					removed={ () => props.ingredientRemoved( ctrl.type ) }
					disabled={ props.disabled[ctrl.type] }
				/>
		) ) }
	</div>

);

export default BuildControls;