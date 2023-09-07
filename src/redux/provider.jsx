'use client';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

// children을 prop으로 받아와서 사용
const Providers = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
