'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import LogoPath from '@/assets/colorful.svg';

const LoginClient = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isQutoLogin, setIsAutoLogin] = useState(false);

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
