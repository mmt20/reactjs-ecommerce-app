import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOneProduct,
  getProductLike,
} from '../../redux/actions/productsAction';
import mobile from '../../images/mobile.png';

const ViewProductsDetalisHook = (prodID) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneProduct(prodID));
    // if (item) dispatch(getOneCategory(item.category));
  }, [dispatch, prodID]);

  const oneProducts = useSelector((state) => state.allproducts.oneProduct);
  const productLike = useSelector((state) => state.allproducts.productLike);

  //to show products item
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let item = [];
  if (oneProducts.data) {
    item = oneProducts.data;
  } else item = [];

  useEffect(() => {
    if (item.category) dispatch(getProductLike(item.category._id));
  }, [dispatch, item]);

  // to view image gallery
  let images = [];
  if (item.images) {
    images = item.images.map((img) => ({
      original: img,
    }));
  } else images = [{ original: `${mobile}` }];

  let prod = [];
  if (productLike && productLike.data) {
    prod = productLike.data.slice(0, 4);
  } else prod = [];

  return { item, images, prod };
};

export default ViewProductsDetalisHook;
