'use client';
import { FILTER_BY } from '@/redux/slice/filterSlice';
import {
  selectMaxPrice,
  selectMinPrice,
  selectProducts,
} from '@/redux/slice/productSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ProductFilter.module.scss';
import priceFormat from '@/utils/priceFormat';
import Button from '@/components/button/Button';

const ProductFilter = () => {
  const [category, setCategory] = useState('All');
  const [brand, setBrand] = useState('All');
  const [price, setPrice] = useState(10000);

  // useSelector() 메서드 사용
  // Redux Store에 저장된 state를 읽어와서 각각의 변수에 할당
  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  // useDispatch() 메서드 사용
  // dispatch 변수에 할당
  const dispatch = useDispatch();

  // 모든 카테고리
  const allCategories = [
    'All',
    // new 연산자와 Set 생성자 함수 사용
    // set 객체는 중복되지 않는 유일한 값들의 집합
    ...new Set(products.map((product) => product.category)),
  ];

  // 특정 카테고리 선택시 호출되는 함수
  const filterCategories = (category) => {
    // setState를 사용해서 category state 동기화
    setCategory(category);
  };

  // 모든 브랜드
  const allBrands = [
    'All',
    // new 연산자와 Set 생성자 함수 사용
    // set 객체는 중복되지 않는 유일한 값들의 집합
    ...new Set(products.map((product) => product.brand)),
  ];

  useEffect(() => {
    // dispatch() 함수
    // FILTER_BY 액션 생성자 함수를 인자로 담아서 reducer() 함수에 전달
    dispatch(FILTER_BY({ products, price, category, brand }));
  }, [dispatch, products, price, category, brand]);

  // 필터 초기화 버튼 클릭시 호출되는 함수
  // setState를 사용해서 각 state를 동기화
  const clearFilters = () => {
    setCategory('All');
    setBrand('All');
    setPrice(maxPrice);
  };

  return (
    <div className={styles.filter}>
      <h4>카테코리</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button
              key={cat}
              type='button'
              className={`${category}` === cat ? `${styles.active}` : ''}
              onClick={() => filterCategories(cat)}
            >
              {/*  &#8250를 사용해서 화살표 추가 */}
              &#8250; {cat}
            </button>
          );
        })}
      </div>
      <h4>브랜드</h4>
      <div className={styles.brand}>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrands.map((brand) => {
            return (
              <option value={brand} key={brand}>
                {brand}
              </option>
            );
          })}
        </select>
      </div>

      <h4>가격</h4>
      {/* utils 폴더에 있는 priceFormat.js 파일에 작성한 priceFormat 함수 사용  */}
      {/* Number 타입으로 바꿔줌 */}
      <p>{priceFormat(Number(price))}원</p>
      <div className={styles.price}>
        <input
          type='range'
          value={price}
          onChange={(e) => setPrice(e.target.valueAsNumber)}
          min={minPrice}
          max={maxPrice}
        />
      </div>

      <br />
      <Button onClick={clearFilters}>필터 초기화</Button>
    </div>
  );
};

export default ProductFilter;
