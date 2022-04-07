import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");
  let navigate=useNavigate()

  const submitHandler = (e) => {
    e.preventDefault();
    if(keyword){
        navigate(`/?keyword=${keyword}`)}
        else{}
           
        
    
  };

  return (
    <Form onSubmit={submitHandler} >
      <Row>
        <Col xs="auto">
          <Form.Control
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
            className="mr-sm-2 ml-sm-5 p-2"
          ></Form.Control>
        </Col>
        <Col xs="auto">
          <Button type="submit" variant="outline-success" className=" p-2 w-5 ">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchBox;
