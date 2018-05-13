import React from 'react';
import classes from './NavItems.css';
import NavItem from './NavItem/NavItem';

const navItems = props => {

	console.log( 'auth?', props.isAuthenticated );

	return (

		<ul className={ classes.NavItems }>
			<NavItem link="/" exact>Burger Builder</NavItem>
			{ props.isAuthenticated
				? <NavItem link="/orders">Orders</NavItem>
				: ''
			}
			{ props.isAuthenticated
				? <NavItem link="/logout">Logout</NavItem>
				: <NavItem link="/auth">Login</NavItem>
			}
		</ul>
	);

};

export default navItems;