import React from 'react';
import { Row, Col } from 'react-bootstrap';
import mobile from '../../images/mobile.png';
import UserAllOrderCard from './UserAllOrderCard';
const UserAllOrderItem = ({ orderItem }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="user-order mt-2 w-100">
      <Row className="d-flex justify-content-between align-items-center py-2">
        <Col xs="6">
          <div className="order-title mx-2">طلب رقم #{orderItem._id || 0}</div>
        </Col>
        <Col xs="6" className="text-end">
          <div className="order-date">
            تم بتاريخ {formatDate(orderItem.createdAt)}
          </div>
        </Col>
      </Row>
      {orderItem.products
        ? orderItem.products.map((item, index) => {
            return <UserAllOrderCard key={index} item={item} />;
          })
        : null}

      <Row className="d-flex flex-row justify-content-between align-items-center mt-4">
        <Col xs="3" className="mb-2 text-end">
          <strong>التوصيل: </strong>
          <span
            className={orderItem.isDelivered ? 'text-success' : 'text-danger'}
          >
            {orderItem.isDelivered ? 'تم التوصيل' : 'لم يتم '}
          </span>
        </Col>

        <Col xs="3" className="mb-2 text-end">
          <strong>الدفع: </strong>
          <span className={orderItem.isPaid ? 'text-success' : 'text-danger'}>
            {orderItem.isPaid ? 'تم الدفع' : 'لم يتم '}
          </span>
        </Col>

        <Col xs="3" className="mb-2 text-end">
          <strong>طريقة الدفع: </strong>
          <span>
            {orderItem.paymentMethodType === 'cash' ? 'كاش' : 'بطاقة ائتمانية'}
          </span>
        </Col>

        <Col xs="3" className="text-end">
          <div className="fs-4 text-success">
            <strong>{orderItem.totalOrderPrice || 0} جنيه</strong>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserAllOrderItem;
