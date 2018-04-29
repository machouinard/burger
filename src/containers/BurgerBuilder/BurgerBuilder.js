import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';
import { connect } from 'react-redux';

class BurgerBuilder extends Component {

	state = {
		ordered: false,
		loading: false,
		error:   false
	};

	componentDidMount() {

		//console.log( this.props );

		//axios.get( 'https://chouinard-burger.firebaseio.com/ingredients.json' ).then( resp => {
		//	this.setState( { ingredients: resp.data } );
		//} ).catch( error => {
		//	console.log( error );
		//	this.setState( { error: true } );
		//} );
	}

	updateBuyable() {

		const total = Object.keys( this.props.ings ).map( key => {
			return this.props.ings[ key ];
		} ).reduce( ( sum, el ) => {
			return sum + el;
		}, 0 );

		return total > 0;

	}

	orderHandler = () => {

		this.setState( {
			               ordered: true
		               } );

	}

	cancelOrderHandler = event => {

		this.setState( {
			               ordered: false
		               } );
	};

	orderContinueHandler = event => {

		//alert( 'Enjoy' );

		this.props.history.push( {
			                         pathname: '/checkout'
		                         } );

	};

	render() {

		let disabled = {
			...this.props.ings
		};

		for ( let key in disabled ) {
			disabled[ key ] = disabled < 1
		}

		let orderSummary = null;

		if ( this.props.ings ) {

			orderSummary = <OrderSummary
				ingredients={ this.props.ings }
				cancelled={ this.cancelOrderHandler }
				orderContinue={ this.orderContinueHandler }
				price={ this.props.totalPrice }
			/>;

		}

		if ( this.state.loading ) {

			orderSummary = <Spinner/>

		}

		let burger = this.state.error ? <p>ERROR</p> : <Spinner/>;

		if ( this.props.ings ) {

			burger = (
				<Aux>
					<Burger ingredients={ this.props.ings }/>
					<BuildControls price={ this.props.totalPrice }
					               disabled={ disabled }
					               ingredientAdded={ this.props.onIngredientAdd }
					               ingredientRemoved={ this.props.onIngredientRemove }
					               buyable={ this.updateBuyable() }
					               ordered={ this.orderHandler }
					/>
				</Aux>
			);

		}

		return (
			<Aux>
				<Modal
					show={ this.state.ordered }
					cancel={ this.cancelOrderHandler }
				>
					{ orderSummary }
				</Modal>
				{ burger }
			</Aux>
		);

	}

}

const mapStateToProps = state => {
	return {
		ings:       state.ingredients,
		totalPrice: state.totalPrice
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdd:    ( name ) => dispatch( { type: actionTypes.ADD_INGREDIENT, ingredientName: name } ),
		onIngredientRemove: ( name ) => dispatch( { type: actionTypes.REMOVE_INGREDIENT, ingredientName: name } )

	}
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( BurgerBuilder, axios ) );