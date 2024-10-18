import React from 'react';
import { Row } from 'react-bootstrap';
import AdminAllOrdersItem from './AdminAllOrdersItem';
import UserGetAllOrderHook from '../../hook/user/user-get-all-order-hook';
import Pagination from '../Utility/Pagination';

const AdminAllOrders = () => {
  const { userName, paginate, results, orderData, onPress } =
    UserGetAllOrderHook();
  return (
    <div>
      <Row className="justify-content-between">
        <div className="admin-content-text">اداره جميع الطلبات</div>
        <Row className="justify-content-center ">
          {orderData.length >= 1 ? (
            orderData.map((orderItem, index) => {
              return <AdminAllOrdersItem key={index} orderItem={orderItem} />;
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
      </Row>
    </div>
  );
};

export default AdminAllOrders;
