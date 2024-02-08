'use client';
import React, { useState, useCallback, useEffect } from 'react';
import {
  query,
  collection,
  where,
  getDocs,
  WhereFilterOp,
  DocumentData,
} from 'firebase/firestore';
import { db } from '@/firebase/firebase';

const useFetchDocuments = (
  collectionName: string,
  arg: [string, WhereFilterOp, string]
) => {
  const [documents, setDocuments] = useState<DocumentData[]>([]);

  const getDocuments = useCallback(async () => {
    const q = query(
      collection(db, collectionName),
      where(arg[0], arg[1], arg[2])
    );

    const querySnapshot = await getDocs(q);

    let documentsArray: DocumentData[] = [];

    querySnapshot.forEach((doc) => {
      const data = {
        id: doc.id,
        ...doc.data(),
      };
      documentsArray.push(data);
    });

    setDocuments(documentsArray);
  }, [collectionName, arg[0], arg[1], arg[2]]);

  useEffect(() => {
    getDocuments();
  }, [getDocuments]);

  return { documents };
};

export default useFetchDocuments;
