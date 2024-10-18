import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductCardHook from '../../hook/products/product-card-hook';
import rate from '../../images/rate.png';

const ProductCard = ({ item, favProd }) => {
  const { handelFav, favImg } = ProductCardHook(item, favProd);

  return (
    <Col xs="6" sm="6" md="4" lg="3" className="d-flex">
      <Card
        className="my-3"
        style={{
          width: '100%',
          height: '345px',
          borderRadius: '12px',
          backgroundColor: '#F8F9FA',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s ease-in-out',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <Link to={`/products/${item._id}`} style={{ textDecoration: 'none' }}>
          <Card.Img
            style={{
              height: '228px',
              width: '100%',
              objectFit: 'cover',
              borderRadius: '12px 12px 0 0',
              transition: 'transform 0.2s ease-in-out',
            }}
            src={item.imageCover}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = 'scale(1.05)')
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </Link>
        <div className="d-flex justify-content-end mx-2 mt-2">
          <img
            src={favImg}
            alt="Favorite"
            onClick={handelFav}
            style={{
              height: '24px',
              width: '26px',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          />
        </div>
        <Card.Body>
          <Card.Title>
            <div
              className="card-title"
              style={{
                fontSize: '1.1rem',
                fontWeight: '500',
                color: '#343A40',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item.title}
            </div>
          </Card.Title>
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img src={rate} alt="Rating" height="16px" width="16px" />
                <div
                  className="card-rate mx-2"
                  style={{ fontSize: '0.9rem', color: '#6C757D' }}
                >
                  {item.ratingsQuantity}
                </div>
              </div>
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
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCard;
