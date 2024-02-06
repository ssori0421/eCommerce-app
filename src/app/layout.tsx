import ToastProvider from '@/components/toastProvider/ToastProvider';
import './globals.css';
import { Inter } from 'next/font/google';
import Footer from '@/layouts/footer/Footer';
import Header from '@/layouts/header/Header';
import Providers from '@/redux/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next-eCommerce-app',
  description: 'Next.js로 구축해보는 eCommerce-app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          {/* Provider 컴포넌트 내부가 모두 children*/}
          <Header />
          <ToastProvider />
          {/* ToastProvider 컴포넌트 내부가 모두 children*/}
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
