import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import classes from './SideDrawer.css';
import Aux from '../../../hoc/Aux/Aux';
import BackDrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = props => {

	let drawerClasses = [ classes.SideDrawer, classes.Close ];

	if ( props.open ) {
		drawerClasses = [ classes.SideDrawer, classes.Open ];
	}

	return (
		<Aux>
			<BackDrop show={ props.open } clicked={ props.closed } />
			<div className={ drawerClasses.join( ' ' ) }>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavItems isAuthenticated={ props.isAuth }/>
				</nav>
			</div>
		</Aux>
	);

};

export default sideDrawer;