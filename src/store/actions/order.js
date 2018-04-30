import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const buyBurgerSuccess = ( id, orderData ) => {
	return {
		type: actionTypes.BUY_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	};
};

export const buyBurgerFail = error => {
	return {
		type: actionTypes.BUY_BURGER_FAIL,
		error: error
	};
};

export const buyBurgerStart = () => {
		return {
			type: actionTypes.BUY_BURGER_START
		};
};

export const buyBurger = ( orderData ) => {
	return dispatch => {

		dispatch( buyBurgerStart() );

		axios.post( '/orders.json', orderData )
		     .then( resp => {
			     console.log( 'resp.data', resp.data );
			     dispatch( buyBurgerSuccess( resp.data, orderData ) );
		     } )
		     .catch( error => {
				dispatch( buyBurgerFail( error ) );
		     } );
	};
};