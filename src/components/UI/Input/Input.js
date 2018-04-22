import React from 'react';
import classes from './Input.css';

const input = props => {

	let inputelement = null;

	switch ( props.elementType ) {
		case 'input':
			inputelement = <input
				className={ classes.InputElement }
				{ ...props.elementConfig }
				value={ props.value }
				onChange={ props.changed }
			/>;
			break;
		case 'textarea':
			inputelement = <textarea
				className={ classes.InputElement }
				{ ...props.elementConfig }
				value={ props.value }
				onChange={ props.changed }
			/>;
			break;
		case 'select':
			inputelement = (
				<select
					className={ classes.InputElement }
					value={ props.value }
				onChange={ props.changed }>
					{ props.elementConfig.options.map( option => (
						<option key={ option.value } value={ option.value }>
							{ option.displayValue }
						</option>
					) ) }
				</select>
			);
			break;
		default:
			inputelement = <input
				className={ classes.InputElement + ' default' }
				{ ...props.elementConfig }
				value={ props.value }
				onChange={ props.changed }
			/>;
	}

	return (
		<div className={ classes.Input }>
			<label className={ classes.Label }>{ props.label }</label>
			{ inputelement }
		</div>
	);
};

export default input;