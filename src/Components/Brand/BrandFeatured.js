import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import SubTitle from '../Utility/SubTitle';
import BrandCard from './BrandCard';
import HomeBrandHook from './../../hook/brand/home-brand-hook';

const BrandFeatured = ({ title, btntitle }) => {
  const [brand, loading] = HomeBrandHook();

  return (
    <Container>
      {brand.data && brand.data.length > 0 ? (
        <>
          <SubTitle title={title} btntitle={btntitle} pathText="/allbrand" />
          <Row className="my-2 d-flex justify-content-between ">
            {loading === false ? (
              brand.data ? (
                brand.data.slice(0, 5).map((item, index) => {
                  return <BrandCard key={index} img={item.image} />;
                })
              ) : (
                <h4>لا يوجد ماركات</h4>
              )
            ) : (
              <Spinner animation="border" variant="dark" />
            )}
          </Row>
        </>
      ) : null}
    </Container>
  );
};

export default BrandFeatured;
