'use client';
import React from 'react';
import styles from './ProductItem.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import priceFormat from '@/utils/priceFormat';
import rocketBadgeIcon from '@/assets/badge-rocket.svg';
import { Rating } from 'react-simple-star-rating';
import useFetchDocuments from '../../../hooks/useFetchDocuments';

const ProductItem = ({ id, name, price, imageURL }) => {
  // // useFetchDocuments() 커스텀 훅 호출
  // // firebase의 Firestore Datebase의 'revuews' 컬렉션을 인자로 전달
  // // 반환값인 document를 받음
  // const { documents } = useFetchDocuments('reviews', ['productID', '==', id]);

  // let productRating = 0;
  // // map() 사용
  // // documents 배열을 순회하면서 한 상품의 리뷰 점수를 모두 더함
  // documents.map((doc) => {
  //   productRating = productRating + doc.rate;
  // });

  // // 평점 = 한 상품의 전체 리뷰 점수 / 리뷰 개수
  // const rating = productRating / documents.length;

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
            <Rating
              size={17}
              readonly
              initialValue={1}
              // // 리뷰가 없을 경우 rating이 NaN이 나오는데 이 경우 평점을 0을 주고, 아닐 경우 rating을 줌
              // initialValue={Number.isNaN(rating) ? 0 : rating}
            />
            {/* 상품평 개수 */}
            <span className={styles.ratingCount}>{1}</span>
            {/* <span className={styles.ratingCount}>({documents.length})</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
