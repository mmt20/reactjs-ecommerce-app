import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/actions/authAction';
import { useState, useEffect } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import notify from './../useNotifaction';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('الايميل غير صحيح').required('الايميل مطلوب'),
  password: Yup.string()
    .required('كلمة السر مطلوبة')
    .min(6, 'كلمة السر يجب أن تكون 6 أحرف على الأقل'),
});

const LoginHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);

  const onSubmit = async (values, { setSubmitting }) => {
    setIsPress(true);
    setLoading(true);
    await dispatch(loginUser(values));
    setLoading(false);
    setIsPress(false);
    setSubmitting(false);
  };

  const res = useSelector((state) => state.authReducer.loginUser);

  useEffect(() => {
    if (loading === false) {
      if (res) {
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.data));
          notify('تم تسجيل الدخول بنجاح', 'success');
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }

        if (res.data.message === 'Incorrect email or password') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          notify('كلمة السر او الايميل خطا', 'error');
        }
        setLoading(true);
      }
    }
  }, [loading, res]);

  return [loading, onSubmit, isPress, validationSchema];
};

export default LoginHook;
