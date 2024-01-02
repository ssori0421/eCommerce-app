import React, { useEffect } from 'react';
import styles from './OrderHistory.module.scss';
import useFetchCollection from '@/hooks/useFetchCollection';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_ORDERS, selectOrderHistory } from '@/redux/slice/orderSlice';
import { selectUserID } from '@/redux/slice/authSlice';

const OrderHistoryClient = () => {
  const { data, isLoading } = useFetchCollection('orders');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserID);

  return <div>OrderHistoryClient</div>;
};

export default OrderHistoryClient;
