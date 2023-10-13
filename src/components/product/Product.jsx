'use client';
import React, { useEffect } from 'react';
import useFetchCollection from '@/hooks/useFetchCollection';
import styles from './Product.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  STORE_PRODUCTS,
  GET_PRICE_RANGE,
  selectProducts,
} from '@/redux/slice/productSlice';
import Loader from '../loader/Loader';
import ProductList from './productList/ProductList';
import ProductFilter from './productFilter/ProductFilter';

const Product = () => {
  // useFetchCollection() 커스텀 훅 호출
  // firebase의 Firestore Database의 'products' 컬렉션을 인자로 전달
  // 반환값인 data와 isLoading을 받음
  const { data, isLoading } = useFetchCollection('products');

  const dispatch = useDispatch();

  // useEffect 사용
  // 자동 실행
  useEffect(() => {
    // dispatch() 함수
    // STORE_PRODUCTS 액션 생성자 함수를 인자로 담아서 reducer() 함수에 전달
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );

    // dispatch() 함수
    // GET_PRICE_RANGE 액션 생성자 함수를 인자로 담아서 reducer() 함수에 전달
    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [data, dispatch]);

  // useSelector() 메서드 사용
  // Redux Store에 저장된 state를 읽어와서 products 변수에 할당
  const products = useSelector(selectProducts);

  return (
    <section className={styles.product}>
      {/* aside 태그를 사용해서 사이드바 UI */}
      <aside className={styles.filter}>
        {isLoading ? null : <ProductFilter />}
      </aside>
      <div className={styles.content}>
        {isLoading ? <Loader basic /> : <ProductList products={products} />}
      </div>
    </section>
  );
};

export default Product;
