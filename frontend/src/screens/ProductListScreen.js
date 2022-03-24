import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { fetchProducts} from "../actions/productActions";
import {  useParams, useNavigate } from "react-router-dom";

function ProductListScreen() { 
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo} = userLogin;

  const navigate = useNavigate();
  const params = useParams();
//   const productId = params.id;

  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
        dispatch(fetchProducts())
    } else {
        navigate('/login')
    }
}, [dispatch,navigate,userInfo])


  const deleteHandler = (id) => {
    // console.log("delet", id);
    if (window.confirm('Are you sure you want to delete this product?')){
        //Delete products
    }}
    const createProductHandler = (product) => {
        //create product
  };

  return (
    <div>
      <Row className= 'align-items-center'>
            <Col>
            <h1>Products</h1>
            </Col>     
            <Col className='text-right'>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className="fas fa-plus"></i>Create Product
                </Button>
            </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" text={error} />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>

            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>

               
                <td>
                    <div className='btn-group'>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}>
                    <i className="fas fa-trash"></i>
                  </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default ProductListScreen;
