import React from 'react';
import { Row } from 'react-bootstrap';
import UserAllOrderItem from './UserAllOrderItem';
import UserGetAllOrderHook from '../../hook/user/user-get-all-order-hook';
import Pagination from './../Utility/Pagination';

const UserAllOrders = () => {
  const { userName, paginate, results, orderData, onPress } =
    UserGetAllOrderHook();

  return (
    <div>
      <Row className="justify-content-between ">
        <div className="admin-content-text pb-4">عدد الطلبات #{results}</div>
        {orderData.length >= 1 ? (
          orderData.map((orderItem, index) => {
            return <UserAllOrderItem key={index} orderItem={orderItem} />;
          })
        ) : (
          <h6>لا يوجد طلبات حتى </h6>
        )}

        {paginate.numberOfPages >= 2 ? (
          <Pagination
            onPress={onPress}
            pageCount={paginate.numberOfPages ? paginate.numberOfPages : 0}
          />
        ) : null}
      </Row>
    </div>
  );
};

export default UserAllOrders;
