import {
  selectFilteredProducts,
  SORT_PRODUCTS,
} from '@/redux/slice/filterSlice';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ProductList.module.scss';
import ProductItem from '../productItem/ProductItem';
import Pagination from '@/components/pagination/Pagination';

const ProductList = () => {
  const [sort, setSort] = useState('latest');

  const filteredProducts = useSelector(selectFilteredProducts);

  const dispatch = useDispatch();

  useEffect(() => {
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

  const isRadioSelected = (value: string) => sort === value;

  const handleRadioClick = (e: ChangeEvent<HTMLInputElement>) =>
    setSort(e.target.value);

  return (
    <div className={styles.productList}>
      <div className={styles.top}>
        {/* 최신순/낮은가격순/높은가격순 sorting 옵션 */}
        <div>
          <ul className={styles.sort}>
            {/* isRadioSelected가 true인 경우에는 styles.selected 스타일을 적용 */}
            <li className={isRadioSelected('latest') ? styles.selected : ''}>
              <input
                type='radio'
                // 해당 라디오 버튼의 값은 'latest'
                value='latest'
                id='latest'
                // isRadioSelected가 true인 경우에 해당 라디오 버튼이 선택된 상태로 표시
                checked={isRadioSelected('latest')}
                onChange={handleRadioClick}
              />
              <label htmlFor='latest'>최신순</label>
            </li>

            {/* isRadioSelected가 true인 경우에는 styles.selected 스타일을 적용 */}
            <li
              className={isRadioSelected('lowest-price') ? styles.selected : ''}
            >
              <input
                type='radio'
                // 해당 라디오 버튼의 값은 'lowest-price'
                value='lowest-price'
                id='lowest-price'
                // isRadioSelected가 true인 경우에 해당 라디오 버튼이 선택된 상태로 표시
                checked={isRadioSelected('lowest-price')}
                onChange={handleRadioClick}
              />
              <label htmlFor='lowest-price'>낮은가격순</label>
            </li>

            {/* isRadioSelected가 true인 경우에는 styles.selected 스타일을 적용 */}
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

        {/* 10개/20개씩 보기 옵션 선택 */}
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

      {/* 상품 리스트 */}
      <div className={styles.grid}>
        {currentProducts.length === 0 ? (
          <p>상품이 없습니다.</p>
        ) : (
          <>
            {currentProducts.map((product) => {
              return (
                <div key={product.id}>
                  {/* ProductItem 컴포넌트에 product 배열의 요소들을 prop으로 전달 */}
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
