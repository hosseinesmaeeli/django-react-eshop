import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {addToCart} from '../actions/cartActions';
;

function CartScreen() {
  const params = useParams();
  const productId = params.id;
  const [searchParams] = useSearchParams();
  const qty = searchParams ? searchParams.get("qty") : 1;
  const dispatch= useDispatch();
  //  console.log(qty)
 const cart = useSelector(state=> state.cart)
 const{cartItems} = cart
console.log(cartItems)
useEffect(()=>{
  if(productId){
    dispatch(addToCart(productId,qty))
  }

},[dispatch, productId, qty])

  return <div>cart</div>;
}

export default CartScreen;
