# 🛒 Next-eCommerce-app

## 1. Introduction 👩🏻‍🦰

`Next.js`로 구축해보는 eCommerce-app 입니다.

Coupang 애플리케이션 클론코딩 및 `CI/CD 구축`

|                                                        회원가입 & 로그인                                                        |                                                    메인                                                     |                                                         상품 상세 & 장바구니                                                         |
| :-----------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------: |
| ![회원가입   로그인](https://github.com/ssori0421/Study-Record/assets/115159126/72df0cf1-f84c-48b9-9eb2-0016ff0c85f9) | ![메인](https://github.com/ssori0421/Study-Record/assets/115159126/7e3f71e3-0150-4dda-a612-20f2a62b8b97) | ![상품 상세   장바구니](https://github.com/ssori0421/Study-Record/assets/115159126/0dd8f88e-6992-4734-9756-a1efee36df07) |

## 2. Deploy 💻

[서비스 바로가기](http://next-coupang-app-env.eba-kbg3p7u6.ap-northeast-2.elasticbeanstalk.com/)

## 3. 디렉토리 구조 📂

```
eCommerce-app
├─ src
│  ├─ app
│  │  ├─ (auth)
│  │  │  ├─ login
│  │  │  ├─ register
│  │  │  └─ reset
│  │  ├─ (checkout)
│  │  │  ├─ checkout
│  │  │  ├─ checkout-address
│  │  │  └─ checkout-success
│  │  ├─ (home)
│  │  ├─ (order)
│  │  │  ├─ order-details
│  │  │  │  └─ [id]
│  │  │  └─ order-history
│  │  ├─ admin
│  │  │  ├─ add-product
│  │  │  ├─ all-products
│  │  │  ├─ dashboard
│  │  │  ├─ edit-products
│  │  │  │  └─ [id]
│  │  │  ├─ order-details
│  │  │  │  └─ [id]
│  │  │  └─ orders
│  │  ├─ cart
│  │  ├─ contact
│  │  ├─ product-details
│  │  │  └─ [id]
│  │  └─ review-product
│  │     └─ [id]
│  ├─ assets
│  ├─ components
│  │  ├─ autoSigninCheckbox
│  │  ├─ button
│  │  ├─ changeOrderStatus
│  │  ├─ chart
│  │  ├─ checkbox
│  │  ├─ checkoutForm
│  │  ├─ checkoutSummary
│  │  ├─ divider
│  │  ├─ heading
│  │  ├─ icon
│  │  ├─ infoBox
│  │  ├─ input
│  │  ├─ loader
│  │  ├─ pagination
│  │  ├─ product
│  │  │  ├─ productFilter
│  │  │  ├─ productItem
│  │  │  ├─ productList
│  │  │  └─ productReviewItem
│  │  ├─ slider
│  │  ├─ toastProvider
│  │  └─ tooltip
│  ├─ firebase
│  ├─ hooks
│  ├─ layouts
│  │  ├─ footer
│  │  ├─ header
│  │  ├─ innerHeader
│  │  └─ navbar
│  ├─ redux
│  │  ├─ provider.jsx
│  │  ├─ slice
│  │  └─ store.js
│  └─ utils
│     ├─ dayjs.js
│     └─ priceFormat.js
└─ yarn.lock

```

## 4. 구현 기능 👩🏻‍💻

- **GIthub Actions**를 기반으로 **CI/CD 파이프라인 구축**
  - `Github Actions`를 사용해 main 브랜치에 push 발생시 `코드의 지속 통합 및 배포`가 이뤄지도록 함.
  - `Docker`를 사용해서 `애플리케이션 컨테이너화`.
    - `멀티 스테이지 도커 빌드`(빌드 스테이지 분리)를 활용하여 `도커 이미지를 최적화`시킴.
  - `AWS의 Elastic BeansTalk`를 사용해 `AWS의 EC2 인스턴스`에 컨테이너를 배포.
- **Redux Toolkit** 라이브러리를 사용해 **전역 상태 관리**
  - 유저 정보 및 장바구니 데이터 관리.
  - 상품 검색 및 조건별/가격별 상품 필터링 기능 구현.
  - 배송지 주소 관련 데이터 관리.
- 회원가입/로그인 페이지, 상품 생성 페이지 기능 개발
  - `Firebase`를 사용해 `유저 정보 및 상품 데이터를 저장`하고 불러오도록 함.
- 상품 리스트 페이지 기능 개발
  - 상품 검색 및 조건별 상품 필터링 기능 구현.
  - Pagination 기능 구현.
- 상품 상세 페이지, 장바구니 페이지, 주소 입력 페이지 기능 개발
<div align=center><h2>STACKS 📚</h2></div>

<div align=center> 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">

  <img src="https://img.shields.io/badge/NEXT.JS-000000?style=for-the-badge&logo=NEXT.JS&logoColor=black">
  <img src="https://img.shields.io/badge/TYPESCRIPT-3178C6?style=for-the-badge&logo=TYPESCRIPT&logoColor=black">
  <img src="https://img.shields.io/badge/FIREBASE-FFCA28?style=for-the-badge&logo=FIREBASE&logoColor=black">

  <img src="https://img.shields.io/badge/REDUX-764ABC?style=for-the-badge&logo=REDUX&logoColor=black">
  <img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=SCSS&logoColor=black">
  <img src="https://img.shields.io/badge/GITHUB ACTIONS-2088FF?style=for-the-badge&logo=GITHUB ACTIONS&logoColor=black">
  <img src="https://img.shields.io/badge/DOCKER-2496ED?style=for-the-badge&logo=DOCKER&logoColor=black">

  <img src="https://img.shields.io/badge/AMAZON EC2-FF9900?style=for-the-badge&logo=AMAZON EC2&logoColor=black">
  <img src="https://img.shields.io/badge/AMAZON ELASTIC BEANSTALK-CC6699?style=for-the-badge&logo=AMAZON ELASTIC BEANSTALK&logoColor=black">
  <img src="https://img.shields.io/badge/AMAZON IAM-569A31?style=for-the-badge&logo=AMAZON IAM&logoColor=black">
</div>

<div align=center><h2>Git Convention 🖍️</h2></div>

| 태그     | 설명                                                                        |
| -------- | --------------------------------------------------------------------------- |
| feat:    | 새로운 기능을 추가할 경우                                                   |
| chore    | 패키지 매니저 설정 등 여러가지 기능과 무관한 부분 들을 수정, 추가 하는 경우 |
| error:   | 버그를 고친경우                                                             |
| HOTFIX:  | 치명적인 버그 수정, 운영중 빠른 수정이 필요한 경우                          |
| design   | CSS 등 사용자 UI 디자인 변경                                                |
| style    | 코드 포맷 변경, 세미콜론 누락 등 기능상의 코드 수정이 없는 경우             |
| comment  | 주석 추가 및 변경                                                           |
| docs     | 문서를 수정한 경우                                                          |
| refactor | 프로덕션 코드 리팩토링                                                      |
| rename   | 파일명을 수정하거나 옮기는 작업                                             |
| remove   | 파일을 삭제하는 작업                                                        |
| test     | Test코드 추가                                                               |
