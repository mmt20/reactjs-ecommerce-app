import React from 'react';
import { Row, Col } from 'react-bootstrap';
import add from '../../images/add.png';
import Multiselect from 'multiselect-react-dropdown';
import MultiImageInput from 'react-multiple-image-input';
import { CompactPicker } from 'react-color';
import { ToastContainer } from 'react-toastify';
import AdminEditProductsHook from '../../hook/products/edit-products-hook';
import { useParams } from 'react-router-dom';

const AdminEditProducts = () => {
  const { id } = useParams();
  const {
    formik,
    onChangeColor,
    showColor,
    category,
    brand,
    images,
    setImages,
    onSelect,
    onRemove,
    options,
    handelChangeComplete,
    removeColor,
    onSelectCategory,
    onSelectBrand,
    colors,
    loading,
    resetMultiselect,
  } = AdminEditProductsHook(id);

  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4">تعديل منتج</div>
        <Col sm="8">
          <form onSubmit={formik.handleSubmit}>
            <div className="text-form pb-2">صور للمنتج</div>
            <MultiImageInput
              images={images}
              setImages={setImages}
              theme={'light'}
              allowCrop={false}
              max={6}
            />
            <input
              name="prodName"
              type="text"
              className="input-form d-block mt-3 px-3"
              placeholder="اسم المنتج"
              onChange={formik.handleChange}
              value={formik.values.prodName}
            />
            {formik.errors.prodName && formik.touched.prodName && (
              <div className="text-danger">{formik.errors.prodName}</div>
            )}

            <textarea
              name="prodDescription"
              className="input-form-area p-2 mt-3"
              rows="4"
              cols="50"
              placeholder="وصف المنتج"
              onChange={formik.handleChange}
              value={formik.values.prodDescription}
            />
            {formik.errors.prodDescription &&
              formik.touched.prodDescription && (
                <div className="text-danger">
                  {formik.errors.prodDescription}
                </div>
              )}

            <input
              name="priceBefore"
              type="number"
              className="input-form d-block mt-3 px-3"
              placeholder="السعر قبل الخصم"
              onChange={formik.handleChange}
              value={formik.values.priceBefore}
            />
            {formik.errors.priceBefore && formik.touched.priceBefore && (
              <div className="text-danger">{formik.errors.priceBefore}</div>
            )}

            <input
              name="priceAfter"
              type="number"
              className="input-form d-block mt-3 px-3"
              placeholder="السعر بعد الخصم"
              onChange={formik.handleChange}
              value={formik.values.priceAfter}
            />
            {formik.errors.priceAfter && formik.touched.priceAfter && (
              <div className="text-danger">{formik.errors.priceAfter}</div>
            )}

            <input
              name="qty"
              type="number"
              className="input-form d-block mt-3 px-3"
              placeholder="الكمية المتاحة"
              onChange={formik.handleChange}
              value={formik.values.qty}
            />
            {formik.errors.qty && formik.touched.qty && (
              <div className="text-danger">{formik.errors.qty}</div>
            )}

            <select
              name="catID"
              className="select input-form-area mt-3 px-2"
              onChange={(e) => {
                onSelectCategory(e);
                formik.handleChange(e);
              }}
              value={formik.values.catID}
            >
              <option value="0">اختر تصنيف رئيسى</option>
              {category.data?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
            {formik.errors.catID && formik.touched.catID && (
              <div className="text-danger">{formik.errors.catID}</div>
            )}

            <Multiselect
              className="mt-2 text-end"
              placeholder="التصنيف الفرعي"
              options={options}
              onSelect={onSelect}
              onRemove={onRemove}
              displayValue="name"
              resetSelectedValues={resetMultiselect}
              style={{
                chips: { background: '#272727' },
                searchBox: {
                  border: 'none',
                  'border-bottom': '1px solid #ccc',
                  borderRadius: '0px',
                },
                optionContainer: { background: '#272727' },
                option: { color: '#fff', background: '#272727' },
              }}
            />

            <select
              name="brandID"
              className="select input-form-area mt-3 px-2"
              onChange={(e) => {
                onSelectBrand(e);
                formik.handleChange(e);
              }}
              value={formik.values.brandID}
            >
              <option value="0">اختر ماركة</option>
              {brand.data?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
            {formik.errors.brandID && formik.touched.brandID && (
              <div className="text-danger">{formik.errors.brandID}</div>
            )}

            <div className="text-form mt-3">الالوان المتاحه للمنتج</div>
            <div className="mt-1 d-flex">
              {colors.map((color, index) => (
                <div
                  key={index}
                  onClick={() => removeColor(color)}
                  className="color ms-2 border mt-1"
                  style={{ backgroundColor: color, cursor: 'pointer' }}
                ></div>
              ))}

              <img
                onClick={onChangeColor}
                src={add}
                alt="Add color"
                width="30px"
                height="35px"
                style={{ cursor: 'pointer' }}
              />
              {showColor && (
                <CompactPicker onChangeComplete={handelChangeComplete} />
              )}
            </div>

            <button
              type="submit"
              className="btn-save d-inline mt-2"
              disabled={formik.isSubmitting}
            >
              حفظ التعديلات
            </button>
          </form>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default AdminEditProducts;
