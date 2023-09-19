import {
  selectFilteredProducts,
  SORT_PRODUCTS,
} from '@/redux/slice/filterSlice';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ProductList.module.scss';
import ProductItem from '../productItem/ProductItem';
import Pagination from '@/components/pagination/Pagination';

const ProductList = () => {
  const [sort, setSort] = useState('latest');

  // useSelector() 메서드 사용
  // Redux Store에 저장된 state를 읽어와서 변수에 할당
  const filteredProducts = useSelector(selectFilteredProducts);

  // useDispatch() 메서드 사용
  // dispatch 변수에 할당
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch() 함수
    // SORT_PRODUCTS 액션 생성자 함수를 인자로 담아서 reducer() 함수에 전달
    dispatch(SORT_PRODUCTS({ products: filteredProducts, sort }));
  }, [dispatch, sort]);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const isRadioSelected = (value) => sort === value;
  const handleRadioClick = (e) => setSort(e.target.value);

  return (
    <div className={styles.productList}>
      <div className={styles.top}>
        <div>
          <ul className={styles.sort}>
            <li className={isRadioSelected('latest') ? styles.selected : ''}>
              <input
                type='radio'
                value='latest'
                id='latest'
                checked={isRadioSelected('latest')}
                onChange={handleRadioClick}
              />
              <label htmlFor='latest'>최신순</label>
            </li>

            <li
              className={isRadioSelected('lowest-price') ? styles.selected : ''}
            >
              <input
                type='radio'
                value='lowest-price'
                id='lowest-price'
                checked={isRadioSelected('lowest-price')}
                onChange={handleRadioClick}
              />
              <label htmlFor='lowest-price'>낮은가격순</label>
            </li>

            <li
              className={
                isRadioSelected('highest-price') ? styles.selected : ''
              }
            >
              <input
                type='radio'
                value='highest-price'
                id='highest-price'
                checked={isRadioSelected('highest-price')}
                onChange={handleRadioClick}
              />
              <label htmlFor='highest-price'>높은가격순</label>
            </li>
          </ul>
        </div>

        <div className={styles.limit}>
          <select
            value={productsPerPage}
            onChange={(e) => {
              setProductsPerPage(Number(e.target.value));
            }}
          >
            <option value={10}>10개씩 보기</option>
            <option value={20}>20개씩 보기</option>
          </select>
        </div>
      </div>

      <div className={styles.grid}>
        {currentProducts.length === 0 ? (
          <p>상품이 없습니다.</p>
        ) : (
          <>
            {currentProducts.map((product) => {
              return (
                <div key={product.id}>
                  <ProductItem {...product} />
                </div>
              );
            })}
          </>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalProducts={filteredProducts.length}
        productsPerPage={productsPerPage}
      />
    </div>
  );
};

export default ProductList;
