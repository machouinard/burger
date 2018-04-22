import React from 'react';
import classes from './Order.css';

const order = props => (

	<div className={ classes.Order }>
		<p>Ingredients: Meat (2)</p>
		<p>Price: <strong>$8.50</strong></p>
	</div>

);

export default order;