'use client';
import React, { useState } from 'react';
import styles from './AddProduct.module.scss';
import { useRouter } from 'next/navigation';
import Loader from '@/components/loader/Loader';
import Heading from '@/components/heading/Heading';
import Button from '@/components/button/Button';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage, db } from '@/firebase/firebase';
import { toast } from 'react-toastify';
import { Timestamp, addDoc, collection } from 'firebase/firestore';

const categories = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Electronics' },
  { id: 3, name: 'Fashion' },
  { id: 4, name: 'Phone' },
  { id: 5, name: 'Movies & Television' },
  { id: 6, name: 'Home & Kitchen' },
  { id: 7, name: 'Automotive' },
  { id: 8, name: 'Software' },
  { id: 9, name: 'Video Games' },
  { id: 10, name: 'Sports & Outdoor' },
  { id: 11, name: 'Toys & Games' },
  { id: 12, name: 'Industrial & Scientific' },
];

const initialState = {
  name: '',
  imageURL: '',
  price: 0,
  category: '',
  brand: '',
  desc: '',
};

const AddProductClient = () => {
  const [product, setProduct] = useState({ ...initialState });
  // 이미지를 업로드 진행률을 담은 state (0~100%)
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // 페이지 이동
  const router = useRouter();

  const handleInputChange = (e) => {
    // 구조 분해 할당
    const { name, value } = e.target;
    // setState로 product state에 동기화
    // spread 연산자 사용
    // 원래 initialState 다 넣어주고, 작성중인 input field만 value값으로 넣어서 업데이트
    setProduct({ ...product, [name]: value });
  };

  // 파일 선택 버튼 클릭시 실행되는 함수
  // firebase Storage에 이미지를 업로드
  const handleImageChange = (e) => {
    // 업로드한 파일
    const file = e.target.files[0];
    // ref() 메서드
    // 첫 번째 파라미터: firebase.js 파일에서 생성한 storage 객체
    // 두 번째 파라미터: url (날짜와 파일이름으로 업로드한 이미지의 name을 설정함)
    const storageRef = ref(storage, `images/${Date.now()}${file.name}`);

    // uploadBytesResumable() 메서드
    // 첫 번째 파라미터: ref
    // 두 번째 파라미터: data
    const uploadTask = uploadBytesResumable(storageRef, file);

    // uploadTask.on()메서드
    // 첫 번째 파라미터: snapshot 처리
    // 두 번째 파라미터: error시 처리
    // 세 번째 파라미터: complete시 처리
    uploadTask.on(
      'state_change',
      (snapshot) => {
        // 이미지 업로드 진행률
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // setState로 uploadProgress state에 동기화
        setUploadProgress(progress);
      },
      // 에러 발생시
      // toast 메세지 띄움
      (error) => {
        toast.error(error.message);
      },

      // 업로드 성공시
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // setState로 product state에 동기화
          // spread 연산자를 사용해서 product state를 가져온 다음 imageURL만 downloadURL로 덮어쒸움
          setProduct({ ...product, imageURL: downloadURL });
          // toast 메세지 띄움
          toast.success('이미지를 성공적으로 업로드했습니다.');
        });
      }
    );
  };

  // 상품 생성 버튼 클릭시 실행되는 함수
  // firebase의 Firestore Database에 상품 정보가 저장됨
  const addProduct = (e) => {
    // form 태그 사용시  e.preventDefault() 반드시 사용하기
    e.preventDefault();
    setIsLoading(true);
    try {
      // addDoc() 메서드
      // addDoc() 메서드의 첫 번째 파라미터: collection() 메서드
      // addDoc() 메서드의 두 번째 파라미터: 객체 > firebase Firestore Database의 products collection의 feild에 추가됨
      // collection() 메서드
      // 첫 번째 파라미터: firebase.js 파일에 만들어둔 db 객체
      // 두 번째 파라미터: firebase FireStore Database에 생성할 collection 이름("products")
      addDoc(collection(db, 'products'), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });
      // setState로 isLoading state에 동기화
      setIsLoading(false);
      // setState로 uploadProgress state에 동기화
      setUploadProgress(0);
      // setState로 product state에 동기화
      // spread 연산자를 사용해서 initialState를 가져옴
      setProduct({ ...initialState });
      // toast 메세지 띄움
      toast.success('상품을 저장했습니다.');
      // 페이지 이동
      router.push('/admin/all-products');
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* isLoading이 true일때만 Loader 컴포넌트 렌더링 */}
      {isLoading && <Loader />}

      <div className={styles.product}>
        <Heading title='새 상품 생성하기' />
        <form onSubmit={addProduct}>
          {/* 상품 이름 input */}
          <label>상품 이름:</label>
          <input
            type='text'
            placeholder='상품 이름'
            required
            name='name'
            value={product.name}
            onChange={(e) => handleInputChange(e)}
          />

          <div>
            {/* 상품 이미지 업로드 */}
            {uploadProgress === 0 ? null : (
              <div className={styles.progress}>
                <div
                  className={styles['progress-bar']}
                  style={{ width: `${uploadProgress}%` }}
                >
                  {uploadProgress < 100
                    ? `Uploading... ${uploadProgress}`
                    : `Upload Complete ${uploadProgress}%`}
                </div>
              </div>
            )}

            <input
              type='file'
              placeholder='상품 이미지'
              // 이미지 파일만 받음
              accept='image/*'
              name='image'
              required
              onChange={(e) => handleImageChange(e)}
            />

            {product.imageURL === '' ? null : (
              <input
                type='text'
                name='imageURL'
                disabled
                value={product.imageURL}
                required
                placeholder='이미지 URL'
              />
            )}
          </div>

          {/* 상품 가격 input */}
          <label>상품 가격:</label>
          <input
            type='number'
            placeholder='상품 가격'
            required
            name='price'
            value={product.price}
            onChange={(e) => handleInputChange(e)}
          />

          {/* 상품 카테고리 선택 */}
          <label>상품 카테고리:</label>
          <select
            required
            name='category'
            value={product.category}
            onChange={(e) => handleInputChange(e)}
          >
            <option value='' disabled>
              --상품 카테고리 선택
            </option>
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              );
            })}
          </select>

          {/* 상품 브랜드/회사 input */}
          <label>상품 브랜드/회사:</label>
          <input
            type='text'
            placeholder='상품 브랜드/회사'
            name='brand'
            value={product.brand}
            onChange={(e) => handleInputChange(e)}
          />

          {/* 상품 설명 */}
          <label>상품 설명:</label>
          <textarea
            name='desc'
            value={product.desc}
            cols={10}
            rows={10}
            required
            onChange={(e) => handleInputChange(e)}
          ></textarea>
          <Button type='submit'>상품 생성</Button>
        </form>
      </div>
    </>
  );
};

export default AddProductClient;
