import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AdminSideBar from '../../Components/Admin/AdminSideBar';
import Pagination from '../../Components/Utility/Pagination';
import AdminAllProducts from '../../Components/Admin/AdminAllProducts';
import ViewProductAdminHook from '../../hook/admin/view-product-admin-hook';
import { getAllProductsPage } from '../../redux/actions/productsAction';
import { useDispatch } from 'react-redux';
const AdminAllProductPage = () => {
  const dispatch = useDispatch();
  const { items, pagination, onPress } = ViewProductAdminHook();
  let pageCount = [];
  if (pagination) pageCount = pagination;

  return (
    <Container>
      <Row className="py-3">
        <Col sm="3" xs="2" md="2">
          <AdminSideBar />
        </Col>
        <Col sm="9" xs="10" md="10">
          <AdminAllProducts products={items} />
          {pageCount > 1 ? (
            <Pagination pageCount={pageCount} onPress={onPress} />
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAllProductPage;
