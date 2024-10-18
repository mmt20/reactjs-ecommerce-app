import React, { useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import AddCouponHook from '../../hook/coupon/add-coupon-hook';
import AdminCoupnCard from './AdminCoupnCard';

const AdminAddCoupon = () => {
  const { formik, coupons } = AddCouponHook();
  const dateRef = useRef();

  return (
    <div>
      <Row className="justify-content-start">
        <div className="admin-content-text pb-4">اضف كوبون جديد</div>
        <Col sm="8">
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              className="input-form d-block mt-3 px-3"
              placeholder="اسم الكوبون"
              name="coupnName"
              value={formik.values.coupnName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.coupnName && formik.errors.coupnName ? (
              <div className="text-danger my-2">{formik.errors.coupnName}</div>
            ) : null}

            <input
              ref={dateRef}
              type="text"
              className="input-form d-block mt-3 px-3"
              placeholder="تاريخ الانتهاء"
              name="couponDate"
              value={formik.values.couponDate}
              onChange={formik.handleChange}
              onFocus={() => (dateRef.current.type = 'date')}
              onBlur={() => (dateRef.current.type = 'text')}
            />
            {formik.touched.couponDate && formik.errors.couponDate ? (
              <div className="text-danger  my-2">
                {formik.errors.couponDate}
              </div>
            ) : null}

            <input
              type="number"
              className="input-form d-block mt-3 px-3"
              placeholder="نسبة خصم الكوبون"
              name="couponValue"
              value={formik.values.couponValue}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.couponValue && formik.errors.couponValue ? (
              <div className="text-danger  my-2">
                {formik.errors.couponValue}
              </div>
            ) : null}

            <button type="submit" className="btn-save d-inline mt-2">
              حفظ الكوبون
            </button>
          </form>
        </Col>
      </Row>

      <Row>
        <Col sm="8">
          {coupons ? (
            coupons.map((item, index) => {
              return <AdminCoupnCard key={index} coupon={item} />;
            })
          ) : (
            <h6>لا يوجد كوبونات حتى الان</h6>
          )}
        </Col>
      </Row>

      <ToastContainer />
    </div>
  );
};

export default AdminAddCoupon;
