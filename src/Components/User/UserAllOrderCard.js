import React from 'react';
import {
  Col,
  Row,
  Card,
  Image,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserAllOrderCard = ({ item }) => {
  return (
    <Card
      className="p-3 mb-3 shadow-sm rounded border-0 bg-white"
      dir="rtl"
      style={{ maxWidth: '650px' }}
    >
      <Row className="align-items-start">
        {/* Product Image */}
        <Col xs="5" md="4" className="d-flex justify-content-end">
          <Link
            to={`/products/${item.product._id}`}
            className="text-decoration-none"
          >
            <Image
              width="256px"
              src={item.product.imageCover}
              alt={item.product.title}
              className="rounded img-fluid"
            />
          </Link>
        </Col>

        <Col xs="7" md="5">
          <div className="fw-bold mb-2 fs-5 text-dark">
            {item.product.title || 'لا يوجد عنوان'}
          </div>
          <div className="d-flex align-items-center mb-2">
            <span className="text-muted fs-6">التقييم: </span>
            <span className="mx-2 fs-6 px-2 py-1  text-warning">
              {item.product.ratingsAverage ? item.product.ratingsAverage : 0}
            </span>
            <span className="text-muted fs-6">
              ({`${item.product.ratingsQuantity || 0} تقييم`})
            </span>
          </div>
          <div className="d-flex align-items-center">
            <span className="text-muted fs-6">الكمية</span>
            <InputGroup className="mx-2" style={{ width: '80px' }}>
              <FormControl
                disabled
                value={item.quantity}
                type="number"
                className="text-center"
              />
            </InputGroup>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default UserAllOrderCard;
