import React, { useEffect } from "react";
import { useParams, useSearchParams,Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { Row, Col, ListGroup, Image, ListGroupItem, Form } from "react-bootstrap";
import Message from "../components/Message";
function CartScreen() {
  const params = useParams();
  const productId = params.id;
  const [searchParams] = useSearchParams();
  const qty = searchParams ? searchParams.get("qty") : 1;
  const dispatch = useDispatch();
  //  console.log(qty)
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  // console.log(cartItems)
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <Row>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <Message variant="info" text="Your cart is empty!" />
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded></Image>
                  </Col>
                  <Col md={3}>
                   <Link to={`/product/${item.product}`}> {item.name}</Link>
                  </Col>
                  <Col md={2}>
                  ${item.price}
                  </Col>
                  <Col md={3}>
                  <Form.Select
                          value={item.qty}
                          onChange={(e) =>dispatch(addToCart(item.product, Number(e.target.value)))}
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Select>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}></Col>
    </Row>
  );
}

export default CartScreen;
