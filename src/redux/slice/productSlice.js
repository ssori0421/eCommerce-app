import { createSlice } from '@reduxjs/toolkit';

// initialState 정의
const initialState = {
  products: [],
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
  },
});

// 구조 분해 할당으로 export
export const { STORE_PRODUCTS } = productSlice.actions;

// 함수 작성
// state는 Redux Store의 상태 객체
// name(key)를 사용해서 상태 객체 state에서 productSlice애 점근 >
// productSlice에서 여러 필드에 쉽게 접근 가능
export const selectProducts = (state) => state.product.products;

export default productSlice.reducer;
