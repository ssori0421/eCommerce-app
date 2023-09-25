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

  // 현재 페이지에 표시될 제품 중 마지막 제품의 인덱스. ex) 1 * 10 = 10
  const indexOfLastProduct = currentPage * productsPerPage;
  //  현재 페이지에 표시될 제품 중 첫 번째 제품의 인덱스. ex) 10 - 10 = 0
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // 현재 페이지에 표시할 제품들을 담는 배열  filteredProducts.slice(0, 10) => [00, 00, 00, 00, 00, 00, 00, 00, 00, 00]  10개의 요소가 담긴 배열
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // 현재 선택된 정렬 옵션이 value와 일치하면 true를 반환하고, 그렇지 않으면 false를 반환
  const isRadioSelected = (value) => sort === value;
  // setState를 사용해서 sort state 동기화
  const handleRadioClick = (e) => setSort(e.target.value);

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
                // 해당 라디오 버튼의 값은 'highest-price'
                value='highest-price'
                id='highest-price'
                // isRadioSelected가 true인 경우에 해당 라디오 버튼이 선택된 상태로 표시
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
