import React from 'react';
import classes from './Input.css';

const input = props => {

	let inputelement = null;

	switch ( props.inputtype ) {
		case 'input':
			inputelement = <input className={ classes.InputElement }{ ...props } />;
			break;
		case 'textarea':
			inputelement = <textarea className={ classes.InputElement }{ ...props } />;
			break;
		default:
			inputelement = <input className={ classes.InputElement }{ ...props } />;
	}

	return (
		<div className={ classes.Input }>
			<label className={ classes.Label }>{ props.label }</label>
			{ inputelement }
		</div>
	);
};

export default input;