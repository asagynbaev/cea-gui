import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/stable';
// import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import configureStore from './redux/_store/configureStore';

const store = configureStore();
// console.log(store.getState());
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
serviceWorker.unregister();