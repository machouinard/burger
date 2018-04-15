import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {

	let newIngredients = Object.keys( props.ingredients )
	                             .map( igKey => {
	                             	return [...Array( props.ingredients[igKey] ) ].map( ( _, i ) => {
	                             		return <BurgerIngredient key={igKey + i } type={igKey}/>
	                                } );
	                             } ).reduce( (arr, el) => {
	                             	return arr.concat( el );
		}, []);

	if ( 0 === newIngredients.length ) {
		newIngredients = <p>Start building your Burger!</p>
	}
	console.log( 'ingredients', newIngredients );

	return (
		<div className={ classes.Burger }>
			<BurgerIngredient type='bread-top'/>
			{newIngredients}
			<BurgerIngredient type='bread-bottom'/>
		</div>
	)
};

export default burger;