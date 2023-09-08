'use client';
import React, { useState, useCallback, useEffect } from 'react';
import sliderData from './SliderData';
import styles from './Slider.module.scss';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Image from 'next/image';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0); // [0, 1, 2]
  const sliderLength = sliderData.length; // 3

  // intervalTimedms 5000ms(5초)
  const intervalTime = 5000;

  // AiOutlineArrowRight을 클릭하면 nextSlide 함수가 호출됨
  // useCallback으로 감싸줘서 deps가 변경될때에만 함수가 재생성 되도록 함
  // currentSlide 값을 업데이트 함
  const nextSlide = useCallback(() => {
    setCurrentSlide(currentSlide === sliderLength - 1 ? 0 : currentSlide + 1);
  }, [currentSlide, sliderLength]);

  // AiOutlineArrowLeft을 클릭하면 nextSlide 함수가 호출됨
  // useCallback으로 감싸줘서 deps가 변경될때에만 함수가 재생성 되도록 함
  // currentSlide 값을 업데이트 함
  const prevSlide = useCallback(() => {
    setCurrentSlide(currentSlide === 0 ? sliderLength - 1 : currentSlide - 1);
  }, [currentSlide, sliderLength]);

  // useEffect 사용
  // 자동 슬라이드 기능
  useEffect(() => {
    // setInterval 함수 사용
    // intervalTime이 지나면 콜백함수인 nextSlide를 호출함
    const interval = setInterval(nextSlide, intervalTime);
    // useEffect 안에 return 문(componenetWillUnmount 역할)
    // 컴포넌트가 unmount될 때 호출됨
    // clearInterval 함수 사용
    // slider 컴포넌트가 사용되지 않을 경우에는 interval을 제거해줌
    return () => {
      clearInterval(interval);
    };
  }, [nextSlide]);

  return (
    <div className={styles.slider}>
      <AiOutlineArrowLeft
        className={`${styles.slide} ${styles.prev}`}
        onClick={prevSlide}
      />
      <AiOutlineArrowRight
        className={`${styles.slide} ${styles.next}`}
        onClick={nextSlide}
      />
      {/* map 메서드를 사용해서 sliderData를 순회 */}
      {sliderData.map((slider, index) => {
        // 구조 분해 할당
        const { image, heading } = slider;

        return (
          // 조건부 스타일링
          <div
            key={heading}
            className={
              index === currentSlide
                ? `${styles.slide} ${styles.current}`
                : `${styles.slide}`
            }
          >
            {index === currentSlide ? (
              <Image src={image} alt={heading} fill />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
