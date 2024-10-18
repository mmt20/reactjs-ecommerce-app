import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCoupon, getAllCoupon } from '../../redux/actions/couponAction';
import notify from './../useNotifaction';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const AddCouponHook = () => {
  const dispatch = useDispatch();

  // Yup schema for form validation
  const validationSchema = Yup.object({
    coupnName: Yup.string().required('اسم الكوبون مطلوب'),
    couponDate: Yup.string().required('تاريخ الانتهاء مطلوب'),
    couponValue: Yup.number()
      .required('نسبة الخصم مطلوبة')
      .min(1, 'نسبة الخصم يجب ان تكون اكبر من 0'),
  });

  // Formik for handling form state and submission
  const formik = useFormik({
    initialValues: {
      coupnName: '',
      couponDate: '',
      couponValue: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const { coupnName, couponDate, couponValue } = values;

      await dispatch(
        addCoupon({
          name: coupnName,
          expire: couponDate,
          discount: couponValue,
        })
      );
    },
  });

  const res = useSelector((state) => state.couponReducer.addCoupon);
  const allCoupon = useSelector((state) => state.couponReducer.allCoupon);

  useEffect(() => {
    if (res) {
      if (res.status === 201) {
        notify('تمت اضافة الكوبون بنجاح', 'success');
        window.location.reload(false);
      } else if (res.status === 400) {
        notify('هذا الكوبون موجود من قبل', 'error');
      } else if (res.status === 403) {
        notify('انت غير مسموح لك بالاضافة', 'error');
      }
    }
  }, [res]);

  useEffect(() => {
    const get = async () => {
      await dispatch(getAllCoupon());
    };
    get();
  }, [dispatch]);

  let coupons = [];
  try {
    if (allCoupon && allCoupon.data.length >= 1) coupons = allCoupon.data;
  } catch (e) {}

  return {
    formik,
    coupons,
  };
};

export default AddCouponHook;
