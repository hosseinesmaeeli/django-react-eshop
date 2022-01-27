import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap"; //imd
// import products from "../products";
import Product from "../components/Product";
// import axios from "axios";
import { fetchProducts } from "../actions/productActions";

function HomeScreen() {
  const dispatch = useDispatch();
  const listProducts = useSelector((state) => state.listProduct);
  const { error, loading, products } = listProducts;

  // const [products, setProducts] = useState([]);
  useEffect(() => {
    dispatch(fetchProducts());

    //   async function fetchProducts() {
    //     const { data } = await axios.get(
    //       "/api/v1/products/"
    //     );
    //     setProducts(data);
    //   }
    //   fetchProducts();
  }, []);

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
