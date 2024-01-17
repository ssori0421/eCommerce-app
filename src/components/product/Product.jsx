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
  const { data, isLoading } = useFetchCollection('products');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [data, dispatch]);

  return (
    <section className={styles.product}>
      {/* aside 태그를 사용해서 사이드바 UI */}
      <aside className={styles.filter}>
        {isLoading ? null : <ProductFilter />}
      </aside>
      <div className={styles.content}>
        {isLoading ? <Loader basic /> : <ProductList />}
      </div>
    </section>
  );
};

export default Product;
