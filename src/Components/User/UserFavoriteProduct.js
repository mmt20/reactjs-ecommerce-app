import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import ProductCard from '../Products/ProductCard';
import Pagination from '../Utility/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getProductWishList } from '../../redux/actions/wishListAction';
import CardProductsContainer from '../Products/CardProductsContainer';
const UserFavoriteProduct = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  useEffect(() => {
    const get = async () => {
      setLoading(true);
      await dispatch(getProductWishList());
      setLoading(false);
    };
    get();
  }, []);

  const res = useSelector((state) => state.wishListReducer.allWishList);
  useEffect(() => {
    if (loading === false) {
      if (res) setItems(res.data);
    }
  }, [loading]);
  return (
    <Row className="justify-content-between ">
      <div className="admin-content-text">المنتجات المفضله</div>
      <Row className="justify-content-between ">
        {items.length <= 0 ? (
          <h6>لا يوجد منتدات مفضله حاليا</h6>
        ) : (
          <CardProductsContainer products={items} title="" btntitle="" />
        )}

        <Pagination />
      </Row>
    </Row>
  );
};

export default UserFavoriteProduct;
