import axios from 'axios';

const instance = axios.create( {
	baseURL: 'https://chouinard-burger.firebaseio.com/'
              } );

export default instance;