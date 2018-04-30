import * as actionTypes from '../actions/actionTypes';

const initialState = {
	orders: [],
	loading: false,
	bought: false
};

const reducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case actionTypes.BUY_BURGER_START:
			return {
				...state,
				loading: true
			};
		case actionTypes.BUY_BURGER_SUCCESS:
			const newOrder = {
				...action.orderData,
				id: action.orderId,
			};
			return {
				...state,
				loading: false,
				orders: state.orders.concat( newOrder ),
				bought: true
			};
		case actionTypes.BUY_BURGER_FAIL:
			return {
				...state,
				loading: false,
			};
		case actionTypes.BUY_INIT:
			return {
				...state,
				bought: false
			};
		default:
			return state;
	}
};

export default reducer;
