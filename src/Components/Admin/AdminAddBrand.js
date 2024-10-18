import React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddBrandHook from '../../hook/brand/add-brand-hook';

const AdminAddBrand = () => {
  const { formik, img, loading, isPress, onImageChange } = AddBrandHook();

  return (
    <div>
      <Row className="justify-content-start">
        <div className="admin-content-text pb-4">اضافة ماركة جديدة</div>
        <Col sm="8">
          <form onSubmit={formik.handleSubmit}>
            <div className="text-form pb-2">صورة الماركة</div>
            <div>
              <label htmlFor="upload-photo">
                <img
                  src={img}
                  alt="brand"
                  height="100px"
                  width="120px"
                  style={{ cursor: 'pointer' }}
                />
                <input
                  type="file"
                  name="image"
                  id="upload-photo"
                  hidden
                  onChange={onImageChange}
                  accept="image/*"
                />
              </label>
              {formik.touched.image && formik.errors.image ? (
                <div className="text-danger">{formik.errors.image}</div>
              ) : null}
            </div>
            <input
              type="text"
              className="input-form d-block mt-3 px-3"
              placeholder="اسم الماركة"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-danger">{formik.errors.name}</div>
            ) : null}
            <Col className="d-flex justify-content-end">
              <button
                type="submit"
                className="btn-save d-inline mt-2"
                disabled={loading}
              >
                {loading ? 'جاري الحفظ...' : 'حفظ التعديلات'}
              </button>
            </Col>
          </form>
        </Col>
      </Row>
      {isPress ? (
        loading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <h4>تم الانتهاء</h4>
        )
      ) : null}
      <ToastContainer />
    </div>
  );
};

export default AdminAddBrand;
