import React, { useState, useEffect } from 'react';
import ViewSearchProductsHook from './../products/view-search-products-hook';

const NavbarSearchHook = () => {
  const { getProduct } = ViewSearchProductsHook();

  const [searchWord, setSearchWord] = useState(
    () => localStorage.getItem('searchWord') || ''
  );

  // When user types search word
  const OnChangeSearch = (e) => {
    const value = e.target.value;
    setSearchWord(value);
    localStorage.setItem('searchWord', value); // Syncing with localStorage

    if (window.location.pathname !== '/products') {
      window.location.href = '/products';
    }
  };

  useEffect(() => {
    if (searchWord) {
      const timer = setTimeout(() => {
        getProduct(searchWord);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [searchWord, getProduct]);

  return { OnChangeSearch, searchWord };
};

export default NavbarSearchHook;
