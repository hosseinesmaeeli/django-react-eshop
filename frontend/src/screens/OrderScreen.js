import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import {PayPalButton} from 'react-paypal-button-v2'
import {ORDER_PAY_RESET} from '../constants/orderConstants'


function OrderScreen() {
  const[ sdkReady,setSdkReady]= useState(false)
  const dispatch = useDispatch();
  const params = useParams();
  const orderId = params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading:loadingPay, success:successPay } = orderPay;

  const navigate = useNavigate();

  // console.log(orderId)
  // console.log(order._id)

  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  const addPayPalScript =() => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://www.paypal.com/sdk/js?client-id=AYQlUzSfD4vBad9LhKbSJJAoQ9Z0DFoSyXFfJ-uUg5RGIdWGsmL0AMlYevzQBhAFyXVZ7E_--20dZ1GR'
    script.async= true
    script.onload = () =>{
      setSdkReady(true)
    }
    document.body.appendChild(script)
  }
//AYQlUzSfD4vBad9LhKbSJJAoQ9Z0DFoSyXFfJ-uUg5RGIdWGsmL0AMlYevzQBhAFyXVZ7E_--20dZ1GR
  useEffect(() => {
    if (!order || successPay|| order._id !== Number(orderId)) {
      dispatch({type: ORDER_PAY_RESET})
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if(!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, order, orderId,successPay]);

  const successPaymentHandler= (paymentResult) => {   
    dispatch(payOrder(orderId, paymentResult))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" text={error} />
  ) : (
    <div>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strongs>Name:</strongs>
                {order.user.name}{" "}
              </p>
              <p>
                <strongs>Email:</strongs>
                <a href={`mailto:${order.user.email}`}>
                  {order.user.email}
                </a>{" "}
              </p>

              <p>
                <strong>Shipping : </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}
                {"  "}
                {order.shippingAddress.postalCode},{"  "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success" text={`Delivered on ${order.deliveredAt}`} />
              ) : (
                <Message variant="warning" text="Not Delivered" />
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success" text={`Paid on ${order.paidAt}`} />
              ) : (
                <Message variant="warning" text="Not paid" />
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info" text="Order is empty" />
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} =$
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${order.itemsPrice} </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${order.shippingPrice} </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${order.taxPrice} </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${order.totalPrice} </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                    {!order.isPaid && (
                      <ListGroup.Item>
                        {loadingPay && <Loader/>}
                        { !sdkReady ? (
                            <Loader />
                        ) : (
                          <PayPalButton 
                          amount= {order.totalPrice}
                          onSuccess = { successPaymentHandler}
                          />
                        )}
                      </ListGroup.Item>
                    )}

              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
