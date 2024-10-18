import { useEffect, useState } from 'react';
import { createSubCategory } from '../../redux/actions/subcategoryAction';
import { useSelector, useDispatch } from 'react-redux';
import notify from '../../hook/useNotifaction';
import { getAllCategory } from '../../redux/actions/categoryAction';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddSubcategoryHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!navigator.onLine) {
      notify('هناك مشكله في الاتصال بالانترنت', 'warn');
      return;
    }
    dispatch(getAllCategory(100));
  }, [dispatch]);

  const [loading, setLoading] = useState(false);
  const [isPress, setPress] = useState(false);

  // Get last category state from redux
  const category = useSelector((state) => state.allCategory.category);

  // Get last subcategory state from redux
  const subcategory = useSelector((state) => state.subCategory.subcategory);

  // Formik form management
  const formik = useFormik({
    initialValues: {
      name: '',
      category: '0',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('فضلك ادخل اسم التصنيف'),
      category: Yup.string().required('من فضلك اختر تصنيف رئيسي'),
    }),
    onSubmit: async (values) => {
      if (!navigator.onLine) {
        notify('هناك مشكله في الاتصال بالانترنت', 'warn');
        return;
      }
      setLoading(true);
      setPress(true);
      await dispatch(
        createSubCategory({
          name: values.name,
          category: values.category,
        })
      );
      setLoading(false);
    },
  });

  useEffect(() => {
    if (!loading && isPress) {
      formik.resetForm();
      if (subcategory.status === 201) {
        notify('تمت الاضافه بنجاح', 'success');
      } else if (subcategory.status === 400) {
        notify('هذا الاسم مكرر من فضلك اختر اسم اخر', 'warn');
      } else {
        notify('هناك مشكله في عملية الاضافه', 'warn');
      }
      setPress(false);
    }
  }, [loading, subcategory.status, isPress, formik]);

  return {
    formik,
    loading,
    isPress,
    category,
    subcategory,
  };
};

export default AddSubcategoryHook;
