import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	orders:  [],
	loading: false,
	bought:  false,
	date:    null
};

const buyInit = ( state, action ) => {
	return updateObject( state, { bought: false, date: new Date() } );
};

const buyBurgerStart = ( state, action ) => {
	return updateObject( state, { loading: true } );
};

const buyBurgerSuccess = ( state, action ) => {
	const newOrder = updateObject( action.orderData, { id: action.orderId } );
	return updateObject( state, {
		loading: false,
		bought:  true,
		orders:  state.orders.concat( newOrder ),
		date: null
	} );
};

const buyBurgerFail = ( state, action ) => {
	return updateObject( state, { loading: false, date: null } );
};

const fetchOrdersStart = ( state, action ) => {
	return updateObject( state, { loading: true } );
};

const fetchOrdersSuccess = ( state, action ) => {
	return updateObject( state, {
		orders:  action.orders,
		loading: false
	} );
};

const fetchOrdersFail = ( state, action ) => {
	return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case actionTypes.BUY_INIT:
			return buyInit( state, action );
		case actionTypes.BUY_BURGER_START:
			return buyBurgerStart( state, action );
		case actionTypes.BUY_BURGER_SUCCESS:
			return buyBurgerSuccess( state, action )
		case actionTypes.BUY_BURGER_FAIL:
			return buyBurgerFail( state, action );
		case actionTypes.FETCH_ORDERS_START:
			return fetchOrdersStart( state, action );
		case actionTypes.FETCH_ORDERS_SUCCESS:
			return fetchOrdersSuccess( state, action );
		case actionTypes.FETCH_ORDERS_FAIL:
			return fetchOrdersFail( state, action );
		default:
			return state;
	}
};

export default reducer;