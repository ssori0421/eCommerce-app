import React from 'react';
import styles from './Loader.module.scss';
import { RotatingLines } from 'react-loader-spinner';

const Loader = ({ basic }) => {
  /* 일부 컴포넌트에서 spinner를 보여주고 싶을 때 */
  if (basic) {
    return (
      <div className={styles.basicWrapper}>
        <RotatingLines
          strokeColor='grey'
          strokeWidth='5'
          animationDuration='0.75'
          width='30'
          visible={true}
        />
      </div>
    );
  }

  /* 페이지 중앙에 spinner를 보여주고 싶을 때 */
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <RotatingLines
          strokeColor='grey'
          strokeWidth='5'
          animationDuration='0.75'
          width='30'
          visible={true}
        />
      </div>
    </div>
  );
};

export default Loader;
