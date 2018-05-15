import React from 'react';
import classes from './Order.css';

const order = props => {

	const ingredients = [];

	for ( let ingredName in props.ingredients ) {

		if ( 0 < props.ingredients[ ingredName ] ) {

			ingredients.push( {
				                  name:   ingredName,
				                  amount: props.ingredients[ ingredName ]
			                  } );

		}

	}

	const ingredientList = ingredients.map( ingredient => {
		return (
			<span
				key={ ingredient.name }
				style={{
					textTransform: 'capitalize',
					display: 'inline-block',
					margin: '0 8px',
					border: '1px solid #eee',
					padding: '3px'
				}}
			>
				{ ingredient.name } ({ ingredient.amount })
			</span>
		);
	} );

	return (
		<div className={ classes.Order }>
			<p>Ingredients: { ingredientList }</p>
			<p>Price: <strong>${ Number.parseFloat( props.price ).toFixed( 2 ) }</strong></p>
		</div>
	);
};

export default order;