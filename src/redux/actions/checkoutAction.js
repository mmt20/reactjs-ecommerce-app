import { useGetDataToken } from '../../hooks/useGetData';
import { useInsertData } from '../../hooks/useInsertData';
import { CREATE_CASH_ORDER, CREATE_ORDER_CRAD } from '../type';

// create cash order
export const createCashOrder = (id, body) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/orders/${id}`, body);

    dispatch({
      type: CREATE_CASH_ORDER,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: CREATE_CASH_ORDER,
      payload: e.response,
    });
  }
};

//create order by card for user
export const createOrderCARD = (id, body) => async (dispatch) => {
  try {
    const response = await useGetDataToken(
      `/api/v1/orders/checkout-session/${id}`,
      body
    );
    console.log(response);
    dispatch({
      type: CREATE_ORDER_CRAD,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: CREATE_ORDER_CRAD,
      payload: e.response,
    });
  }
};
