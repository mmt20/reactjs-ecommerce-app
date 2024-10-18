import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ProductGallery from './ProductGallery';
import ProductsText from './ProductsText';

const ProductDetails = () => {
  return (
    <div>
      <Row className="py-3">
        <Col lg="4" sm="12">
          <ProductGallery />
        </Col>
        <Col lg="8" sm="12">
          <ProductsText />
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;
