import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  listProductReducer,
  detailProductReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userLoginReducer,userRegisterReducer, userDetailReducer, userUpdateProfileReducer,userListReducer,userDeleteReducer} from "./reducers/userReducers";
import {orderCreateReducer,orderDetailsReducer,orderPayReducer,orderListMyReducer} from './reducers/orderReducers'

const reducer = combineReducers({
  listProduct: listProductReducer,
  productDetails: detailProductReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails : userDetailReducer,
  userUpdateProfile : userUpdateProfileReducer,
  userList : userListReducer,
  orderCreate:orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy : orderListMyReducer,
  userDelete : userDeleteReducer,
});

const cartFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
  const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
  const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const inisialState = {
    cart:{ cartItems : cartFromLocalStorage,
    shippingAddress: shippingAddressFromStorage,
    },
    userLogin : { userInfo : userInfoFromStorage}
};
const middleware = [thunk];

const store = createStore(
  reducer,
  inisialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
