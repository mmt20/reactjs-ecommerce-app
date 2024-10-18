import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNewUser } from '../../redux/actions/authAction';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import notify from './../useNotifaction';

const RegisterHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const res = useSelector((state) => state.authReducer.createUser);

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('من فضلك ادخل اسم المستخدم'),
    email: Yup.string()
      .email('الايميل غير صحيح')
      .required('من فضلك ادخل الايميل'),
    phone: Yup.string()
      .matches(/^[0-9]{11}$/, 'يجب ان يكون الرقم مصري مكون من 11 رقم')
      .required('من فضلك ادخل رقم الهاتف'),
    password: Yup.string()
      .min(6, 'يجب ان لا تقل كلمه السر عن 6 احرف او ارقام')
      .required('من فضلك ادخل كلمه السر'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'من فضلك تاكيد من كلمه السر')
      .required('من فضلك ادخل تاكيد كلمه السر'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    await dispatch(
      createNewUser({
        name: values.name,
        email: values.email,
        password: values.password,
        passwordConfirm: values.confirmPassword,
        phone: values.phone,
      })
    );
    setSubmitting(false);

    if (res && res.data && res.data.token) {
      localStorage.setItem('token', res.data.token);
      notify('تم تسجيل الحساب بنجاح', 'success');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else if (res && res.data && res.data.errors) {
      res.data.errors.forEach((error) => {
        if (error.msg === 'E-mail already in use') {
          notify('هذا الايميل مسجل من قبل', 'error');
        } else if (error.msg === 'accept only egypt phone numbers') {
          notify('يجب ان يكون الرقم مصري مكون من 11 رقم', 'error');
        } else if (error.msg === 'must be at least 6 chars') {
          notify('يجب ان لا تقل كلمه السر عن 6 احرف او ارقام', 'error');
        }
      });
    }
  };

  return {
    initialValues,
    validationSchema,
    onSubmit,
  };
};

export default RegisterHook;
