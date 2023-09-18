import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import productReducer from './slice/productSlice';
import filterReducer from './slice/filterSlice';

// rootReducer 선언
// combineReducers 함수 사용
// 다양한 reducer들을 합쳐서 하나의 객체로 반환
const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  filter: filterReducer,
});

// Redux Store 정의
// configureStore 함수 사용
// store생성 및 다양한 설정
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
