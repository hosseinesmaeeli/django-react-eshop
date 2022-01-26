import { createStore, combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

const reducer = combineReducers({})
const inisialState = {}
const middleware =[thunk]

const store =createStore(reducer, inisialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store

;
