import React from 'react';
import { Row } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import ProductCard from './ProductCard';
import SubTitle from '../Utility/SubTitle.js';
import CardContainerHook from '../../hook/products/card-container-hook.js';

const CardProductsContainer = ({ title, btntitle, pathText, products }) => {
  const { favProd } = CardContainerHook();

  return (
    <Container>
      <SubTitle title={title} btntitle={btntitle} pathText="/products" />
      <Row className="justify-content-between ">
        {products
          ? products.map((item, index) => (
              <ProductCard favProd={favProd} key={index} item={item} />
            ))
          : null}
      </Row>
    </Container>
  );
};

export default CardProductsContainer;
