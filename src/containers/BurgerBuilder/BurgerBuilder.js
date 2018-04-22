import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const ING_PRICES = {
	salad:  0.5,
	cheese: 0.6,
	bacon:  1.25,
	meat:   1.5
};

class BurgerBuilder extends Component {

	state = {
		ingredients: null,
		totalPrice:  4,
		buyable:     false,
		ordered:     false,
		loading:     false,
		error:       false
	};

	componentDidMount() {

		//console.log( this.props );

		axios.get( 'https://chouinard-burger.firebaseio.com/ingredients.json' ).then( resp => {
			this.setState( { ingredients: resp.data } );
		} ).catch( error => {
			console.log( error );
			this.setState( { error: true } );
		} );
	}

	addIngredientHandler = type => {

		const oldCount           = this.state.ingredients[ type ];
		const newCount           = oldCount + 1;
		const updatedIngredients = { ...this.state.ingredients };

		updatedIngredients[ type ] = newCount;

		const priceAdded = ING_PRICES[ type ];
		const oldPrice   = this.state.totalPrice;
		const newPrice   = oldPrice + priceAdded;

		this.setState( {
			               ingredients: updatedIngredients,
			               totalPrice:  newPrice
		               } );

		this.updateBuyable( updatedIngredients );
	};

	removeIngredientHandler = type => {

		const oldCount = this.state.ingredients[ type ];

		if ( oldCount < 1 ) {
			return;
		}

		const newCount           = oldCount - 1;
		const updatedIngredients = { ...this.state.ingredients };

		updatedIngredients[ type ] = newCount;

		const priceSubtracted = ING_PRICES[ type ];
		const oldPrice        = this.state.totalPrice;
		const newPrice        = oldPrice - priceSubtracted;

		this.setState( {
			               ingredients: updatedIngredients,
			               totalPrice:  newPrice
		               } );

		this.updateBuyable( updatedIngredients );

	};

	updateBuyable( ingredients ) {

		const total = Object.keys( ingredients ).map( key => {
			return ingredients[ key ];
		} ).reduce( ( sum, el ) => {
			return sum + el;
		}, 0 );

		this.setState( {
			               buyable: total > 0
		               } );

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

		const queryParams = [];

		for ( let i in this.state.ingredients ) {
			queryParams.push( encodeURIComponent( i ) + '=' + encodeURIComponent( this.state.ingredients[i] ) );
		}

		queryParams.push( 'price=' + this.state.totalPrice );

		const queryString = queryParams.join( '&' );

		this.props.history.push( {
			pathname: '/checkout',
			search: '?' + queryString
		                         } );

	};

	render() {

		let disabled = {
			...this.state.ingredients
		};

		for ( let key in disabled ) {
			disabled[ key ] = disabled < 1
		}

		let orderSummary = null;

		if ( this.state.ingredients ) {

			orderSummary = <OrderSummary
				ingredients={ this.state.ingredients }
				cancelled={ this.cancelOrderHandler }
				orderContinue={ this.orderContinueHandler }
				price={ this.state.totalPrice }
			/>;

		}

		if ( this.state.loading ) {

			orderSummary = <Spinner/>

		}

		let burger = this.state.error ? <p>ERROR</p> : <Spinner/>;

		if ( this.state.ingredients ) {

			burger = (
				<Aux>
					<Burger ingredients={ this.state.ingredients }/>
					<BuildControls price={ this.state.totalPrice }
					               disabled={ disabled }
					               ingredientAdded={ this.addIngredientHandler }
					               ingredientRemoved={ this.removeIngredientHandler }
					               buyable={ this.state.buyable }
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

export default withErrorHandler( BurgerBuilder, axios );