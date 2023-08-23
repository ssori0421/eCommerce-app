'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LogoPath from '@/assets/colorful.svg';
import styles from './Auth.module.scss';
import Loader from '@/components/loader/Loader';
import Input from '@/components/input/Input';
import AutoSigninCheckbox from '@/components/autoSigninCheckbox/AutoSigninCheckbox';
import Button from '@/components/button/Button';
import Link from 'next/link';
import Divider from '@/components/divider/Divider';
import { toast } from 'react-toastify';
import { auth } from '@/firebase/firebase';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

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

  // 로그인 버튼을 클릭했을 때 호출되는 함수
  const loginUser = (e) => {
    e.preventDefault();
    toast.info('성공!');
    // Loader 컴포넌트 보이도록 함
    setIsLoading(true);
    // firebase의 signInWithEmailAndPassword()함수를 사용
    signInWithEmailAndPassword(auth, email, password)
      // 로그인 성공시
      .then(() => {
        // Loader 컴포넌트 숨김
        setIsLoading(false);
        toast.success('로그인에 성공했습니다.');
        // 홈 화면으로 이동
        redirectUser();
      })
      .catch((error) => {
        // Loader 컴포넌트 숨김
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  // 구글 로그인 버튼을 클릭했을 때 호출되는 함수
  const signInWithGoogle = (e) => {
    e.preventDefault();
    // 인스턴스 생성
    const provider = new GoogleAuthProvider();
    // firebase의 signInWithPopup()함수를 사용해서 구글 로그인 프로세스 시작
    signInWithPopup(auth, provider)
      // 구글 로그인 성공시
      .then((result) => {
        toast.success('로그인에 성공했습니다.');
        // 홈 화면으로 이동
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
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

              <Link href={'/reset'} className={styles.findLink}>
                비밀번호 수정하기
                <svg
                  width='11'
                  height='18'
                  viewBox='0 0 11 18'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className={styles.findLinkArrow}
                >
                  <path
                    d='M1.5 1L9.5 9L1.5 17'
                    stroke='#0074E9'
                    strokeWidth='2'
                  />
                </svg>
              </Link>
            </div>
            <div className={styles.buttonGroup}>
              {/* Button 컴포넌트에 prop으로 전달 */}
              <Button type='submit' width='100%'>
                로그인
              </Button>
              <Divider />
              <Button width='100%' secondary>
                <Link href={'/register'}>회원가입</Link>
              </Button>
              <Divider />
            </div>
            <div>
              <Button onClick={signInWithGoogle}>구글 로그인</Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginClient;
