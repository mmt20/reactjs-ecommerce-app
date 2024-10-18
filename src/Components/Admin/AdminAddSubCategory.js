import React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import AddSubcategoryHook from '../../hook/subcategory/add-subcategory-hook';

const AdminAddSubCategory = () => {
  const { formik, loading, isPress, category } = AddSubcategoryHook();

  return (
    <div>
      <Row className="justify-content-start">
        <div className="admin-content-text pb-4">اضافه تصنيف فرعى</div>
        <Col sm="8">
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              className="input-form d-block mt-3 px-3"
              placeholder="اسم التصنيف"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-danger">{formik.errors.name}</div>
            ) : null}
            <select
              name="category"
              id="cat"
              className="select mt-3 px-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
            >
              <option value="0">اختر تصنيف رئيسى</option>
              {category.data
                ? category.data.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))
                : null}
            </select>
            {formik.touched.category && formik.errors.category ? (
              <div className="text-danger">{formik.errors.category}</div>
            ) : null}
            <button
              type="submit"
              className="btn-save d-inline mt-2"
              disabled={loading}
            >
              {loading ? 'جاري الحفظ...' : 'حفظ التعديلات'}
            </button>
          </form>
        </Col>
      </Row>
      {isPress ? (
        loading ? (
          <Spinner animation="border" variant="dark" />
        ) : (
          <h4>تم الانتهاء</h4>
        )
      ) : null}
      <ToastContainer />
    </div>
  );
};

export default AdminAddSubCategory;
