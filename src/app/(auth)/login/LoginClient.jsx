'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import LogoPath from '@/assets/colorful.svg';

const LoginClient = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isQutoLogin, setIsAutoLogin] = useState(false);

  // router 객체 생성
  const router = useRouter();

  // push()메서드를 사용해서 원하는 path로 라우팅
  const redirectUser = () => {
    router.push('/');
  };

  // 로그인
  // submit 이벤트가 발생했을 때 새로고침되는 default동작을 prevent
  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    /* firebase를 위한 소스코드 */
  };

  // Google 로그인
  const signInWithGoogle = () => {
    /* firebase를 위한 소스코드 */
  };

  return (
    <section>
      <div>
        <h1>
          <Image src={LogoPath} alt='logo' />
        </h1>
        <form onSubmit={loginUser}>
          {/* Input */}
          <div>{/* 자동 로그인, 비밀번호 수정 */}</div>
          <div>{/* Button */}</div>
          <div>{/* Button */}</div>
        </form>
      </div>
    </section>
  );
};

export default LoginClient;
