import { GET_ALL_BRAND, CREATE_BRAND, GET_ONE_BRAND, GET_ERROR } from '../type';
import { useGetData } from '../../hooks/useGetData';
import { useInsertDataWithImage } from '../../hooks/useInsertData';

// get all brand
export const getAllBrand = (limit) => {
  return async (dispatch) => {
    try {
      const response = await useGetData(`/api/v1/brands?limit=${limit}`);
      dispatch({
        type: GET_ALL_BRAND,
        payload: response,
      });
    } catch (e) {
      dispatch({
        type: GET_ERROR,
        payload: 'Error ' + e,
      });
    }
  };
};

// get all brand with pagination
export const getAllBrandPage = (page) => {
  return async (dispatch) => {
    try {
      const response = await useGetData(`/api/v1/brands?limit=4&page=${page}`);
      dispatch({
        type: CREATE_BRAND,
        payload: response,
      });
    } catch (e) {
      dispatch({
        type: GET_ERROR,
        payload: 'Error ' + e,
      });
    }
  };
};

//get one Brand
export const getOneBrand = (id) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/brands/${id}`);

    dispatch({
      type: GET_ONE_BRAND,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error ' + e,
    });
  }
};

// insert brand
export const createBrand = (formData) => async (dispatch) => {
  try {
    const response = await useInsertDataWithImage(`/api/v1/brands`, formData);

    dispatch({
      type: CREATE_BRAND,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error ' + e,
    });
  }
};
