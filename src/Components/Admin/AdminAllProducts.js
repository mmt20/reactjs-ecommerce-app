import React from 'react';
import AdminAllProducsCard from './AdminAllProductsCard';
import { Row } from 'react-bootstrap';
import AdminAllProductsCard from './AdminAllProductsCard';

const AdminAllProducts = ({ products }) => {
  return (
    <div>
      <div className="admin-content-text">اداره جميع المنتجات</div>
      <Row className="justify-content-center ">
        {products ? (
          products.map((item, index) => (
            <AdminAllProductsCard key={index} item={item} />
          ))
        ) : (
          <h4>لا يوجد منتجات حتي الان</h4>
        )}
      </Row>
    </div>
  );
};

export default AdminAllProducts;
