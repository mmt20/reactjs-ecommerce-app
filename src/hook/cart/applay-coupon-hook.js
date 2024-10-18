import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import notify from '../../hook/useNotifaction';
import { applayCoupnCart } from '../../redux/actions/cartAction';
import { useNavigate } from 'react-router-dom';

const ApplayCouponHook = (cartItems) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [couponName, setCouponName] = useState('');
  const [loading, setLoading] = useState(true);

  const onChangeCoupon = (val) => {
    setCouponName(val);
  };
  const handelCheckout = () => {
    if (cartItems.length >= 1) {
      navigate('/order/paymethoud');
    } else {
      notify('اضف منتجات للعربه اولا', 'warn');
    }
  };
  const handelSubmitCoupon = async () => {
    if (couponName === '') {
      notify('من فضلك ادخل الكوبون', 'warn');
      return;
    }
    setLoading(true);
    await dispatch(
      applayCoupnCart({
        couponName: couponName,
      })
    );
    setLoading(false);
  };

  const res = useSelector((state) => state.cartReducer.applayCoupon);

  useEffect(() => {
    if (loading === false) {
      if (res && res.status === 200) {
        notify('تم تطبيق الكوبون بنجاح', 'success');
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else {
        notify('هذا الكوبون غير صحيح او منتهى الصلاحيه', 'warn');
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      }
    }
  }, [loading]);

  return { couponName, onChangeCoupon, handelSubmitCoupon, handelCheckout };
};

export default ApplayCouponHook;
