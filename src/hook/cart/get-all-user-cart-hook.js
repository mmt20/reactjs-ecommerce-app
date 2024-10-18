import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUserCartItems } from '../../redux/actions/cartAction';

const useGetAllUserCartHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [itemsNum, setItemsNum] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [couponNameRes, setCouponName] = useState('');
  const [cartID, setCartID] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [totalCartPriceAfterDiscount, setTotalCartPriceAfterDiscount] =
    useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      await dispatch(getAllUserCartItems());
      setLoading(false);
    };
    fetchCartItems();
  }, [dispatch]);

  const res = useSelector((state) => state.cartReducer.getAllUserCart);

  useEffect(() => {
    if (!loading) {
      if (res && res.status === 'success') {
        setItemsNum(res.numOfCartItems);
        setCartItems(res.data.products);
        setCouponName(res.data.coupon || '');
        setTotalCartPrice(res.data.totalCartPrice);
        setTotalCartPriceAfterDiscount(res.data.totalAfterDiscount || 0);
        setCartID(res.data._id);
      } else {
        setItemsNum(0);
        setCartItems([]);
        setCouponName('');
        setTotalCartPrice(0);
        setTotalCartPriceAfterDiscount(0);
        setCartID(0);
      }
    }
  }, [loading, res]);

  return {
    loading,
    itemsNum,
    cartItems,
    couponNameRes,
    totalCartPrice,
    totalCartPriceAfterDiscount,
    cartID,
  };
};

export default useGetAllUserCartHook;
