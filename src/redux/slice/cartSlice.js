import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// initialState 정의
const initialState = {
  cartItems:
    // localStotage는 window객체에 존재함
    // Next.js의 서버 컴포넌트의 경우 먼저 서버에서 실행될때
    // 아직 클라이언트 측에서는 window 객체가 존재하지 않음
    // 에러를 방지하기 위해 조건문을 사용
    typeof window !== 'undefined'
      ? localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : []
      : [],
  cartTotalQuantity: 0,
  cartTotalAount: 0,
  // 로그인 안한 유저가 장바구니 담기 버튼 클릭시 > 로그인 처리 후 > 다시 상품 상세페이지로 이동시켜줘야함
  // 따라서 해당 상품을 보여주는 URL을 state로 보관하고 있어야 함
  previousURL: '',
};

// cartSlice 정의 (createSlice ()메서드 사용해 slice 생성)
const cartSlice = createSlice({
  // ⭐️ 첫 번째 인자: name => Redux Store의 상태 객체에 접근할 수 있는 키(key)로 사용
  name: 'cart',
  // ⭐️ 두 번째 인자: state => initialState를 사용함
  initialState,
  // ⭐️ 세 번째 인자: reducer 함수
  // 액션 생성자 함수가 반환한 값으로 Redux Store의 state 상태 객체의 값을 변경
  reducers: {
    // ⚠️ 액션 생성자 함수
    // 파라미터로 state(initialState)와 action을 받음
    // 액션 생성자 함수에 전달한 값은 action.payload에 담김 - 액션 객체(key:value)
    // 새로운 state 상태 객체를 반환

    // ProductDetailClient 컴포넌트와 관련 - 장바구니 추가시
    ADD_TO_CART: (state, action) => {
      // 장바구니에 담을 상품이 이미 장바구니에 담긴 상품인지 확인
      // 이미 담긴 상품이면 인덱스 번호를 반환
      // 처음 담는 상품이면 -1을 반환
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      // 상품 수량 증가 버튼 클릭시
      // 적용된 숫자 만큼 or 1
      const increaseCount = action.payload.quantity
        ? action.payload.quantity
        : 1;

      // 이미 장바구니에 있는 상품의 경우
      // 상품 수량 = 기존 수량 + increaseCount
      if (productIndex >= 0) {
        state.cartItems[productIndex].cartQuantity += increaseCount;

        toast.success(`${action.payload.name} 상품이 하나 추가되었습니다.`);
      }

      // 장바구니에 처음 담는 상품의 경우
      // 얕은 복사로 상품 정보 전체를 담음
      // 상품 수량 = increaseCount
      else {
        const tempProduct = { ...action.payload, cartQuantity: increaseCount };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} 상품이 추가되었습니다.`);
      }

      // localStorage에 장바구니 상품들을 모두 저장
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    // ProductDetailClient 컴포넌트와 관련 - 장바구니에 담긴 상품 총 수량
    CALCULATE_TOTAL_QUANTITY: (state) => {
      const array = [];
      // map()메서드
      // 장바구니 상품이 담긴 배열을 순회하면서
      // 각 상품의 수량을 추출해서 quantity 배열에 담음
      // ex) [1, 3, 1, 1, 2]
      state.cartItems.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;
        return array.push(quantity);
      });

      // reduce()메서드
      // 상품 수량이 담긴 배열의 요소들을 모두 더해 상품의 총 수량을 계산해 totalQuantity에 담음
      // ex) [1, 3, 1, 1, 2] => 8
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);

      state.cartTotalQuantity = totalQuantity;
    },
  },
});

export const { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export default cartSlice.reducer;
