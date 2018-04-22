import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
	state = {
		name:    '',
		email:   '',
		address: {
			'street': '',
			'city':   '',
			'state':  '',
			'zip':    ''
		},
		loading: false
	};

	orderHandler = event => {
		event.preventDefault();

		this.setState( { loading: true } );

		const order = {
			ingredients:    this.props.ingredients,
			price:          this.props.price,
			customer:       {
				name:    'Chouinard',
				address: {
					street: '42nd st',
					city:   'Sacramento',
					state:  'CA',
					zip:    '95819'
				},
				email:   'test@test.com'
			},
			deliverymethod: 'cheapest'
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

		let form = (
			<form>
				<Input inputtype="input" type="text" name="name" placeholder="Your name"/>
				<Input inputtype="input" type="email" name="email" placeholder="Your email"/>
				<Input inputtype="input" type="text" name="street" placeholder="Your street"/>
				<Input inputtype="input" type="text" name="city" placeholder="Your city"/>
				<Input inputtype="input" type="text" name="state" placeholder="Your state"/>
				<Input inputtype="input" type="text" name="zipcode" placeholder="Your zipcode"/>
				<Button buttonType="Success" clicked={ this.orderHandler }>Order</Button>
			</form>
		);

		if ( this.state.loading ) {
			form = <Spinner />
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