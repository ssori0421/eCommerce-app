'use client';
import React from 'react';
import useFetchCollection from '@/hooks/useFetchCollection';
import styles from './Product.module.scss';

const Product = () => {
  // useFetchCollection() 커스텀 훅 호출
  // firebase의 Firestore Database의 'products' 컬렉션을 인자로 전달
  // 반환값인 data와 isLoading을 받음
  // const { data, isLoading } = useFetchCollection('products');

  return (
    <section className={styles.product}>
      {/* aside 태그를 사용해서 사이드바 UI */}
      <aside className={styles.filter}></aside>
      <div className={styles.content}></div>
    </section>
  );
};

export default Product;
