'use client';
import React, { useEffect } from 'react';
import styles from './CartClient.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  SAVE_URL,
} from '@/redux/slice/cartSlice';
import { useRouter } from 'next/navigation';
import { selectIsLoggedIn } from '@/redux/slice/authSlice';
import Heading from '@/components/heading/Heading';
import Link from 'next/link';
import priceFormat from '@/utils/priceFormat';
import Image from 'next/image';
import { FaTrashAlt } from 'react-icons/fa';
import Button from '@/components/button/Button';

const CartClient = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const dispatch = useDispatch();
  const router = useRouter();

  // useSelector() 메서드 사용
  // Redux Store에 저장된 state를 읽어와서 isLoggedIn 변수에 할당
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // 장바구니 페이지 수량 + 버튼 클릭시
  const increaseCart = (cart) => {
    // dispatch() 함수
    // ADD_TO_CART 액션 생성자 함수를 인자로 담아서 reducer() 함수에 전달
    dispatch(ADD_TO_CART(cart));
  };

  // 장바구니 페이지 수량 - 버튼 클릭시
  const decreaseCart = (cart) => {
    // dispatch() 함수
    // DECREASE_CART 액션 생성자 함수를 인자로 담아서 reducer() 함수에 전달
    dispatch(DECREASE_CART(cart));
  };

  // 장바구니 페이지 상품 삭제 버튼 클릭시
  const removeFromCart = (cart) => {
    // dispatch() 함수
    // REMOVE_FROM_CART 액션 생성자 함수를 인자로 담아서 reducer() 함수에 전달
    dispatch(REMOVE_FROM_CART(cart));
  };

  // 장바구니 페이지 카트 비우기 버튼 클릭시
  const clearCart = () => {
    // dispatch() 함수
    // CLEAR_CART 액션 생성자 함수를 인자로 담아서 reducer() 함수에 전달
    dispatch(CLEAR_CART());
  };

  const url = typeof window !== 'undefined' ? window.location.href : '';
  const checkout = () => {
    if (isLoggedIn) {
      router.push('/checkout-address');
    } else {
      dispatch(SAVE_URL(url));
      router.push('/login');
    }
  };

  // useEffect()
  // 자동 실행
  useEffect(() => {
    // dispatch() 함수
    // CALCULATE_SUBTOTAL 액션 생성자 함수를 인자로 담아서 reducer() 함수에 전달
    // CALCULATE_TOTAL_QUANTITY 액션 생성자 함수를 인자로 담아서 reducer() 함수에 전달
    // SAVE_URL 액션 생성자 함수를 인자로 담아서 reducer() 함수에 전달
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY);
    dispatch(SAVE_URL(''));
  }, [dispatch, cartItems]);

  return (
    <section className={styles.table}>
      <Heading title='장바구니' />
      {cartItems.length === 0 ? (
        <>
          <p className={styles.emptyText}>장바구니가 비어있습니다.</p>
          <div className={styles.emptyText}>
            <Link href={'/'}>계속 쇼핑하기</Link>
          </div>
        </>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>순서</th>
                <th>상품</th>
                <th>가격</th>
                <th>개수</th>
                <th>합계</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cart, index) => {
                const { id, name, price, imageURL, cartQuantity } = cart;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <p>
                        <b>{name}</b>
                      </p>
                      <Image
                        src={imageURL}
                        alt={name}
                        width={100}
                        height={100}
                      />
                    </td>
                    <td>{priceFormat(price)}원</td>
                    <td>
                      <div className={styles.count}>
                        <button onClick={() => decreaseCart(cart)}>-</button>

                        <p>
                          <b>{cartQuantity}</b>
                        </p>

                        <button onClick={() => increaseCart(cart)}>+</button>
                      </div>
                    </td>
                    <td>{priceFormat(price * cartQuantity)}원</td>
                    <td className={styles.icons}>
                      <FaTrashAlt
                        size={19}
                        color='red'
                        onClick={() => removeFromCart(cart)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={styles.summary}>
            <Button onClick={clearCart}>카트 비우기</Button>
            <div className={styles.checkout}>
              <div className={styles.text}>
                <h4>총 상품 개수</h4>
                <p>{cartTotalQuantity}개</p>
              </div>
              <div className={styles.text}>
                <h4>합계</h4>
                <p>{priceFormat(cartTotalAmount)}원</p>
              </div>
              <Button onClick={checkout}>계산하기</Button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default CartClient;
