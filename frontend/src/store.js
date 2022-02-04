import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  listProductReducer,
  detailProductReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";

const reducer = combineReducers({
  listProduct: listProductReducer,
  productDetails: detailProductReducer,
  cart: cartReducer,
});

const cartFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const inisialState = {
    cart:{ cartItems : cartFromLocalStorage}
};
const middleware = [thunk];

const store = createStore(
  reducer,
  inisialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
