'use client';
import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { usePathname } from 'next/navigation';
import InnerHeader from '../innerHeader/InnerHeader';
import { useDispatch } from 'react-redux';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '@/redux/slice/authSlice';

const Header = () => {
  const pathname = usePathname();
  // dispatch 함수 가져오기
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState('');
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // displayName이 없는 경우 email을 이용해서 displayName을 만들어줌
        if (user.displayName === null) {
          const u1 = user.email.substring(0, user.email.indexOf('@'));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        } else {
          // 구글 로그인 유저
          setDisplayName(user.displayName);
        }
        // 유저 정보를 리덕스 스토어에 저장하기
        // dispatch 함수를 사용해서 액션 생성자 함수를 reducer에 전달
        dispatch(
          SET_ACTIVE_USER({
            // 아래의 인자들은 action.payload로 들어감
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        // 로그아웃한 유저
        setDisplayName('');
        // 유저 정보를 리덕스 스토어에서 지우기
        // dispatch 함수를 사용해서 액션 생성자 함수를 reducer에 전달
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
    // dispatch나 displayName가 바뀌면 useEffect 내부가 다시 호출되도록 함
  }, [dispatch, displayName]);

  // firebase를 사용해서 로그아웃 함수 작성
  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success('로그아웃 되었습니다.');
        Router.push('/');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // path가 register, login, reset에서는 Header 컴포넌트가 보이지 않도록 함
  if (
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/reset'
  ) {
    return null;
  }

  return (
    <header>
      <div className={styles.loginBar}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link href={'/login'}>로그인</Link>
          </li>
          <li className={styles.item}>
            <Link href={'/admin/dashboard'}>관리자</Link>
          </li>
          <li className={styles.item}>
            <Link href={'/order-history'}>주문 목록</Link>
          </li>
          <li className={styles.item}>
            <Link href={'/'} onClick={logoutUser}>
              로그아웃
            </Link>
          </li>
          <li className={styles.item}>
            <Link href={'/'}>제휴 마케팅</Link>
          </li>
          <li className={styles.item}>
            <Link href={'/'}>쿠팡 플레이</Link>
          </li>
          <li className={styles.item}>
            <Link href={'/order-history'}>고객센터</Link>
          </li>
        </ul>
      </div>
      {/* admin 관련 path일 경우에는 InnerHeader 컴포넌트가 보이지 않도록 함 */}
      {pathname.startsWith('/admin') ? null : <InnerHeader />}
    </header>
  );
};

export default Header;
