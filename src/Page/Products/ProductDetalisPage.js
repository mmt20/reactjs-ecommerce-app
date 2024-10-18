import React from 'react';
import CategoryHeader from '../../Components/Category/CategoryHeader';
import { Container } from 'react-bootstrap';
import ProductDetails from '../../Components/Products/ProductDetails';
import RateContainer from '../../Components/Rate/RateContainer';
import CardProductsContainer from '../../Components/Products/CardProductsContainer';
import { useParams } from 'react-router-dom';
import ViewProductsDetalisHook from '../../hook/products/view-products-detalis-hook';

const ProductDetalisPage = () => {
  const { id } = useParams();
  const { item, prod } = ViewProductsDetalisHook(id);

  if (prod) var items = prod.slice(0, 4);

  if (item) {
    var rateAvg = item.ratingsAverage;
    var rateQty = item.ratingsQuantity;
  }
  return (
    <div style={{ minHeight: '670px' }}>
      <CategoryHeader />
      <Container>
        <ProductDetails />
        <RateContainer rateAvg={rateAvg} rateQty={rateQty} />
        <CardProductsContainer products={prod} title="منتجات قد تعجبك" />
      </Container>
    </div>
  );
};

export default ProductDetalisPage;
