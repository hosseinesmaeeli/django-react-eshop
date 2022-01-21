import React, { useState, useEffect } from "react";
// import products from "../products";
import Rating from "../components/Rating";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import axios from "axios";

function ProductScreen() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    async function fetchProduct() {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/v1/products/${id}`
      );
      setProduct(data);
    }
    fetchProduct();
  }, []);
  const { id } = useParams();
  // const product = products.find((p) => p._id === id);
  return (
    <div>
      <Link to={"/"} className="btn btn-light my-3">
        Go Back
      </Link>
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
          </ListGroup>
          <ListGroup.Item>
            <Button
              type="button"
              className="btn-block"
              disabled={product.countInStock === 0}
            >
              {" "}
              Add to Card
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
    </div>
  );
}

export default ProductScreen;
