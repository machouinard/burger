import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {

	state = {
		ordered: false
	};

	componentDidMount() {

		//console.log( this.props );

		this.props.onInitIngredients();

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

		if ( this.props.isAuthenticated ) {

			this.setState( {
				               ordered: true
			               } );
		} else {
			this.props.history.push( '/auth' );
		}

	}

	cancelOrderHandler = event => {

		this.setState( {
			               ordered: false
		               } );
	};

	orderContinueHandler = event => {

		//alert( 'Enjoy' );

		this.props.onInitBuy();

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

		let burger = this.props.error ? <p>ERROR</p> : <Spinner/>;

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
					               isAuth={ this.props.isAuthenticated }
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
		ings:       state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		error:      state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdd:    ( name ) => dispatch( actions.addIngredient( name ) ),
		onIngredientRemove: ( name ) => dispatch( actions.removeIngredient( name ) ),
		onInitIngredients: () => dispatch( actions.initIngredients() ),
		onInitBuy: () => dispatch( actions.buyInit() )

	}
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( BurgerBuilder, axios ) );