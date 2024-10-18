import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { createCashOrder } from '../../redux/actions/checkoutAction';
import { getOneUserAddress } from '../../redux/actions/userAddressesAction';
import notify from '../useNotifaction';
import GetAllUserCartHook from './../cart/get-all-user-cart-hook';

const OrderPayCashHook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [loadingCreate, setLoadingCreate] = useState(true);
  const [addressDetalis, setAddressDetalis] = useState([]);

  const { cartID } = GetAllUserCartHook();

  //when change address bu user
  const handelChooseAddress = (e) => {
    setAddressDetalis([]);
    if (e.target.value !== '0') get(e.target.value);
  };

  const get = async (id) => {
    setLoading(true);
    await dispatch(getOneUserAddress(id));
    setLoading(false);
  };

  //get address detalis for user
  const resAddress = useSelector(
    (state) => state.userAddressesReducer.oneAddress
  );

  useEffect(() => {
    if (loading === false) {
      if (resAddress && resAddress.status === 'success') {
        setAddressDetalis(resAddress.data);
      } else setAddressDetalis([]);
    }
  }, [loading]);

  //when user click
  const handelCreateCashOrder = async () => {
    if (cartID === 0) {
      notify('من فضلك اضف منتجات الى العربه اولا', 'warn');
      return;
    }
    if (addressDetalis.length <= 0) {
      notify('من فضلك اختر عنوان اولا', 'warn');
      return;
    }
    setLoadingCreate(true);
    await dispatch(
      createCashOrder(cartID, {
        shippingAddress: {
          details: addressDetalis.alias,
          phone: addressDetalis.phone,
          city: '',
          postalCode: '',
        },
      })
    );
    setLoadingCreate(false);
  };

  //get response for create orser cash
  const resCashOrser = useSelector(
    (state) => state.checkoutReducer.createCashOrder
  );

  useEffect(() => {
    if (loadingCreate === false) {
      if (resCashOrser && resCashOrser.status === 201) {
        notify('تم انشاء طلبك بنجاح', 'success');
        setTimeout(() => {
          navigate('/user/allorders');
        }, 1500);
      } else {
        notify('فشل فى اكمال الطلب من فضلك حاول مره اخرى', 'warn');
      }
    }
  }, [loadingCreate]);

  return { handelChooseAddress, addressDetalis, handelCreateCashOrder };
};

export default OrderPayCashHook;
