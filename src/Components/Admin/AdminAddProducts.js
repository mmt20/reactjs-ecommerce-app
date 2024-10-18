import React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import add from '../../images/add.png';
import Multiselect from 'multiselect-react-dropdown';
import MultiImageInput from 'react-multiple-image-input';
import { CompactPicker } from 'react-color';
import { ToastContainer } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import useAdminAddProductsHook from '../../hook/products/add-products-hook'; // Ensure correct import

const AdminAddProducts = () => {
  const {
    images,
    setImages,
    initialValues,
    validationSchema,
    formik,
    colors,
    removeColor,
    showColorPicker,
    toggleColorPicker,
    handleColorChangeComplete,
    categories,
    brands,
    subCategories,
    onSelectCategory,
    handleSubCategoryChange,
    loading,
    isPress,
  } = useAdminAddProductsHook(); // Ensure correct hook usage

  return (
    <div>
      <Row className="justify-content-start">
        <div className="admin-content-text pb-4">إضافة منتج جديد</div>
        <Col sm="8">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={formik.handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="text-form pb-2">صور المنتج</div>
                <MultiImageInput
                  images={images}
                  setImages={setImages}
                  theme="light"
                  max={6}
                />
                <ErrorMessage
                  name="images"
                  component="div"
                  className="text-danger"
                />

                <Field
                  type="text"
                  name="prodName"
                  className="input-form d-block mt-3 px-3"
                  placeholder="اسم المنتج"
                />
                <ErrorMessage
                  name="prodName"
                  component="div"
                  className="text-danger"
                />

                <Field
                  as="textarea"
                  name="prodDescription"
                  className="input-form-area p-2 mt-3"
                  rows="4"
                  placeholder="وصف المنتج"
                />
                <ErrorMessage
                  name="prodDescription"
                  component="div"
                  className="text-danger"
                />

                <Field
                  type="number"
                  name="priceBefore"
                  className="input-form d-block mt-3 px-3"
                  placeholder="السعر قبل الخصم"
                />
                <ErrorMessage
                  name="priceBefore"
                  component="div"
                  className="text-danger"
                />

                <Field
                  type="number"
                  name="priceAfter"
                  className="input-form d-block mt-3 px-3"
                  placeholder="السعر بعد الخصم"
                />
                <ErrorMessage
                  name="priceAfter"
                  component="div"
                  className="text-danger"
                />

                <Field
                  type="number"
                  name="qty"
                  className="input-form d-block mt-3 px-3"
                  placeholder="الكمية المتاحة"
                />
                <ErrorMessage
                  name="qty"
                  component="div"
                  className="text-danger"
                />

                <Field
                  as="select"
                  name="catID"
                  className="select input-form-area mt-3 px-2"
                  onChange={(e) => {
                    setFieldValue('catID', e.target.value);
                    onSelectCategory(e);
                  }}
                >
                  <option value="">اختر تصنيف رئيسي</option>
                  {categories?.data?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="catID"
                  component="div"
                  className="text-danger"
                />

                {values.catID && subCategories?.data && (
                  <Multiselect
                    options={subCategories.data}
                    onSelect={(selectedList) =>
                      handleSubCategoryChange(selectedList, setFieldValue)
                    }
                    onRemove={(selectedList) =>
                      handleSubCategoryChange(selectedList, setFieldValue)
                    }
                    displayValue="name"
                    placeholder="التصنيف الفرعي"
                    selectedValues={values.subCatID}
                    className="mt-2 text-end"
                    style={{
                      chips: { background: '#272727' },
                      option: { color: '#fff' },
                    }}
                  />
                )}
                <ErrorMessage
                  name="subCatID"
                  component="div"
                  className="text-danger"
                />

                <Field
                  as="select"
                  name="brandID"
                  className="select input-form-area mt-3 px-2"
                >
                  <option value="">اختر ماركة</option>
                  {brands?.data?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="brandID"
                  component="div"
                  className="text-danger"
                />

                <div className="text-form mt-3">الألوان المتاحة</div>
                <div className="d-flex mt-1">
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      className="color ms-2 border mt-1"
                      style={{ backgroundColor: color, cursor: 'pointer' }}
                      onClick={() => removeColor(color)}
                    />
                  ))}
                  <img
                    onClick={toggleColorPicker}
                    src={add}
                    alt="Add color"
                    width="30px"
                    height="35px"
                    style={{ cursor: 'pointer' }}
                  />
                  {showColorPicker && (
                    <CompactPicker
                      onChangeComplete={handleColorChangeComplete}
                    />
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-save d-inline mt-2"
                  disabled={loading}
                >
                  {loading ? 'جاري الحفظ...' : 'حفظ التعديلات'}
                </button>
              </Form>
            )}
          </Formik>
          {isPress ? (
            loading ? (
              <Spinner animation="border" variant="primary" />
            ) : (
              <h4>تم الانتهاء</h4>
            )
          ) : null}
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default AdminAddProducts;
