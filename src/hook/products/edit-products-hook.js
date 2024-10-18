import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../redux/actions/categoryAction';
import { getAllBrand } from '../../redux/actions/brandAction';
import { getOneCategory } from '../../redux/actions/subcategoryAction';
import {
  getOneProduct,
  updateProducts,
} from '../../redux/actions/productsAction';
import notify from '../../hook/useNotifaction';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AdminEditProductsHook = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      await dispatch(getOneProduct(id));
      await dispatch(getAllCategory());
      await dispatch(getAllBrand());
    };
    getData();
  }, [dispatch, id]);

  const item = useSelector((state) => state.allproducts.oneProduct);
  const category = useSelector((state) => state.allCategory.category);
  const brand = useSelector((state) => state.allBrand.brand);
  const subCat = useSelector((state) => state.subCategory.subcategory);

  const [options, setOptions] = useState([]);
  const [images, setImages] = useState([]);
  const [colors, setColors] = useState([]);
  const [showColor, setShowColor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSubID, setSelectedSubID] = useState([]);
  const [resetMultiselect, setResetMultiselect] = useState(false);

  const convertImageToFile = async (image) => {
    if (image.length <= 1000) {
      return await convertURLtoFile(image);
    } else {
      return dataURLtoFile(image, `${Math.random()}.png`);
    }
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  //convert url to file
  const convertURLtoFile = async (url) => {
    const response = await fetch(url, { mode: 'cors' });
    const data = await response.blob();
    const ext = url.split('.').pop();
    const filename = url.split('/').pop();
    const metadata = { type: `image/${ext}` };
    return new File([data], Math.random(), metadata);
  };

  const validationSchema = Yup.object({
    prodName: Yup.string().required('اسم المنتج مطلوب'),
    prodDescription: Yup.string().required('وصف المنتج مطلوب'),
    priceBefore: Yup.number()
      .positive('يجب أن يكون السعر موجبًا')
      .required('السعر قبل الخصم مطلوب'),
    priceAfter: Yup.number()
      .positive('يجب أن يكون السعر موجبًا')
      .max(
        Yup.ref('priceBefore'),
        'يجب أن يكون السعر بعد الخصم أقل من أو يساوي السعر قبل الخصم'
      ),
    qty: Yup.number()
      .integer('يجب أن تكون الكمية عددًا صحيحًا')
      .min(0, 'يجب أن تكون الكمية 0 على الأقل')
      .required('الكمية المتاحة مطلوبة'),
    catID: Yup.string().required('التصنيف الرئيسي مطلوب'),
  });

  const formik = useFormik({
    initialValues: {
      prodName: '',
      prodDescription: '',
      priceBefore: '',
      priceAfter: '',
      qty: '',
      catID: '0',
      brandID: '0',
    },
    validationSchema,
    onSubmit: async (values) => {
      if (images.length <= 0) {
        notify('من فضلك أضف صورة واحدة على الأقل', 'warn');
        return;
      }
      let imgCover;
      if (images[0].length <= 1000) {
        convertURLtoFile(images[0]).then((val) => (imgCover = val));
      } else {
        imgCover = dataURLtoFile(images[0], Math.random() + '.png');
      }

      let itemImages = [];
      //convert array of base64 images to files
      Array.from(Array(Object.keys(images).length).keys()).forEach(
        (item, index) => {
          if (images[index].length <= 1000) {
            convertURLtoFile(images[index]).then((val) => itemImages.push(val));
          } else {
            itemImages.push(
              dataURLtoFile(images[index], Math.random() + '.png')
            );
          }
        }
      );

      const formData = new FormData();
      formData.append('title', values.prodName);
      formData.append('description', values.prodDescription);
      formData.append('quantity', values.qty);
      formData.append('price', values.priceBefore);
      formData.append('priceAfterDiscount', values.priceAfter);
      formData.append('category', values.catID);
      formData.append('brand', values.brandID);

      colors.forEach((color) => formData.append('availableColors', color));

      selectedSubID.forEach((item) =>
        formData.append('subcategories', item._id)
      );

      // Add images
      setTimeout(() => {
        formData.append('imageCover', images[0]);
        images.forEach((item) => formData.append('images', item));
      }, 1000);

      setTimeout(async () => {
        setLoading(true);
        await dispatch(updateProducts(id, formData));
        setLoading(false);
      }, 1000);
    },
  });

  const resetForm = () => {
    formik.resetForm();
    setColors([]);
    setImages([]);
    setSelectedSubID([]);
    setResetMultiselect(!resetMultiselect);
  };

  const onSelectCategory = async (e) => {
    const categoryId = e.target.value;
    if (categoryId !== '0') {
      await dispatch(getOneCategory(categoryId));
      formik.setFieldValue('catID', categoryId);
    } else {
      formik.setFieldValue('catID', '');
    }
  };
  useEffect(() => {
    if (subCat && subCat.data) {
      setOptions(subCat.data);
    }
  }, [subCat]);
  const onSelectBrand = (e) => {
    formik.setFieldValue('brandID', e.target.value);
  };

  const handelChangeComplete = (color) => {
    if (!colors.includes(color.hex)) {
      setColors([...colors, color.hex]);
    }
    setShowColor(false);
  };

  const removeColor = (color) => {
    setColors(colors.filter((item) => item !== color));
  };

  const onSelect = (selectedList) => {
    setSelectedSubID(selectedList);
  };

  const onRemove = (selectedList) => {
    setSelectedSubID(selectedList);
  };

  const onChangeColor = () => {
    setShowColor(!showColor);
  };

  useEffect(() => {
    if (item && item.data) {
      formik.setValues({
        prodName: item.data.title || '',
        prodDescription: item.data.description || '',
        priceBefore: item.data.price || '',
        priceAfter: item.data.priceAfterDiscount || '',
        qty: item.data.quantity || '',
      });
      if (item.data.category) {
        formik.setFieldValue('catID', item.data.category._id || '');
      }
      if (item.data.brand) {
        formik.setFieldValue('brandID', item.data.brand._id || '');
      }
      setImages(item.data.images);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  //get created meesage
  const product = useSelector((state) => state.allproducts.updateProducts);

  useEffect(() => {
    if (loading === false) {
      resetForm();
      setResetMultiselect(!resetMultiselect);
      setTimeout(() => setLoading(true), 1500);

      if (product) {
        if (product.status === 200) {
          notify('تم التعديل بنجاح', 'success');
        } else {
          notify('هناك مشكله', 'error');
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  return {
    formik,
    onChangeColor,
    showColor,
    category,
    brand,
    images,
    setImages,
    onSelect,
    onRemove,
    options,
    handelChangeComplete,
    removeColor,
    onSelectCategory,
    onSelectBrand,
    colors,
    loading,
    resetMultiselect,
  };
};

export default AdminEditProductsHook;
