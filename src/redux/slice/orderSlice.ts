import { IOrder } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface IOrderState {
  orderHistory: IOrder[];
  totalOrderAmount: null | number;
}

const initialState: IOrderState = {
  orderHistory: [],
  totalOrderAmount: null,
};

const orderSlice = createSlice({
  name: 'orders',

  initialState,

  reducers: {
    STORE_ORDERS(state, action) {
      state.orderHistory = action.payload;
    },
  },
});

export const { STORE_ORDERS } = orderSlice.actions;

export const selectOrderHistory = (state: RootState) =>
  state.orders.orderHistory;

export default orderSlice.reducer;
