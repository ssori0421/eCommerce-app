'use client   ';
import useFetchDocument from '@/hooks/useFetchDocument';
import { useParams } from 'next/navigation';
import React from 'react';
import styles from './ProductDetailsClient.module.scss';
import Loader from '@/components/loader/Loader';

const ProductDetailClient = () => {
  // useParams() 훅을 사용해서 URL의 queryParam을 가져와서 id에 당음
  const { id } = useParams();

  // useFetchDocument() 커스텀 훅 호출
  // firebase의 Firestore Database의 'products' 컬렉션을 인자로 전달
  // 반환값인 document를 받아서 product라는 이름으로 사용
  const { document: product } = useFetchDocument('products', id);

  // 장바구니 담기 버튼 클릭시 장바구니에 담는 함수
  const addToCart = () => {};

  // 배송 일자를 표시해주기 위해 필요한 변수들
  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1));

  const tomorrowDate = tomorrow.getDate();
  const tomorrowMonth = tomorrow.getMonth();

  return (
    <section className={styles.product}>
      {product === null ? <Loader /> : <></>}
    </section>
  );
};

export default ProductDetailClient;
