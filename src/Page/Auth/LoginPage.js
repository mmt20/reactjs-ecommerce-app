import React from 'react';
import { Container, Row, Col, Spinner, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginHook from './../../hook/auth/login-hook';
import { ToastContainer } from 'react-toastify';
import { ErrorMessage, Field, Formik } from 'formik';
import notify from '../../hook/useNotifaction';

const LoginPage = () => {
  const [loading, onSubmit, isPress, validationSchema] = LoginHook();

  return (
    <Container style={{ minHeight: '690px' }}>
      <Row className="py-5">
        <Col sm="12" className="py-5 d-flex flex-column ">
          <label className="mx-auto title-login">تسجيل الدخول</label>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, handleSubmit }) => (
              <Form
                className="d-flex flex-column align-items-center"
                onSubmit={handleSubmit}
              >
                <Field
                  name="email"
                  type="email"
                  placeholder="الايميل..."
                  className="user-input my-3 text-center mx-auto"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
                <Field
                  name="password"
                  type="password"
                  placeholder="كلمه السر..."
                  className="user-input text-center mx-auto"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
                <button
                  type="submit"
                  className="btn-login mx-auto mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'جاري التسجيل...' : 'تسجيل الدخول'}
                </button>
                {isPress && loading && (
                  <Spinner
                    className="mt-4"
                    animation="border"
                    role="status"
                  ></Spinner>
                )}
              </Form>
            )}
          </Formik>

          <label className="mx-auto my-4 ">
            ليس لديك حساب ؟
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <span style={{ cursor: 'pointer' }} className="text-danger px-2">
                اضغط هنا
              </span>
            </Link>
          </label>

          <label className="mx-auto my-4">
            <Link
              to="/user/forget-password"
              style={{ textDecoration: 'none', color: 'red' }}
            >
              هل نسيت كلمه السر
            </Link>
          </label>
        </Col>
      </Row>

      <ToastContainer />
    </Container>
  );
};

export default LoginPage;
