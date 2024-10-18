import React from 'react';
import Pagination from '../../Components/Utility/Pagination';
import BrandContainer from '../../Components/Brand/BrandContainer';
import AllBrandHook from '../../hook/brand/all-brand-page-hook';
const AllBrandPage = () => {
  const [brand, loading, pageCount, getPage] = AllBrandHook();
  return (
    <div style={{ minHeight: '670px' }}>
      <BrandContainer data={brand.data} loading={loading} />
      <Pagination pageCount={pageCount} onPress={getPage} />
    </div>
  );
};

export default AllBrandPage;
