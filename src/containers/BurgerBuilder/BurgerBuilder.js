import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const ING_PRICES = {
	salad:  0.5,
	cheese: 0.6,
	bacon:  1.25,
	meat:   1.5
}

class BurgerBuilder extends Component {

	state = {
		ingredients: {
			salad:  0,
			bacon:  0,
			cheese: 0,
			meat:   0
		},
		totalPrice:  4
	};

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
	};

	removeIngredientHandler = type => {

		const oldCount           = this.state.ingredients[ type ];

		if ( oldCount < 1 ) {
			return;
		}

		const newCount           = oldCount - 1;
		const updatedIngredients = { ...this.state.ingredients };

		updatedIngredients[ type ] = newCount;

		const priceSubtracted = ING_PRICES[ type ];
		const oldPrice   = this.state.totalPrice;
		const newPrice   = oldPrice - priceSubtracted;

		this.setState( {
			               ingredients: updatedIngredients,
			               totalPrice:  newPrice
		               } );

	};

	render() {

		let disabled = {
			...this.state.ingredients
		};

		for ( let key in disabled ) {
			disabled[key] = disabled < 1
		}

		return (
			<Aux>
				<Burger ingredients={ this.state.ingredients }/>
				<BuildControls price={this.state.totalPrice} disabled={disabled} ingredientAdded={this.addIngredientHandler} ingredientRemoved={this.removeIngredientHandler} />
			</Aux>
		);

	}

}

export default BurgerBuilder;