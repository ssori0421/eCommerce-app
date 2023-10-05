'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { toast } from 'react-toastify';

const useFetchDocument = (collectionName, documentID) => {
  const [document, setDocument] = useState(null);

  // getDocument 함수 생헝
  // useCallback으로 감싸줌 (콜백 함수를 메모이제이션)
  // async함수/await키워드를 사용해서 비동기 처리
  const getDocument = useCallback(async () => {
    const docRef = doc(db, collectionName, documentID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const obj = {
        id: documentID,
        ...docSnap.data(),
      };

      // setState로 document state에 동기화
      setDocument(obj);
    } else {
      toast.error('Document not found');
    }
  }, [collectionName, documentID]);

  // useEffect 사용
  // 자동실행
  useEffect(() => {
    getDocument();
  }, [getDocument]);

  return { document };
};

export default useFetchDocument;
