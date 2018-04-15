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
		{ controls.map( ctrl => (
				<BuildControl
					key={ ctrl.label }
					label={ ctrl.label }
					added={ () => props.ingredientAdded( ctrl.type ) }
				/>
		) ) }
	</div>

);

export default BuildControls;