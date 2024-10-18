import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CategoryHeader from '../../Components/Category/CategoryHeader';
import SearchCountResult from '../../Components/Utility/SearchCountResult';
import SideFilter from '../../Components/Utility/SideFilter';
import CardProductContainer from '../../Components/Products/CardProductsContainer';
import Pagination from '../../Components/Utility/Pagination';
import ViewSearchProductsHook from '../../hook/products/view-search-products-hook';

const ShopProductPage = () => {
  const { items, pagination, onPress, results, getProduct } =
    ViewSearchProductsHook();
  if (pagination) var pageCount = pagination;
  else pageCount = 0;

  return (
    <div style={{ minHeight: '670px' }}>
      <CategoryHeader />

      <Container fluid className="py-4">
        <SearchCountResult
          onClick={getProduct}
          title={` هناك ${results} نتيجه بحث `}
          className="mb-4"
        />

        <Row>
          <Col sm="2" xs="12" className="mb-3 mb-sm-0">
            <SideFilter />
          </Col>

          <Col sm="10" xs="12">
            <CardProductContainer products={items} title="" btntitle="" />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            <Pagination pageCount={pageCount} onPress={onPress} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ShopProductPage;
