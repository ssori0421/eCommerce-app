import { createSlice } from '@reduxjs/toolkit';

// initialState 정의
const initialState = {
  products: [],
  minPrice: null,
  maxPrice: null,
};

// productSlice 정의 (createSlice ()메서드 사용해 slice 생성)
const productSlice = createSlice({
  // ⭐️ 첫 번째 인자: name => Redux Store의 상태 객체에 접근할 수 있는 키(key)로 사용
  name: 'product',
  // ⭐️ 두 번째 인자: state => initialState를 사용함
  initialState,
  // ⭐️ 세 번째 인자: reducer 함수
  // 액션 생성자 함수가 반환한 값으로 Redux Store의 state 상태 객체의 값을 변경
  reducers: {
    // ⚠️ 액션 생성자 함수
    // 파라미터로 state(initialState)와 action을 받음
    // 액션 생성자 함수에 전달한 값은 action.payload에 담김 - 액션 객체(key:value)
    // 새로운 state 상태 객체를 반환
    STORE_PRODUCTS(state, action) {
      state.products = action.payload.products;
    },
    GET_PRICE_RANGE(state, action) {
      // 구조 분해 할당으로 product 추출
      const { products } = action.payload;

      const array = [];
      // map() 메서드
      // products 배열을 순회하면서 가격정보만 담은 새로운 비열을 반환해 array에 담음
      products.map((product) => {
        const price = product.price;
        return array.push(price);
      });

      const min = Math.min(...array);
      const max = Math.max(...array);

      // initialState의 minPrice와 maxPrice를 각각 min, max 값으로 할당해줌
      state.minPrice = min;
      state.maxPrice = max;
    },
  },
});

// 구조 분해 할당으로 export
export const { STORE_PRODUCTS, GET_PRICE_RANGE } = productSlice.actions;

// 함수 작성
// 💡 Redux Store에 왜 값을 저장했지? => 필요시에 useSelector() 메서드를 사용해서 Redux Store에 저장된 state를 가져다가 쓰기 위해!!
// state는 Redux Store의 상태 객체
// name(key)를 사용해서 상태 객체 state에서 productSlice애 점근 >
// productSlice의 여러 필드에 쉽게 접근 가능
export const selectProducts = (state) => state.product.products;
export const selectMinPrice = (state) => state.product.minPrice;
export const selectMaxPrice = (state) => state.product.maxPrice;

export default productSlice.reducer;
