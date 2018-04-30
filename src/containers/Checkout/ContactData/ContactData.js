import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
	state = {
		orderForm: {
			name:           {
				elementType:   'input',
				elementConfig: {
					type:        'text',
					placeholder: ' Name'
				},
				value:         '',
				validation:    {
					required: true
				},
				valid:         false,
				touched:       false
			},
			street:         {
				elementType:   'input',
				elementConfig: {
					type:        'text',
					placeholder: ' Street'
				},
				value:         '',
				validation:    {
					required: true
				},
				valid:         false,
				touched:       false
			},
			city:           {
				elementType:   'input',
				elementConfig: {
					type:        'text',
					placeholder: ' City'
				},
				value:         '',
				validation:    {
					required: true
				},
				valid:         false,
				touched:       false
			},
			state:          {
				elementType:   'input',
				elementConfig: {
					type:        'text',
					placeholder: ' State'
				},
				value:         '',
				validation:    {
					required: true
				},
				valid:         false,
				touched:       false
			},
			zip:            {
				elementType:   'input',
				elementConfig: {
					type:        'text',
					placeholder: ' zipcode'
				},
				value:         '',
				validation:    {
					required:  true,
					minLength: 5,
					maxLength: 9
				},
				valid:         false,
				touched:       false
			},
			email:          {
				elementType:   'input',
				elementConfig: {
					type:        'email',
					placeholder: ' email'
				},
				value:         '',
				validation:    {
					required: true
				},
				valid:         false,
				touched:       false
			},
			deliverymethod: {
				elementType:   'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' }
					]
				},
				value:         'fastest',
				validation: {},
				valid: true
			},
		},
		validForm: false
	};

	orderHandler = event => {
		event.preventDefault();

		const formData = {};
		for ( let formElementIdentifier in this.state.orderForm ) {
			formData[ formElementIdentifier ] = this.state.orderForm[ formElementIdentifier ].value;
		}

		console.log( 'formData', formData );

		const order = {
			ingredients: this.props.ings,
			price:       this.props.price,
			orderData:   formData
		};

		this.props.onOrderBurger( order );

	};

	validateFormField( value, rules ) {

		//if ( ! rules ) {
		//	return true;
		//}

		let isValid = true;

		if ( rules.required ) {

			isValid = value.trim() !== '' && isValid;

		}

		if ( rules.minLength ) {

			isValid = value.length >= rules.minLength && isValid;

		}

		if ( rules.maxLength ) {

			isValid = value.length <= rules.maxLength && isValid;

		}

		return isValid

	}

	inputChangedHandler = ( event, inputIdentifier ) => {

		//console.log( event.target.value, inputIdentifier );

		const updatedOrderForm = { ...this.state.orderForm };

		const updatedFormElement = { ...updatedOrderForm[ inputIdentifier ] };

		updatedFormElement.value = event.target.value;

		updatedFormElement.valid = this.validateFormField( updatedFormElement.value, updatedFormElement.validation );

		updatedFormElement.touched = true;

		updatedOrderForm[ inputIdentifier ] = updatedFormElement;

		let formIsValid = true;

		for ( let id in updatedOrderForm ) {
			formIsValid = updatedOrderForm[ id ].valid && formIsValid;
		}

		this.setState( {
			               orderForm: updatedOrderForm,
			               validForm: formIsValid
		               } );

	};

	render() {

		const formElementsArray = [];

		for ( let key in this.state.orderForm ) {
			formElementsArray.push( {
				                        id:     key,
				                        config: this.state.orderForm[ key ]
			                        } );
		}

		let form = (
			<form onSubmit={ this.orderHandler }>
				{ formElementsArray.map( formElement => (
					<Input
						key={ formElement.id }
						elementType={ formElement.config.elementType }
						elementConfig={ formElement.config.elementConfig }
						value={ formElement.config.value }
						invalid={ ! formElement.config.valid }
						shouldValidate={ formElement.config.validation }
						changed={ event => this.inputChangedHandler( event, formElement.id ) }
						touched={ formElement.config.touched }
					/>
				) ) }


				<Button disabled={ ! this.state.validForm } buttonType="Success" clicked={ this.orderHandler }>Order</Button>
			</form>
		);

		if ( this.props.loading ) {

			form = <Spinner/>

		}

		return (
			<div className={ classes.ContactData }>
				<h4>Enter your data</h4>
				{ form }
			</div>
		)
	}

}

const mapStateToProps = state => {

	return {
		ings: state.ingredients,
		price: state.totalPrice,
		loading: state.loading
	}

};

const mapDispatchToProps = dispatch => {
	return {
		onOrderBurger: ( orderData ) => dispatch( actions.buyBurger( orderData ) )
	};
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( ContactData, axios ) );