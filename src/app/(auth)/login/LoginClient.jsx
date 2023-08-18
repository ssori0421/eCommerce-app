'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LogoPath from '@/assets/colorful.svg';
import styles from './Auth.module.scss';
import Loader from '@/components/loader/Loader';
import Input from '@/components/input/Input';
import AutoSigninCheckbox from '@/components/autoSigninCheckbox/AutoSigninCheckbox';

const LoginClient = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoLogin, setIsAutoLogin] = useState(false);

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
    <>
      {isLoading && <Loader />}
      <section className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.logo}>
            <Image src={LogoPath} alt='logo' width={247} />
          </h1>
          <form className={styles.form} onSubmit={loginUser}>
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
            <div className={styles.group}>
              {/* AutoSigninCheckbox 컴포넌트에 prop으로 전달 */}
              <AutoSigninCheckbox
                checked={isAutoLogin}
                onChange={(e) => setIsAutoLogin(e.target.checked)}
              />
              자동 로그인, 비밀번호 수정
            </div>
            <div className={styles.buttonGroup}>
              {/* Button */}
              Button
            </div>
            <div>
              {/* Button */}
              Button
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginClient;
