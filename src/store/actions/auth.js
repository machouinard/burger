import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {

	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = ( token, userId ) => {

	return {
		type:    actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId:  userId
	};

};

export const authFail = error => {

	return {
		type:  actionTypes.AUTH_FAIL,
		error: error
	};

};

export const logOut = () => {

	localStorage.removeItem( 'token' );
	localStorage.removeItem( 'expirationDate' );
	localStorage.removeItem( 'userId' );

	return {
		type: actionTypes.AUTH_LOGOUT
	};

};

export const checkAuthTimeout = expTime => {

	return dispatch => {

		setTimeout( () => {

			dispatch( logOut() );

		}, expTime * 1000 );

	};

};

export const auth = ( email, password, isSignup ) => {

	return dispatch => {

		dispatch( authStart() );

		const authData = {
			email:             email,
			password:          password,
			returnSecureToken: true
		};

		const apiKey = 'AIzaSyAMT_UANtbdDekmUcAKYBJVAPI6avEpkBY';

		let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + apiKey;

		if ( ! isSignup ) {

			url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + apiKey;

		}

		axios.post( url, authData )
		     .then( resp => {

			     const expDate = new Date( new Date().getTime() + resp.data.expiresIn * 1000 );
			     localStorage.setItem( 'token', resp.data.idToken );
			     localStorage.setItem( 'expirationDate', expDate );
			     localStorage.setItem( 'userId', resp.data.localId );
			     dispatch( authSuccess( resp.data.idToken, resp.data.localId ) );
			     dispatch( checkAuthTimeout( resp.data.expiresIn ) );

		     } )
		     .catch( err => {

			     dispatch( authFail( err.response.data.error ) );

		     } );

	};

};

export const setAuthRedirectPath = path => {

	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path
	};

};

export const authCheckState = () => {

	return dispatch => {

		const token = localStorage.getItem( 'token' );
		
		if ( ! token ) {

			dispatch( logOut() );

		} else {

			const expDate = new Date( localStorage.getItem( 'expirationDate' ) );

			if ( expDate > new Date() ) {

				const userId = localStorage.getItem( 'userId' );

				dispatch( authSuccess( token, userId ) );
				dispatch( checkAuthTimeout( ( expDate.getTime() - new Date().getTime() ) / 1000 ) );

			} else {

				dispatch( logOut() );

			}
		}
	}

}
