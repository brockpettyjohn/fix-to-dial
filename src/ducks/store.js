import { createStore, applyMiddleware } from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import reducer from './reducer.js';

export default createStore(
    reducer,
    applyMiddleware(reduxPromiseMiddleware())
);