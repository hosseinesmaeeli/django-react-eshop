import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap"; //imd
// import products from "../products";
import Product from "../components/Product";
// import axios from "axios";
import { fetchProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/paginate";
import { useLocation } from "react-router-dom";


function HomeScreen({navigate}) {
  const dispatch = useDispatch();
  const listProducts = useSelector((state) => state.productList);
  const { error, loading, products,page, pages} = listProducts;
  const location = useLocation();
  let keyword=  location.search;
  // console.log(keyword)
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    dispatch(fetchProducts(keyword));

    //   async function fetchProducts() {
    //     const { data } = await axios.get(
    //       "/api/v1/products/"
    //     );
    //     setProducts(data);
    //   }
    //   fetchProducts();
  }, [dispatch,keyword]);
  

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" text={error} />
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
      
      <Paginate page={page} pages={pages} keyword={keyword} />
    </div>
  );
}

export default HomeScreen;
