import { createSlice } from '@reduxjs/toolkit';

// initialState 정의
const initialState = {
  filteredProducts: [],
};

// filterSlice 정의 (createSlice ()메서드 사용해 slice 생성)
const filterSlice = createSlice({
  // ⭐️ 첫 번째 인자: name => Redux Store의 상태 객체에 접근할 수 있는 키(key)로 사용
  name: 'filter',
  // ⭐️ 두 번째 인자: state => initialState를 사용함
  initialState,
  // ⭐️ 세 번째 인자: reducer 함수
  // 액션 생성자 함수가 반환한 값으로 Redux Store의 state 상태 객체의 값을 변경
  reducers: {
    // ⚠️ 액션 생성자 함수
    // 파라미터로 state(initialState)와 action을 받음
    // 액션 생성자 함수에 전달한 값은 action.payload에 담김 - 액션 객체(key:value)
    // 새로운 state 상태 객체를 반환

    // ProductFilter 컴포넌트와 관련 - 카테고리 선택시
    FILTER_BY_CATEGORY: (state, action) => {
      const { products, category } = action.payload;
      let tempProducts = [];
      if (category === 'All') {
        tempProducts = products;
      } else {
        tempProducts = products.filter(
          (product) => product.category === category
        );
      }
      state.filteredProducts = tempProducts;
    },
    // ProductFilter 컴포넌트와 관련 - 브랜드 선택시
    FILTER_BY_BRAND: (state, action) => {
      const { products, price } = action.payload;
      let tempProducts = [];
      if (brand === 'All') {
        tempProducts = [products];
      } else {
        tempProducts = products.filter((product) => product.brand === brand);
      }
      state.filteredProducts = tempProducts;
    },
    // ProductFilter 컴포넌트와 관련 - 가격 설정시
    FILTER_BY_PRICE: (state, action) => {
      const { products, price } = action.payload;
      let tempProducts = [];
      // filter() 메서드
      // 현재 설정한 가격보다 작거나 같은 것들만 담아서 새로운 배열로 반환해서 tempProducts에 할당
      tempProducts = products.filter((prodict) => prodict.price <= price);
      // tempProducts를 initialState의 filteredProducts에 할당
      state.filteredProducts = tempProducts;
    },
    // ProductFilter 컴포넌트와 관련 - 카테고리 > 브랜드 > 가격 모두 처리
    FILTER_BY: (state, action) => {
      const { products, price, brand, category } = action.payload;
      let tempProducts = [];

      if (category === 'All') {
        tempProducts = products;
      } else {
        tempProducts = products.filter(
          (product) => product.category === category
        );
      }
      if (brand === 'All') {
        tempProducts = tempProducts;
      } else {
        tempProducts = tempProducts.filter(
          (product) => product.brand === brand
        );
      }
      tempProducts = tempProducts.filter((product) => product.price <= price);
      // tempProducts를 initialState의 filteredProducts에 할당
      state.filteredProducts = tempProducts;
    },

    // ProductList 컴포넌트와 관련
    SORT_PRODUCTS: (state, action) => {
      const { products, sort } = action.payload;
      let tempProducts = [];
      // 최신 순 정렬
      if (sort === 'latest') {
        tempProducts = products;
      }
      // 낮은 가격 순 정렬
      if (sort === 'lowest-price') {
        tempProducts = products.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }
      // 높은 가격 순 정렬
      if (sort === 'highest-price') {
        tempProducts = products.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }
      // tempProducts를 initialState의 filteredProducts에 할당
      state.filteredProducts = tempProducts;
    },

    // InnerHeader 컴포넌트와 관련
    FILTER_BY_SEARCH: (state, action) => {
      const { products, search } = action.payload;
      // filter() 메서드
      // 검색값이 상품리스트에 있고 && 검색값이 카테고리에 있을 경우 그것들만 담아서 새로운 배열로 반환해서 tempProducts에 할당
      const tempProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredProducts = tempProducts;
    },
  },
});

// 구조 분해 할당으로 export
export const {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
  FILTER_BY,
  SORT_PRODUCTS,
  FILTER_BY_SEARCH,
} = filterSlice.actions;

// 함수 작성
// 💡 Redux Store에 왜 값을 저장했지? => 필요시에 useSelector() 메서드를 사용해서 Redux Store에 저장된 state를 가져다가 쓰기 위해!!
// state는 Redux Store의 상태 객체
// name(key)를 사용해서 상태 객체 state에서 filterSlice애 점근 >
// filterSlice의 여러 필드에 쉽게 접근 가능
export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
