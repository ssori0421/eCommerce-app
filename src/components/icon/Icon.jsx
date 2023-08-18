import React from 'react';

import letterPath from './images/shape=letter.svg';
import lockPath from './images/shape=lock.svg';
import showPath from './images/shape=show.svg';
import hidePath from './images/shape=hide.svg';
import Image from 'next/image';

// type, alt(없으면 ''값으로), 나머지 prop들을 props로 내려줘서
// switch/case 문을 사용해서 type에 따라 4종류의 아이콘을 보여줌
const Icon = ({ type, alt = '', ...restProps }) => {
  let src = '';

  switch (type) {
    case 'letter':
      src = letterPath;
      break;
    case 'lock':
      src = lockPath;
      break;
    case 'show':
      src = showPath;
      break;
    case 'hide':
      src = hidePath;
      break;
    default:
      throw new Error('지원하는 아이콘 타입이 존재하지 않습니다.');
  }

  return <Image src={src} alt={alt} {...restProps} />;
};

export default Icon;
