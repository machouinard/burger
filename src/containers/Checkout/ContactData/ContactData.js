import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
	state = {
		orderForm: {
			name:           {
				elementType:   'input',
				elementConfig: {
					type:        'text',
					placeholder: ' Name'
				},
				value:         ''
			},
			street:         {
				elementType:   'input',
				elementConfig: {
					type:        'text',
					placeholder: ' Street'
				},
				value:         ''
			},
			city:           {
				elementType:   'input',
				elementConfig: {
					type:        'text',
					placeholder: ' City'
				},
				value:         ''
			},
			state:          {
				elementType:   'input',
				elementConfig: {
					type:        'text',
					placeholder: ' State'
				},
				value:         ''
			},
			zip:            {
				elementType:   'input',
				elementConfig: {
					type:        'text',
					placeholder: ' zipcode'
				},
				value:         ''
			},
			email:          {
				elementType:   'input',
				elementConfig: {
					type:        'email',
					placeholder: ' email'
				},
				value:         ''
			},
			deliverymethod: {
				elementType:   'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' }
					]
				},
				value:         ''
			},
		},
		name:      '',
		email:     '',
		address:   {
			'street': '',
			'city':   '',
			'state':  '',
			'zip':    ''
		},
		loading:   false
	};

	orderHandler = event => {
		event.preventDefault();

		this.setState( { loading: true } );

		const order = {
			ingredients: this.props.ingredients,
			price:       this.props.price
		};

		axios.post( '/orders.json', order )
		     .then( resp => {
			     console.log( resp );
			     this.setState( { loading: false } );
			     this.props.history.push( '/' );
		     } )
		     .catch( error => {
			     console.log( error );
			     this.setState( { loading: false } );
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
			<form>
				{ formElementsArray.map( formElement => (
					<Input
						key={ formElement.id }
						elementType={ formElement.config.elementType }
						elementConfig={ formElement.config.elementConfig }
						value={ formElement.config.value }
					/>
				) ) }

				<Button buttonType="Success" clicked={ this.orderHandler }>Order</Button>
			</form>
		);

		if ( this.state.loading ) {
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

export default ContactData;