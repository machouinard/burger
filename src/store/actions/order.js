import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const buyBurgerSuccess = ( id, orderData ) => {
	return {
		type:      actionTypes.BUY_BURGER_SUCCESS,
		orderId:   id,
		orderData: orderData
	};
};

export const buyBurgerFail = error => {
	return {
		type:  actionTypes.BUY_BURGER_FAIL,
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
			     dispatch( buyBurgerSuccess( resp.data.name, orderData ) );
		     } )
		     .catch( error => {
			     dispatch( buyBurgerFail( error ) );
		     } );
	};
};

export const buyInit = () => {
	return {
		type: actionTypes.BUY_INIT
	};
};

export const fetchOrdersSuccess = orders => {
	return {
		type:   actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	};
};

export const fetchOrdersFail = error => {
	return {
		type:  actionTypes.FETCH_ORDERS_FAIL,
		error: error
	};
};

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	};
};

export const fetchOrders = () => {

	return dispatch => {
		dispatch( fetchOrdersStart() );
		axios.get( '/orders.json' )
		     .then( resp => {
			     const fetchedOrders = [];
			     for ( let key in resp.data ) {
				     fetchedOrders.push( {
					                         ...resp.data[ key ],
					                         id: key
				                         } );
			     }
			     dispatch( fetchOrdersSuccess( fetchedOrders ) );
			     console.log( 'fetched', fetchedOrders );
		     } )
		     .catch( error => {
			     dispatch( fetchOrdersFail( error ) );
		     } );
	};

};