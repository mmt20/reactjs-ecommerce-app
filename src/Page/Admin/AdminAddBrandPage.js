import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import AdminSideBar from '../../Components/Admin/AdminSideBar';
import AdminAddBrand from '../../Components/Admin/AdminAddBrand';
const AdminAddBrandPage = () => {
  return (
    <Container>
      <Row className="py-3">
        <Col sm="5" xs="3" md="2">
          <AdminSideBar />
        </Col>
        <Col sm="7" xs="9" md="10">
          <AdminAddBrand />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAddBrandPage;
