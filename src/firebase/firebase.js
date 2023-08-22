// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCYWvjOpzBPom3cOm0t2xuKr3mIEMGDSrc',
  authDomain: 'react-next-ecommerce-app.firebaseapp.com',
  projectId: 'react-next-ecommerce-app',
  storageBucket: 'react-next-ecommerce-app.appspot.com',
  messagingSenderId: '56775194810',
  appId: '1:56775194810:web:14804b77d8f1273bc02a83',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// 인증, 데이터베이스, 스토리지에서 사용할 객체들을 생성
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
