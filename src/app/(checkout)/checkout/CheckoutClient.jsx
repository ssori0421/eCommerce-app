'use client';
import React from 'react';
import styles from './Checkout.module.scss';
import Heading from '@/components/heading/Heading';
import CheckoutForm from '@/components/checkoutForm/CheckoutForm';
import Button from '@/components/button/Button';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { useDispatch, useSelector } from 'react-redux';
import {
  CLEAR_CART,
  selectCartItems,
  selectCartTotalAmount,
} from '@/redux/slice/cartSlice';
import { toast } from 'react-toastify';
import { selectEmail, selectUserID } from '@/redux/slice/authSlice';
import { selectShippingAddress } from '@/redux/slice/checkoutSlice';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';

const CheckoutClient = () => {
  // useSelector() 메서드 사용
  // Redux Store에 저장된 state를 읽어와서 userID 변수에 할당
  // Redux Store에 저장된 state를 읽어와서 cartItems 변수에 할당
  // Redux Store에 저장된 state를 읽어와서 shippingAddress 변수에 할당
  // Redux Store에 저장된 state를 읽어와서 userEmail 변수에 할당
  // Redux Store에 저장된 state를 읽어와서 cartTotalAmount 변수에 할당
  const userID = useSelector(selectUserID);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const userEmail = useSelector(selectEmail);
  const cartTotalAmount = useSelector(selectCartTotalAmount);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 토스 결제창 띄우기
    const tossPayment = await loadTossPayments(
      process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY
    );
    // requestPayment()메서드
    tossPayment
      .requestPayment('카드', {
        amount: cartTotalAmount,
        orderId: Math.random().toString(36).slice(2),
        orderName: '주문',
      })

      // 토스 결제창에서 결제 성공시
      // 결제 승인 API 호출
      // 응답 처리
      // 결제 정보를 firebase store에 저장
      // 카트 비우기
      .then(async function (data) {
        const { orderId, paymentKey, amount } = data;
        const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY;

        const url = `https://api.tosspayments.com/v1/payments/confirm`;
        const basicToken = Buffer.from(`${secretKey}:`, 'utf-8').toString(
          'base64'
        );

        // fetch() - method, body, headers
        // body: body에 값을 넣어줄때는 JSON.stringify 처리해서 넣어줘야 함
        const confirmResponse = fetch(url, {
          method: 'post',
          body: JSON.stringify({
            amount,
            orderId,
            paymentKey,
          }),
          headers: {
            Authorization: `Basic ${basicToken}`,
            'Content-Type': 'application/json',
          },
        }).then((response) => response.json());

        console.log('confirmResponse', confirmResponse);

        const today = new Date();
        const date = today.toDateString();
        const time = today.toLocaleDateString();

        const orderData = {
          userID,
          userEmail,
          orderDate: date,
          orderTime: time,
          orderAmount: amount,
          orderStatus: '주문수락',
          cartItems,
          shippingAddress,
          createdAt: Timestamp.now().toDate(),
        };

        await addDoc(collection(db, 'orders'), orderData);
        // dispatch() 함수
        // CLEAR_CART 액션 생성자 함수를 인자로 담아서 reducer() 함수에 전달
        dispatch(CLEAR_CART());

        router.push(`/checkout-success?orderId=${orderId}`);
      })

      // 토스 결제창에서 결제 실패시
      .catch((error) => {
        // 결제 고객이 결제창을 닫았을 때 에러 처리
        if (error.code === 'USER_CANCEL') {
          toast.error('결제창이 닫아졌습니다.');
        }
      });
  };

  return (
    <section>
      <div className={styles.checkout}>
        <Heading title='주문하기' />
        <form onSubmit={handleSubmit}>
          <div className={styles.card}>
            <CheckoutForm />
          </div>
          <div>
            <Button type='submit'>토스를 이용해서 결제하기</Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutClient;
