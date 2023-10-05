'use client';
import useFetchDocument from '@/hooks/useFetchDocument';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import styles from './ProductDetailsClient.module.scss';
import Loader from '@/components/loader/Loader';
import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';
import Divider from '@/components/divider/Divider';
import priceFormat from '@/utils/priceFormat';
import listCashIcon from '@/assets/list-cash-icon.png';
import Button from '@/components/button/Button';
import useFetchDocuments from '@/hooks/useFetchDocuments';
import ProductReviewItem from '@/components/product/productReviewItem/ProductReviewItem';

const ProductDetailClient = () => {
  // useParams() 훅을 사용해서 URL의 queryParam을 가져와서 id에 당음
  const { id } = useParams();

  // useFetchDocument() 커스텀 훅 호출
  // firebase의 Firestore Database의 'products' 컬렉션과 id를 인자로 전달
  // 반환값인 document를 받아서 product라는 이름으로 사용
  const { document: product } = useFetchDocument('products', id);
  console.log('product', product);

  // useFetchDocuments() 커스텀 훅 호출
  // firebase의 Firestore Database의 'reviews' 컬렉션과 데이터 겁색 조건을 인자로 전달
  // 반환값인 document를 받아서 reviews라는 이름으로 사용
  const { documents: reviews } = useFetchDocuments('reviews', [
    'productID',
    '==',
    id,
  ]);
  console.log('reviews', reviews);

  const [count, setCount] = useState(1);

  // 장바구니 담기 버튼 클릭시 장바구니에 담는 함수
  const addToCart = () => {};

  // 배송 일자를 표시해주기 위해 필요한 변수들
  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1));

  const tomorrowDate = tomorrow.getDate();
  const tomorrowMonth = tomorrow.getMonth();

  return (
    <section className={styles.product}>
      {product === null ? (
        <Loader />
      ) : (
        <>
          <div className={styles.details}>
            <div className={styles.img}>
              <Image
                width={477}
                height={410}
                src={product.imageURL}
                alt={product.name}
                priority
              />
            </div>
            <div className={styles.content}>
              <div className={styles.header}>
                <p className={styles.brandName}>{product.brand}</p>
                <p className={styles.productName}>{product.name}</p>
                <div className={styles.rating}>
                  <Rating initialValue={3} size={17} />
                  <span className={styles.count}>10,000개 상품평</span>
                </div>
              </div>

              <Divider space={0} />

              <div className={styles.container}>
                <p className={styles.price}>{priceFormat(product.price)}원</p>

                <div className={styles.rewardCashBadge}>
                  <Image src={listCashIcon} alt='cash-icon' width={12} />
                  <span>최대 {product.price / 10}원 적립</span>
                </div>
              </div>

              <Divider space={0} />

              <div className={styles.rewardCashWrapper}>
                <div className={styles.rewardSummary}>
                  <Image src={listCashIcon} alt='cash-icon' width={15} />
                  <p>
                    캐시적립 혜택<span>|</span> 최대{' '}
                    <strong>{product.price / 10}</strong>원 적립
                  </p>
                </div>

                <div className={styles.rewardCashPromotion}>
                  <p> 쿠페이 머니 결제 시 1% 적립</p>
                  <p>[로켓와우 + 쿠페이 계좌이체] 결제 시 2% 적립</p>
                  <p>[로켓와우 + 쿠페이 머니] 결제 시 4% 추가적립</p>
                  <button>로켓와우 무료체험 신청하기</button>
                </div>
              </div>

              <Divider space={0} />

              <div className={styles.bottom}>
                <p className={styles.price}>{product.price * count}원</p>

                <div className={styles.count}>
                  <Button
                    onClick={() => setCount((prev) => prev - 1)}
                    disabled={count > 1 ? false : true}
                    secondary
                  >
                    -
                  </Button>
                  <p>
                    <b>{count}</b>
                  </p>
                  <Button
                    secondary
                    onClick={() => setCount((prev) => prev + 1)}
                  >
                    +
                  </Button>

                  <Button onClick={() => addToCart()}>장바구니 담기</Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className={styles.card}>
        <h3>상품평 ({reviews.length})</h3>
        <div>
          {reviews.length === 0 ? (
            <p className={styles.noReviewText}>
              해당 상품에 대한 상품평이 아직 없습니다.
            </p>
          ) : (
            <>
              {reviews.map((item) => {
                return (
                  <ProductReviewItem
                    key={item.id}
                    rate={item.rate}
                    review={item.review}
                    reviewDate={item.reviewDate}
                    userName={item.userName}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetailClient;
