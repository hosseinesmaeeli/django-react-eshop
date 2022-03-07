import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  listProductReducer,
  detailProductReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userLoginReducer,userRegisterReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  listProduct: listProductReducer,
  productDetails: detailProductReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer
});

const cartFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
  const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const inisialState = {
    cart:{ cartItems : cartFromLocalStorage},
    userLogin : { userInfo : userInfoFromStorage}
};
const middleware = [thunk];

const store = createStore(
  reducer,
  inisialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
