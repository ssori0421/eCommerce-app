import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  userID: null,
};

// createSlice 함수 사용
// 리듀서, 액션 생성자 함수 및 액션 타입을 간결하게 정의
const authSlice = createSlice({
  name: 'auth',
  initialState,
  // 리듀서- 액션 객체를 받아서 새로운 상태를 반환
  reducers: {
    // 로그인 한 유저
    // 액션 생성자 함수: 액션 객체를 반환 {key : value}
    // state는 initialState를 의미
    SET_ACTIVE_USER: (state, action) => {
      console.log('action', action);
      const { email, userName, userID } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.userName = userName;
      state.userID = userID;
    },
    // 로그아웃 한 유저
    // 액션 생성자 함수: 액션 객체를 반환 {key : value}
    // state는 initialState를 의미
    REMOVE_ACTIVE_USER: (state) => {
      state.isLoggedIn = false;
      state.email = null;
      state.userName = null;
      state.userID = null;
    },
  },
});

// 구조 분해 할당으로 export
export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserName = (state) => state.auth.userName;
export const selectUserID = (state) => state.auth.userID;

export default authSlice.reducer;
