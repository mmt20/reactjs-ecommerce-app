import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBrand } from '../../redux/actions/brandAction';
import notify from '../../hook/useNotifaction';
import avatar from '../../images/avatar.png';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddBrandHook = () => {
  const dispatch = useDispatch();
  const [img, setImg] = useState(avatar);
  const [loading, setLoading] = useState(false);
  const [isPress, setIsPress] = useState(false);
  const res = useSelector((state) => state.allBrand.brand);

  const formik = useFormik({
    initialValues: {
      name: '',
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('اسم الماركة مطلوب'),
      image: Yup.mixed().required('صورة الماركة مطلوبة'),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('image', values.image);
      setLoading(true);
      setIsPress(true);
      await dispatch(createBrand(formData));
      setLoading(false);
    },
  });

  useEffect(() => {
    if (!loading && isPress) {
      if (res.status === 201) {
        notify('تمت عملية الاضافة بنجاح', 'success');
        formik.resetForm();
        setImg(avatar);
      } else {
        notify('هناك مشكله فى عملية الاضافة', 'error');
      }
      setIsPress(false);
    }
  }, [loading, isPress, res.status, formik]);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      formik.setFieldValue('image', file);
      setImg(URL.createObjectURL(file));
    }
  };

  return {
    formik,
    img,
    loading,
    isPress,
    onImageChange,
  };
};

export default AddBrandHook;
