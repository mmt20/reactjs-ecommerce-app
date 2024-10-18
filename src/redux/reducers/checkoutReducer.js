import { CREATE_CASH_ORDER, CREATE_ORDER_CRAD } from '../type';

const inital = {
  createCashOrder: [],
  createOrderCard: [],
};

const categoryReducer = (state = inital, action) => {
  switch (action.type) {
    case CREATE_CASH_ORDER:
      return {
        ...state,
        createCashOrder: action.payload,
      };
    case CREATE_ORDER_CRAD:
      return {
        ...state,
        createOrderCard: action.payload,
      };
    default:
      return state;
  }
};
export default categoryReducer;
