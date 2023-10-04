'use client';
import React from 'react';
import styles from './ProductItem.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import priceFormat from '@/utils/priceFormat';
import rocketBadgeIcon from '@/assets/badge-rocket.svg';
import { Rating } from 'react-simple-star-rating';

const ProductItem = ({ id, name, price, imageURL }) => {
  const shortenText = (text, n) => {
    // name의 길이가 n 이상인 경우 n개까지 자르고 말줄임표
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat('...');
      return shortenedText;
    }
    // 그렇지 않은 경우 그대로 사용
    return text;
  };

  return (
    <div className={styles.grid}>
      <Link href={`/product-details/${id}`}>
        <div className={styles.img}>
          <Image src={imageURL} alt={name} width={265} height={265} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          {/* 상품명 - shortenText 함수를 사용해서 name을 최대 10글자로 줄임 */}
          <p>{shortenText(name, 10)}</p>
          {/* 가격 */}
          <em>
            <strong style={{ color: '#cb1400' }}>{priceFormat(price)}</strong>원
            {''}
            <Image src={rocketBadgeIcon} alt='로켓배송' />
          </em>
          <div className={styles.rating}>
            {/* 평점 */}
            <Rating size={17} readonly initialValue={1} />
            {/* 상품평 개수 */}
            <span className={styles.ratingCount}>{3}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
