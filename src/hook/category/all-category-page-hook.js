import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllCategory,
  getAllCategoryPage,
} from '../../redux/actions/categoryAction';

const AllCategoryHook = () => {
  const dispatch = useDispatch();
  // when first load
  useEffect(() => {
    dispatch(getAllCategory(18));
  }, [dispatch]);
  // to get state from redux
  const category = useSelector((state) => state.allCategory.category);
  const loading = useSelector((state) => state.allCategory.loading);

  // to get page count
  let pageCount = 0;
  try {
    if (category.paginationResult)
      pageCount = category.paginationResult.numberOfPages;
  } catch (e) {}

  // when press paginiation
  const getPage = (page) => {
    dispatch(getAllCategoryPage(page));
  };

  return { category, loading, pageCount, getPage };
};

export default AllCategoryHook;
