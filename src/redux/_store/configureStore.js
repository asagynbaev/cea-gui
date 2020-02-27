import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../_reducers';

export default function configureStore(initialState) {
 const middleware = [thunk];
 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));
 return store;
}