'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

const useFetchDocuments = (collectionName, arg) => {
  const [documents, setDocuments] = useState([]);

  // getDocuments()함수 생성
  // useCallback으로 감싸줌 (콜백 함수를 메모이제이션)
  // async함수/await키워드를 사용해서 비동기 처리
  const getDocuments = useCallback(async () => {
    // query() 함수를 사용해서 쿼리 객체 q 생성
    // 첫 번째 파라미터: Firestore Datebase의 컬렉션 이름
    // 두 번째 파라미터: 조건 설정
    const q = query(
      collection(db, collectionName),
      where(arg[0], arg[1], arg[2])
    );

    const querySnapshot = await getDocs(q);

    let documentsArray = [];

    // forEach() 함수 사용
    // querySnapshot 배열을 순회하면서 데이터를 추출해서 documentsArray 배열에 추가
    querySnapshot.forEach((doc) => {
      documentsArray.push(doc.data());
    });

    // setState로 document state에 동기화
    setDocuments(documentsArray);
    // 의존성 배열에 arg 배열을 넣게 되면 useCallback 내부가 무한 반복됨
  }, [collectionName, arg[0], arg[1], arg[2]]);

  useEffect(() => {
    getDocuments();
  }, [getDocuments]);

  return { documents };
};

export default useFetchDocuments;
