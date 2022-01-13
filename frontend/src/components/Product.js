import React from "react";
import { Card } from "react-bootstrap";

function Product({ product }) {
  return (
    <div>
      <Card className="p-3 my-3 rounded">
        <a href={`/product/${product._id}`}>
          <Card.Img src={product.image} />
        </a>

        <Card.Body>
          <a href={`/product/${product._id}`}>
            <Card.Title as="div">
              <strong> {product.name} </strong>
            </Card.Title>
          </a>
          <Card.Text as="div" ClassName="my-3">
            {product.rating} from {product.numReviews} reviews
          </Card.Text>
          <Card.Text as="h4">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Product;
