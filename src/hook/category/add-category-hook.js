import { useState, useEffect } from 'react';
import avatar from '../../images/avatar.png';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../../redux/actions/categoryAction';
import notify from '../../hook/useNotifaction';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddCategoryHook = () => {
  const dispatch = useDispatch();
  const [img, setImg] = useState(avatar);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPress, setPress] = useState(false);

  const res = useSelector((state) => state.allCategory.category);

  // Formik form management
  const formik = useFormik({
    initialValues: {
      name: '',
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('اسم التصنيف مطلوب'),
      image: Yup.mixed().required('صورة التصنيف مطلوبة'),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('image', selectedFile);

      setLoading(true);
      setPress(true);
      await dispatch(createCategory(formData));
      setLoading(false);
    },
  });

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImg(URL.createObjectURL(e.target.files[0]));
      formik.setFieldValue('image', e.target.files[0]);
      setSelectedFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (!loading && isPress) {
      if (res.status === 201) {
        notify('تمت عملية الاضافه بنجاح', 'success');
        formik.resetForm();
        setImg(avatar);
        setSelectedFile(null);
      } else {
        notify('هناك مشكله في عملية الاضافه', 'error');
      }
      setPress(false);
    }
  }, [loading, res.status, isPress, formik]);

  return { formik, img, loading, isPress, onImageChange };
};

export default AddCategoryHook;
