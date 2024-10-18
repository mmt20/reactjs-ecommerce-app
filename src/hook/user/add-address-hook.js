import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserAddress } from '../../redux/actions/userAddressesAction';
import notify from './../useNotifaction';
import { useNavigate } from 'react-router-dom';

const AddAddressHook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const onSubmit = async (alias, detalis, phone) => {
    if (alias === '' || detalis === '' || phone === '') {
      notify('من فضلك اكمل البيانات', 'warn');
      return;
    }
    setLoading(true);
    await dispatch(
      addUserAddress({
        alias: alias,
        details: detalis,
        phone: phone,
        city: '',
        postalCode: '',
      })
    );
    setLoading(false);
  };

  const res = useSelector((state) => state.userAddressesReducer.addUserAddress);

  useEffect(() => {
    if (loading === false) {
      if (res && res.status === 200) {
        notify('تمت اضافة العنوان بنجاح', 'success');
        setTimeout(() => {
          navigate('/user/addresses');
        }, 1000);
      } else {
        notify('هناك مشكله فى عملية الاضافة ', 'error');
      }
    }
  }, [loading]);

  return [onSubmit];
};

export default AddAddressHook;
