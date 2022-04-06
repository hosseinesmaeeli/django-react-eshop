import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import products from "../products";
import Rating from "../components/Rating";
import { useParams, Link, useNavigate } from "react-router-dom";
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
import {
  fetchProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProductScreen() {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin); //for review added
  const { userInfo } = userLogin; //for review added

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    error: errorProductReview,
    loading: loadingProductReview,
    success: successProductReview,
  } = productReviewCreate;

  const params = useParams();
  const navigate = useNavigate();

  // const [product, setProduct] = useState([]);

  useEffect(() => {
    //in this section tutorial use if uccessProductReview :....(we change it)

    setRating(0);
    setComment("");
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });

    dispatch(fetchProductDetails(params.id));
    // console.log(qty);
    // async function fetchProduct() {
    //   const { data } = await axios.get(
    //     `/api/v1/products/${id}`
    //   );
    //   setProduct(data);
    // }
    // fetchProduct();
  }, [dispatch, params.id, successProductReview]);
  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`);
  };
  // const product = products.find((p) => p._id === id);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(params.id, {
        rating,
        comment,
      })
    );
  };
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
        <div>
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
                  <ListGroup.Item>
                    <strong>Description:</strong>
                    {product.description}
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
                        <Col sm={4}>Qty:</Col>
                        <Col sm={8}>
                          <Form.Select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
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
                {/* <strong>Description:</strong>
              {product.description} */}
              </Col>
            </Row>
          </Container>
          <Row>
            <Col md={6}>
              <h4>Reviews</h4>
              {product.reviews.length === 0 && (
                <Message variant="info" text={"No Reviews"} />
              )}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} color="#f8e825" />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h4>Writing a review</h4>

                  {loadingProductReview && <Loader />}
                  {successProductReview && (
                    <Message variant="success" text={"Review Submitted"} />
                  )}
                  {errorProductReview && (
                    <Message variant="danger" text={errorProductReview} />
                  )}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Review</Form.Label>
                        <Form.Control
                          as="textarea"
                          raw="5"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                        className="w-25 py-2 my-5"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message
                      variant="info"
                      text={
                        <div>
                          Please <Link to="/login">login</Link> to write a
                          review
                        </div>
                      }
                    />
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
