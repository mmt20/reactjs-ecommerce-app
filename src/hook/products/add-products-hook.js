import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getAllCategory } from '../../redux/actions/categoryAction';
import { getOneCategory } from '../../redux/actions/subcategoryAction';
import notify from './../../hook/useNotifaction';
import { getAllBrand } from '../../redux/actions/brandAction';
import { createProduct } from '../../redux/actions/productsAction';

const useAdminAddProductsHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isPress, setIsPress] = useState(false);

  // values images products
  const [images, setImages] = useState({});
  const [colors, setColors] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);

  function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const categories = useSelector((state) => state.allCategory.category);
  const brands = useSelector((state) => state.allBrand.brand);
  const subCategories = useSelector((state) => state.subCategory.subcategory);
  const product = useSelector((state) => state.allproducts.products);

  const initialValues = {
    prodName: '',
    prodDescription: '',
    priceBefore: '',
    priceAfter: '',
    qty: '',
    catID: '',
    brandID: '',
    subCatID: [],
  };

  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllBrand());
  }, [dispatch]);

  const validationSchema = Yup.object({
    prodName: Yup.string().required('اسم المنتج مطلوب'),
    prodDescription: Yup.string().required('وصف المنتج مطلوب'),
    priceBefore: Yup.number()
      .positive('يجب أن يكون السعر موجبًا')
      .required('السعر قبل الخصم مطلوب'),
    priceAfter: Yup.number()
      .positive('يجب أن يكون السعر موجبًا')
      .max(Yup.ref('priceBefore'), 'السعر بعد الخصم أقل من السعر قبل الخصم')
      .required('السعر بعد الخصم مطلوب'),
    qty: Yup.number()
      .integer('يجب أن تكون الكمية عددًا صحيحًا')
      .min(1, 'يجب أن تكون الكمية أكبر من 0')
      .required('الكمية المتاحة مطلوبة'),
    catID: Yup.string().required('التصنيف مطلوب'),
    brandID: Yup.string().required('الماركة مطلوبة'),
    images: Yup.array().min(1, 'أضف صورة واحدة على الأقل'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();

      const imgCover = dataURLtoFile(images[0], Math.random() + '.png');
      const itemImages = Array.from(
        Array(Object.keys(images).length).keys()
      ).map((item, index) => {
        return dataURLtoFile(images[index], Math.random() + '.png');
      });

      formData.append('imageCover', imgCover);
      itemImages.forEach((item) => formData.append('images', item));

      Object.keys(values).forEach((key) => {
        if (key === 'subCatID') {
          values[key].forEach((subCat) =>
            formData.append('subcategories', subCat)
          );
        } else {
          formData.append(key, values[key]);
        }
      });

      colors.forEach((color) => formData.append('colors', color));

      setLoading(true);
      setIsPress(true);
      await dispatch(createProduct(formData));
      setLoading(false);
    },
  });

  const onSelectCategory = useCallback(
    async (e) => {
      const categoryID = e.target.value;

      formik.setFieldValue('catID', categoryID);
      formik.setFieldValue('subCatID', []);
      if (categoryID !== '0') {
        await dispatch(getOneCategory(categoryID));
      }
    },
    [formik, dispatch]
  );

  const handleSubCategoryChange = useCallback(
    (selectedList) => {
      const subCategoryIDs = selectedList.map((item) => item._id);
      formik.setFieldValue('subCatID', subCategoryIDs);
    },
    [formik]
  );

  const toggleColorPicker = useCallback(() => {
    setShowColorPicker((prev) => !prev);
  }, []);

  const handleColorChangeComplete = useCallback((color) => {
    setColors((prev) => [...prev, color.hex]);
    setShowColorPicker(false);
  }, []);

  const removeColor = useCallback((colorToRemove) => {
    setColors((prev) => prev.filter((color) => color !== colorToRemove));
  }, []);

  useEffect(() => {
    if (!loading && isPress) {
      setTimeout(() => setLoading(true), 1500);
      if (product && product.status) {
        if (product.status === 201) {
          setColors([]);
          setImages([]);
          formik.resetForm();
          notify('تم الاضافة بنجاح', 'success');
        } else {
          notify('هناك مشكله', 'error');
        }
      }
    }
  }, [loading, isPress, product, formik]);

  return {
    images,
    setImages,
    initialValues,
    validationSchema,
    formik,
    colors,
    removeColor,
    showColorPicker,
    toggleColorPicker,
    handleColorChangeComplete,
    categories,
    brands,
    subCategories,
    onSelectCategory,
    handleSubCategoryChange,
    loading,
    isPress,
  };
};

export default useAdminAddProductsHook;
