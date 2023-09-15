'use client';
import { db } from '@/firebase/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import React, { useState, useCallback, useEffect } from 'react';

const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // getCollection 함수 생헝
  // useCallback으로 감싸줌 (콜백 함수를 메모이제이션)
  const getCollection = useCallback(() => {
    setIsLoading(true);
    try {
      // collection() 메서드
      // 첫 번째 파라미터: firebase.js 파일에 작성한 db 객체
      // 두 번째 파라미터: collectionName(firebase의 Firestore Database의 컬렉션 이름)
      const docRef = collection(db, collectionName);
      // query() 메서드
      // orderBy() 메서드 : 데이터를 지정한 필드에 따라 정렬
      // 첫 번째 파라미터: 정렬할 기준 필드 > "createdAt”을 사용해서 날짜를 기준으로 함
      // 두 번째 파라미터: 정렬 방향 > ‘’desc”(descending)을 사용해서 가장 나중에 저장된 데이터부터 차례로 함
      const q = query(docRef, orderBy('createdAt', 'desc'));
      // onSnapshot() 메서드
      // firebase의 Firestore Database에서 컬렉션의 변경사항을 감시하고 변경시 호출할 함수를 정의
      // 첫 번째 파라미터: 감시할 대상
      // 두 번째 파라미터 snapshot이 변경될 때 호출될 함수
      // map() 메서드를 사용해서 새로운 배열을 생성
      //  { id: doc.id, ...doc.data() } 이렇게 요소를 분류한 이유는 id의 사용이 더 편해지고, data의 구조 파악이 더 쉬움
      // allData에 담음
      onSnapshot(q, (snapshot) => {
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('allData', allData);
        // setState로 data state 동기화
        setData(allData);
        // setState로 isLoading state 동기화
        setIsLoading(false);
      });
    } catch (error) {
      // setState로 isLoading state 동기화
      setIsLoading(false);
      toast.error(error.message);
    }
  }, [collectionName]);

  // useEffect에 getCollection 함수
  useEffect(() => {
    getCollection();
  }, [getCollection]);

  // data와 isLoading을 반환
  return { data, isLoading };
};

export default useFetchCollection;
