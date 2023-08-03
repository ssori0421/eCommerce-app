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

  return (
    <section>
      <div>
        <h1>
          <Image src={LogoPath} alt='logo' />
        </h1>
        <form>
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
