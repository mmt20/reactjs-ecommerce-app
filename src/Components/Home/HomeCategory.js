import React from 'react';
import { Container, Row } from 'react-bootstrap';
import SubTitle from '../Utility/SubTitle';
import CategoryCard from '../Category/CategoryCard';
import Spinner from 'react-bootstrap/Spinner';
import HomeCategoryHook from '../../hook/category/home-category-hook';
const HomeCategory = () => {
  const [category, loading, colors] = HomeCategoryHook();
  return (
    <Container>
      <SubTitle title="تصنيفات" btntitle="المزيد" pathText="/allcategory" />
      <Row className="my-2 d-flex justify-content-between ">
        {loading === false ? (
          category.data ? (
            category.data.slice(0, 6).map((item, index) => {
              return (
                <CategoryCard
                  key={index}
                  title={item.name}
                  img={item.image}
                  background={colors[index]}
                  id={item._id}
                />
              );
            })
          ) : (
            <h4>لا يوجد تصنيفات</h4>
          )
        ) : (
          <Spinner animation="border" variant="dark" />
        )}
      </Row>
    </Container>
  );
};

export default HomeCategory;
