# 맵시 내비게이션 웹 프론트

## 사용 스택

- 언어 : HTML, CSS, Type Script
- 프레임워크 : Next.js 13

## 구조

### app 폴더 ( 화면 및 기능 코드 )

```tsx
📦app //최상위 폴더
 ┣ 📂(route) //라우팅 폴더 -> ex) localhost/bulkPurchase
 ┃ ┣ 📂bulkPurchase //대량구매
 ┃ ┃ ┣ 📜page.module.css
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂download //다운로드/자료실(고객지원)
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂faq //FAQ(고객지원)
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂inquirySubmit //1:1 문의하기 Form
 ┃ ┃ ┣ 📜inquirySubmit.module.css
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂login //로그인
 ┃ ┃ ┣ 📂_components //재사용 코드 컴포넌트화
 ┃ ┃ ┃ ┣ 📜accountModal.module.css
 ┃ ┃ ┃ ┣ 📜FindEmailModal.tsx
 ┃ ┃ ┃ ┗ 📜FindPasswordModal.tsx
 ┃ ┃ ┣ 📜page.module.css
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┃
 ┃ ┣ 📂myPage //마이페이지
 ┃ ┃ ┣ 📂(route)
 ┃ ┃ ┃ ┣ 📂deliveryTracking //주문/배송 조회
 ┃ ┃ ┃ ┃ ┣ 📂[id] //주문/배송 제품 정보
 ┃ ┃ ┃ ┃ ┃ ┣ 📜DetailPage.module.css
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📜deliveryTracking.module.css
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂myReview //상품 후기
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂serviceInquiry // 1:1 문의하기 게시판
 ┃ ┃ ┃ ┃ ┣ 📂[id] //문의 게시글
 ┃ ┃ ┃ ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜serviceinquiryDetail.module.css
 ┃ ┃ ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📜serviceInquiry.module.css
 ┃ ┃ ┃ ┣ 📂subscriptionManagement //구독/약정 관리
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┗ 📂userInfoManagement //회원정보관리
 ┃ ┃ ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📜UserInfoManagementPage.module.css
 ┃ ┃ ┣ 📜layout.module.css
 ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┃
 ┃ ┣ 📂package //패키지
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂products //제품
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜Item.module.css
 ┃ ┃ ┃ ┗ 📜Item.tsx
 ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┗ 📜productsPage.module.css
 ┃ ┣ 📂rental //렌탈
 ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┗ 📜rental.module.css
 ┃ ┣ 📂signup //회원가입
 ┃ ┃ ┣ 📜page.module.css
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┗ 📂subscription //서비스구독
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┃
 ┣ 📂_components // 공통 컴포넌트 (푸터, 인풋, 메인헤더네비바, 사이드네비바)
 ┃ ┣ 📜Footer.module.css
 ┃ ┣ 📜Footer.tsx
 ┃ ┣ 📜InputContainer.module.css
 ┃ ┣ 📜InputContainer.tsx
 ┃ ┣ 📜Navbar.module.css
 ┃ ┣ 📜NavBar.tsx
 ┃ ┣ 📜SideNavBar.module.css
 ┃ ┗ 📜SideNavBar.tsx
 ┣ 📜favicon.ico
 ┣ 📜globals.css
 ┣ 📜layout.tsx
 ┣ 📜page.module.css
 ┗ 📜page.tsx // 사이트 진입 시 첫 랜딩 페이지
```

<br/>

### public 폴더 ( 폰트, 이미지 )

```tsx
📦public
 ┣ 📂fonts //폰트
 ┗ 📂imgs //이미지
   ┣ 📂bulkPurchase //대량구매
   ┣ 📂common //공통
   ┣ 📂home //홈
   ┣ 📂login //로그인
   ┣ 📂myPage //마이페이지
   ┗ 📂products //제품
```
