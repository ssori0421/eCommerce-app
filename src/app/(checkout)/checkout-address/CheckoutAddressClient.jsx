import React, { useState } from 'react';
import styles from './CheckoutAddress.module.scss';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from '@/redux/slice/checkoutSlice';

const initiLAddressState = {
  name: '',
  line: '',
  city: '',
  pastalCode: '',
};

const CheckoutAddressClient = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initiLAddressState,
  });

  const [billingAddress, setBillingAddress] = useState({
    ...initiLAddressState,
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({ ...billingAddress, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));
    router.push('/checkout');
  };
  return <div></div>;
};
