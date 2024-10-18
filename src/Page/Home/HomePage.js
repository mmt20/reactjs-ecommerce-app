import React from 'react';
import Slider from './../../Components/Home/Slider';
import SubTitle from '../../Components/Utility/SubTitle';
import HomeCategory from '../../Components/Home/HomeCategory';
import CardProductContainer from '../../Components/Products/CardProductsContainer';
import DiscountSection from '../../Components/Home/DiscountSection';
import BrandFeatured from '../../Components/Brand/BrandFeatured';
import ViewHomeProductsHook from '../../hook/products/view-home-products-hook';

const HomePage = () => {
  const [items] = ViewHomeProductsHook();
  return (
    <div className="font" style={{ minHeight: '670px' }}>
      <Slider />
      <SubTitle />
      <HomeCategory />
      <CardProductContainer
        products={items}
        title="الأكثر مبيعا"
        btntitle="المزيد"
        pathText="/products"
      />
      <DiscountSection />

      <CardProductContainer
        products={items}
        title="احدث الازياء"
        btntitle="المزيد"
        pathText="/products"
      />
      <BrandFeatured
        title="اشهر الماركات"
        btntitle="المزيد"
        pathText="/products"
      />
    </div>
  );
};

export default HomePage;
