import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import DeleteCartHook from './../../hook/cart/delete-cart-hook';
import ApplayCouponHook from './../../hook/cart/applay-coupon-hook';
import { ToastContainer, toast } from 'react-toastify';

const CartCheckout = ({
  totalCartPrice,
  totalCartPriceAfterDiscount,
  couponNameRes,
  cartItems,
}) => {
  const { handelDeleteCart } = DeleteCartHook();
  const { couponName, onChangeCoupon, handelSubmitCoupon, handelCheckout } =
    ApplayCouponHook(cartItems);
  useEffect(() => {
    if (couponNameRes) {
      onChangeCoupon(couponNameRes);
    }
  }, [couponNameRes]);

  return (
    <Row className="my-1 d-flex justify-content-center cart-checkout pt-3">
      <Col xs="12" className="d-flex  flex-column  ">
        <div className="d-flex  ">
          <input
            value={couponName}
            onChange={(e) => onChangeCoupon(e.target.value)}
            className="copon-input d-inline text-center "
            placeholder="كود الخصم"
          />
          <button onClick={handelSubmitCoupon} className="copon-btn d-inline ">
            تطبيق
          </button>
        </div>
        <div className="product-price d-inline w-100 my-3  border">
          {totalCartPriceAfterDiscount >= 1
            ? `${totalCartPrice} جنيه ... بعد الخصم ${totalCartPriceAfterDiscount} `
            : `${totalCartPrice} جنيه`}
        </div>

        <button
          onClick={handelCheckout}
          className="product-cart-add w-100 px-2  d-inline"
        >
          اتمام الشراء
        </button>

        <button
          onClick={handelDeleteCart}
          className="product-cart-add w-100 px-2 my-1"
        >
          مسح العربة
        </button>
      </Col>
      <ToastContainer />
    </Row>
  );
};

export default CartCheckout;
