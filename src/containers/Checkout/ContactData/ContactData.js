import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
	state = {
		name:    '',
		email:   '',
		address: {
			'street': '',
			'city':   '',
			'state':  '',
			'zip': ''
		}
	};

	render() {
		return (
			<div className={classes.ContactData}>
				<h4>Enter your data</h4>
				<form>
					<input type="text" name="name" placeholder="Your name"/>
					<input type="email" name="email" placeholder="Your email"/>
					<input type="text" name="street" placeholder="Your street"/>
					<input type="text" name="city" placeholder="Your city"/>
					<input type="text" name="state" placeholder="Your state"/>
					<input type="text" name="zipcode" placeholder="Your zipcode"/>
					<Button buttonType="Success">Order</Button>
				</form>
			</div>
		)
	}

}

export default ContactData;