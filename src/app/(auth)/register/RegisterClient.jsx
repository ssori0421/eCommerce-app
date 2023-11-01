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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '@/firebase/firebase';

const RegisterClient = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // confirmPassword (비밀번호 확인)
  const [cPassword, setCPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // router 객체 생성
  const router = useRouter();

  // 회원가입 버튼을 클릭했을 때 호출되는 함수
  const registerUser = (e) => {
    e.preventDefault();
    // 비밀번호가 비밀번호 확인과 일치하지 않을 경우
    if (password !== cPassword) {
      return toast.error('비밀번호가 일치하지 않습니다.');
    }
    // Loader 컴포넌트 보이도록 함
    setIsLoading(true);
    // firebase의 createUserWithEmailAndPassword()함수를 사용
    // userCredential : 회원가입 성공시 firebase에 저장된 유저 정보를 담은 객체
    // auth는 firebase.js 파일에서 생성한 인증에 필요한 객체
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // userCredential 객체에서 user feild를 user 변수에 담음
        const user = userCredential.user;
        // Loader 컴포넌트 숨김
        setIsLoading(false);

        toast.success('등록 성공...');
        // router.push 메서드를 사용해서 login 페이지로 이동
        router.push('/login');
      })
      .catch((error) => {
        setIsLoading(false);
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
