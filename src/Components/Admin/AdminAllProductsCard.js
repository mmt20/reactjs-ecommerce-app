import React, { useState } from 'react';
import { Col, Card, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProducts } from '../../redux/actions/productsAction';
import { Trash, Pencil, StarFill } from 'react-bootstrap-icons';

const AdminAllProductsCard = ({ item }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteProducts(item._id));
    setShow(false);
    window.location.reload();
  };

  return (
    <Col xs={12} md={6} lg={4} className="mb-4">
      <Card className="h-100  shadow-sm">
        <Card.Header className="bg-transparent border-0 d-flex justify-content-between align-items-center">
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => setShow(true)}
          >
            <Trash size={16} />
          </Button>
          <Link
            to={`/admin/editproduct/${item._id}`}
            className="btn btn-outline-primary btn-sm"
          >
            <Pencil size={16} />
          </Link>
        </Card.Header>
        <Link to={`/products/${item._id}`} className="text-decoration-none">
          <Card.Img
            variant="top"
            src={item.imageCover}
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <Card.Body>
            <Card.Title className="text-truncate">{item.title}</Card.Title>
            <Card.Text className="d-flex justify-content-between align-items-center">
              <span className="d-flex align-items-center justify-content-center text-muted">
                <StarFill className="text-warning mx-1" />
                {item.ratingsQuantity}
              </span>
              <div className="d-flex align-items-center">
                <div
                  className="card-price"
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: '#007BFF',
                  }}
                >
                  {item.priceAfterDiscount >= 1 ? (
                    <div>
                      <span className="text-decoration-line-through me-2">
                        {item.price}
                      </span>
                      {item.priceAfterDiscount}
                    </div>
                  ) : (
                    item.price
                  )}
                </div>
                <div
                  className="card-currency mx-1"
                  style={{ fontSize: '0.9rem', color: '#6C757D' }}
                >
                  جنيه
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        </Link>
      </Card>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title className="font">تأكيد الحذف</Modal.Title>
        </Modal.Header>
        <Modal.Body className="font">
          هل أنت متأكد من عملية حذف المنتج؟
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShow(false)}
            className="font"
          >
            إلغاء
          </Button>
          <Button variant="danger" onClick={handleDelete} className="font">
            حذف
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

export default AdminAllProductsCard;
