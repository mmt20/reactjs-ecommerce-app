import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import BrandCard from './BrandCard';
const BrandContainer = ({ data, loading }) => {
  return (
    <Container>
      <div className="admin-content-text mt-2"> كل الماركات</div>

      <Row className="my-2 d-flex justify-content-between ">
        {loading === false ? (
          data ? (
            data.map((item, index) => {
              return <BrandCard key={index} img={item.image} id={item._id} />;
            })
          ) : (
            <h4>لا يوجد ماركات</h4>
          )
        ) : (
          <Spinner animation="border" variant="dark" />
        )}
      </Row>
    </Container>
  );
};

export default BrandContainer;
