import { createStore, combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {listProductReducer} from './reducers/productReducers'

const reducer = combineReducers({
    listProduct : listProductReducer,
})
const inisialState = {}
const middleware =[thunk]

const store =createStore(reducer, inisialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store

;
