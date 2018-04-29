import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

export const addIngredient = ingredientName => {
	return {
		type:           actionTypes.ADD_INGREDIENT,
		ingredientName: ingredientName
	};
};

export const removeIngredient = ingredientName => {
	return {
		type:           actionTypes.REMOVE_INGREDIENT,
		ingredientName: ingredientName
	};
};

export const setIngredients = ingredients => {
	return {
		type:        actionTypes.SET_INGREDIENTS,
		ingredients: ingredients
	};
};

const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED
	};
};

export const initIngredients = () => {
	return dispatch => {
		axios.get( 'https://chouinard-burger.firebaseio.com/ingredients.json' )
		     .then( resp => {
			     dispatch( setIngredients( resp.data ) );
		     } )
		     .catch( error => {
			     console.log( error );
			     dispatch( fetchIngredientsFailed() );
		     } );
	};
};