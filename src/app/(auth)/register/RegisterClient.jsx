'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../login/Auth.module.scss';
import Loader from '@/components/loader/Loader';
import Input from '@/components/input/Input';
import Button from '@/components/button/Button';
import Divider from '@/components/divider/Divider';
import Link from 'next/link';
import LogoPath from '@/assets/colorful.svg';

const RegisterClient = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // confirmPassword (비밀번호 확인)
  const [cPassword, setCPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // router 객체 생성
  const router = useRouter();

  // 로그인
  // submit 이벤트가 발생했을 때 새로고침되는 default동작을 prevent
  const registerUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    /* firebase를 위한 소스코드 */
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.logo}>
            <Image src={LogoPath} alt='logo' width={247} />
          </h1>
          <form className={styles.form} onSubmit={registerUser}>
            {/* email input-input 컴포넌트에 prop으로 전달 */}
            <Input
              email
              icon='letter'
              id='email'
              name='email'
              label='이메일'
              placeholder='아이디(이메일)'
              className={styles.control}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* password input-input 컴포넌트에 prop으로 전달 */}
            <Input
              password
              icon='lock'
              id='password'
              name='password'
              label='비밀번호'
              placeholder='비밀번호'
              className={styles.control}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              password
              icon='lock'
              id='password'
              name='password'
              label='비밀번호 확인'
              placeholder='비밀번호 확인'
              className={styles.control}
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            />

            <div className={styles.buttonGroup}>
              {/* Button 컴포넌트에 prop으로 전달 */}
              <Button type='submit' width='100%'>
                회원가입
              </Button>
              <Divider />
              <Button width='100%' secondary>
                <Link href={'/login'}>로그인</Link>
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default RegisterClient;
