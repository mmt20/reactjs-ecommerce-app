import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'yup-phone-lite';
import EditAddressHook from './../../hook/user/edit-address-hook';
import { ToastContainer } from 'react-toastify';

const UserEditAddress = () => {
  const { id } = useParams();
  const { handelEdit, alias, detalis, phone } = EditAddressHook(id);

  const initialValues = {
    alias: alias,
    detalis: detalis,
    phone: phone,
  };

  const validationSchema = Yup.object({
    alias: Yup.string().required('تسمية العنوان مطلوبه'),
    detalis: Yup.string().required('تفاصيل العنوان مطلوبه '),
    phone: Yup.string()
      .required('رقم الهاتف مطلوب')
      .phone('EG', ' ادخل رقم مصري '),
  });

  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-2">تعديل العنوان </div>
        <Col sm="8">
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handelEdit(values.alias, values.detalis, values.phone);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  name="alias"
                  type="text"
                  className="input-form d-block mt-3 px-3"
                  placeholder="تسمية العنوان مثلا(المنزل - العمل)"
                />
                <ErrorMessage
                  name="alias"
                  component="div"
                  className="text-danger"
                />

                <Field
                  as="textarea"
                  name="detalis"
                  className="input-form-area p-2 mt-3"
                  rows="4"
                  cols="50"
                  placeholder="العنوان بالتفصيل"
                />
                <ErrorMessage
                  name="detalis"
                  component="div"
                  className="text-danger"
                />

                <Field
                  name="phone"
                  type="text"
                  className="input-form d-block mt-3 px-3"
                  placeholder="رقم الهاتف"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-danger"
                />

                <Row>
                  <Col sm="8" className="d-flex justify-content-end ">
                    <button type="submit" className="btn-save d-inline mt-2 ">
                      حفظ تعديل العنوان
                    </button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default UserEditAddress;
