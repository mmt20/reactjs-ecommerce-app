import React from 'react';
import { Container, Row, Col, Form as BootstrapForm } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ToastContainer } from 'react-toastify';
import RegisterHook from '../../hook/auth/register-hook';

const RegisterPage = () => {
  const { initialValues, validationSchema, onSubmit } = RegisterHook();

  return (
    <Container style={{ minHeight: '680px' }}>
      <Row className="py-5 d-flex justify-content-center">
        <Col md={6} className="d-flex flex-column">
          <label className="mx-auto title-login">تسجيل حساب جديد</label>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="d-flex  flex-column justify-content-center p-2  ">
                <BootstrapForm.Group controlId="formName">
                  <Field
                    name="name"
                    placeholder="اسم المستخدم..."
                    type="text"
                    className="form-control mt-3 text-center"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="formEmail">
                  <Field
                    name="email"
                    placeholder="الايميل..."
                    type="email"
                    className="form-control my-3 text-center"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="formPhone">
                  <Field
                    name="phone"
                    placeholder="الهاتف..."
                    type="text"
                    className="form-control text-center"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="formPassword">
                  <Field
                    name="password"
                    placeholder="كلمه السر..."
                    type="password"
                    className="form-control text-center mt-3"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="formConfirmPassword">
                  <Field
                    name="confirmPassword"
                    placeholder="تاكيد كلمه السر..."
                    type="password"
                    className="form-control text-center mt-3"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-login mx-auto mt-4 "
                >
                  تسجيل الحساب
                </button>
              </Form>
            )}
          </Formik>
          <label className="mx-auto my-4">
            لديك حساب بالفعل؟{' '}
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <span style={{ cursor: 'pointer' }} className="text-danger">
                اضغط هنا
              </span>
            </Link>
          </label>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default RegisterPage;
