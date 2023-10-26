'use client';
import React, { useState } from 'react';
import styles from './CheckoutAddress.module.scss';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from '@/redux/slice/checkoutSlice';
import Heading from '@/components/heading/Heading';
import Button from '@/components/button/Button';

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

  // 주소 입력 페이지 - 배송 주소 입력
  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  // 주소 입력 페이지  - 청구지 주소 입력
  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({ ...billingAddress, [name]: value });
  };

  // 주소 입력 페이지 - 주문하기 클릭시
  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch() 함수
    // SAVE_SHIPPING_ADDRESS 액션 생성자 함수를 인자로 담아서 reducer() 함수에 전달
    // SAVE_BILLING_ADDRESS 액션 생성자 함수를 인자로 담아서 reducer() 함수에 전달
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));
    // push()메서드를 사용해서 원하는 path로 라우팅
    router.push('/checkout');
  };
  return (
    <section className={styles.checkout}>
      <Heading title='상세주문' />
      <form onSubmit={handleSubmit}>
        <div className={styles.card}>
          <h3>배송 주소</h3>
          <label>받는 사람 이름</label>
          <input
            type='text'
            placeholder='받는 사람 이름'
            required
            name='name'
            value={shippingAddress.name}
            onChange={(e) => handleShipping(e)}
          />

          <label>상세주소</label>
          <input
            type='text'
            placeholder='상세주소'
            required
            name='line'
            value={shippingAddress.line}
            onChange={(e) => handleShipping(e)}
          />

          <label>도시</label>
          <input
            type='text'
            placeholder='도시'
            required
            name='city'
            value={shippingAddress.city}
            onChange={(e) => handleShipping(e)}
          />

          <label>우편번호</label>
          <input
            type='text'
            placeholder='우편번호'
            required
            name='postalCode'
            value={shippingAddress.postalCode}
            onChange={(e) => handleShipping(e)}
          />
        </div>

        <div className={styles.card}>
          <h3>청구지 주소</h3>
          <label>보내는 사람 이름</label>
          <input
            type='text'
            placeholder='보내는 사람 이름'
            required
            name='name'
            value={billingAddress.name}
            onChange={(e) => handleBilling(e)}
          />

          <label>상세주소</label>
          <input
            type='text'
            placeholder='상세주소'
            required
            name='line'
            value={billingAddress.line}
            onChange={(e) => handleBilling(e)}
          />

          <label>도시</label>
          <input
            type='text'
            placeholder='도시'
            required
            name='city'
            value={billingAddress.city}
            onChange={(e) => handleBilling(e)}
          />

          <label>우편번호</label>
          <input
            type='text'
            placeholder='우편번호'
            required
            name='postalCode'
            value={billingAddress.postalCode}
            onChange={(e) => handleBilling(e)}
          />
          <Button type='submit'>주문하기</Button>
        </div>
      </form>
    </section>
  );
};

export default CheckoutAddressClient;
