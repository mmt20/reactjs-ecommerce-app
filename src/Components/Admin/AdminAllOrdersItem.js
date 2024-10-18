import React from 'react';
import { Col, Row, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminAllOrdersItem = ({ orderItem }) => {
  return (
    <Col sm="12" className="my-3">
      <Card
        className="shadow-sm border-0 rounded-3"
        style={{ backgroundColor: '#fff' }}
      >
        <Link
          to={`/admin/orders/${orderItem._id}`}
          className="text-decoration-none"
        >
          <Card.Body className="p-3">
            <Row className="align-itemx-center">
              <Col sm="12" className="d-flex justify-content-between mb-2">
                <div
                  className="text-muted"
                  style={{ fontSize: '1rem', color: '#6c757d' }}
                >
                  طلب رقم
                  <span className="fw-bold mx-1 text-dark">
                    #{orderItem._id}
                  </span>
                </div>
              </Col>
            </Row>

            <Row className="align-itemx-center mb-2">
              <Col
                sm="12"
                className="d-flex flex-column flex-md-row justify-content-between"
              >
                <div
                  className="fw-bold text-dark"
                  style={{ fontSize: '1.05rem' }}
                >
                  طلب من.. {orderItem.user.name || 'غير معروف'}
                </div>
                <div
                  className="text-muted"
                  style={{ fontSize: '0.9rem', color: '#6c757d' }}
                >
                  {orderItem.user.email || 'غير متوفر'}
                </div>
              </Col>
            </Row>

            <Row className="d-flex justify-content-between">
              <Col xs="6" className="d-flex flex-column">
                <div className="mb-1">
                  <span className="fw-bold text-dark">التوصيل:</span>
                  <span
                    className={`mx-2 ${
                      orderItem.isDelivered ? 'text-success' : 'text-danger'
                    }`}
                  >
                    {orderItem.isDelivered ? 'تم التوصيل' : 'لم يتم'}
                  </span>
                </div>
                <div className="mb-1">
                  <span className="fw-bold text-dark">الدفع:</span>
                  <span
                    className={`mx-2 ${
                      orderItem.isPaid ? 'text-success' : 'text-danger'
                    }`}
                  >
                    {orderItem.isPaid ? 'تم الدفع' : 'لم يتم'}
                  </span>
                </div>
                <div className="mb-1">
                  <span className="fw-bold text-dark">طريقة الدفع:</span>
                  <span className="mx-2">
                    {orderItem.paymentMethodType === 'cash'
                      ? 'كاش'
                      : 'بطاقة ائتمانية'}
                  </span>
                </div>
              </Col>

              <Col
                xs="6"
                className="d-flex justify-content-end align-itemx-end"
              >
                <div className="text-end">
                  <span className="fw-bold text-dark">المبلغ الكلي:</span>
                  <div className="fs-5 text-primary">
                    {orderItem.totalOrderPrice || 0} جنية
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Link>
      </Card>
    </Col>
  );
};

export default AdminAllOrdersItem;
