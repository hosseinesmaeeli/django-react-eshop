import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import products from "../products";
import Rating from "../components/Rating";
import { useParams, Link,useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";
// import axios from "axios";
import { fetchProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProductScreen() {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;
  const params = useParams();
  const navigate = useNavigate();

  // const [product, setProduct] = useState([]);
  useEffect(() => {
    dispatch(fetchProductDetails(params.id));
    // console.log(qty);
    // async function fetchProduct() {
    //   const { data } = await axios.get(
    //     `/api/v1/products/${id}`
    //   );
    //   setProduct(data);
    // }
    // fetchProduct();
  }, [dispatch, params.id, qty]);
  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`);
    console.log('bbb');
  };
  // const product = products.find((p) => p._id === id);
  return (
    <div>
      <Link to={"/"} className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" text={error} />
      ) : (
        <Container>
          <Row>
            <Col sm={12} md={6} lg={6} xl={6}>
              <Image src={product.image} alt={product.name} />
            </Col>
            <Col sm={12} md={3} lg={3} xl={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h5>{product.name}</h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    color={"#F8E825"}
                  />
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={12} md={3} lg={3} xl={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty:</Col>
                      <Col>
                        <Form.Select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
              </ListGroup>
              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler}
                  type="button"
                  className="btn-block"
                  disabled={product.countInStock === 0}
                >
                  {" "}
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </Col>
          </Row>

          <Row>
            <Col>
              <strong>Description:</strong>
              {product.description}
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default ProductScreen;
