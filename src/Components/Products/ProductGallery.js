import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import LeftButton from './LeftButton';
import RightButton from './RightButton';
import { useParams } from 'react-router-dom';
import ViewProductsDetalisHook from '../../hook/products/view-products-detalis-hook';
const ProductGallery = () => {
  const { id } = useParams();
  const { images } = ViewProductsDetalisHook(id);

  return (
    <div className="product-gallery-card d-flex justify-content-center align-items-center pt-2">
      <ImageGallery
        items={images}
        showFullscreenButton={false}
        isRTL={true}
        showPlayButton={false}
        showThumbnails={true}
        renderRightNav={RightButton}
        renderLeftNav={LeftButton}
        thumbnailPosition="bottom"
      />
    </div>
  );
};

export default ProductGallery;
