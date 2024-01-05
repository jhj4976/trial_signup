"use client"
import React, { useState } from "react"
import styles from "./Footer.module.css"
import Image from "next/image"
import brandLogo_black_2560 from "/public/imgs/home/brandLogo_black_2560.svg"
import brandLogo_black_720 from "/public/imgs/home/brandLogo_black_720.svg"
import downArrow_gray from "/public/imgs/common/downArrow_gray.svg"

export default function Footer() {
  const [showFooter, setShowFooter] = useState(false)

  return (
    <div className={styles.footerSection}>
      <div className={styles.footerContainer}>
        <div className={styles.topWrapper}>
          <div className={styles.top}>
            <p onClick={() => { window.open('https://mapsea-navigation.super.site/terms-service') }}>이용약관</p>
            <p onClick={() => { window.open('https://mapsea-navigation.super.site/terms-privacy') }}>개인정보처리방침</p>
            <p onClick={() => { window.open('https://mapsea-navigation.super.site/terms-location') }}>위치기반 서비스 이용약관</p>
            <p onClick={() => { window.open('https://mapsea-navigation.super.site/terms-chart') }}>전자해도 이용약관</p>
            {/* <p className={styles.footerCustomerService}>고객지원</p> */}
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.companyInfo}>
            <p>(주)맵시</p>
            <p>대표자:김지수</p>
            <p>사업자등록번호:459-81-01817</p>
            <p>통신판매업신고:제2022-부산해운대-0567호</p>
          </div>
          <p className={styles.mb20}>
            고객지원 : 070-4469-0213~4 (평일 09:00-18:00, 점심시간 12:00-13:00,
            주말·공휴일 휴무)
          </p>
          <p>본사 : 부산광역시 해운대구 센텀동로 45, 1층(우동,(주)웹스)</p>
          <p className={styles.maxWidth}>
            기업부설연구소 : 서울특별시 관악구 호암로24길 6 서울대 캠퍼스타운
            창업 HERE-RO 5 4층 401,402호 ⓒ 2023. MAPSEA Corp. all rights
            reserved.
          </p>
        </div>
      </div>

      {/* 모바일 전용 푸터 */}
      <div className={styles.mobileFooter}>
        <div
          className={styles.imgWrapper}
          onClick={() => setShowFooter(!showFooter)}>
          <Image
            className={styles.logo}
            alt="Mapsea Logo"
            src={brandLogo_black_2560}
          />
          <Image
            className={styles.logo_360}
            alt="Mapsea Logo"
            src={brandLogo_black_720}
          />
          <Image alt="downArrow" src={downArrow_gray} />
        </div>
        {showFooter && (
          <div className={styles.textWrapper}>
            <div className={styles.row}>
              <p className={styles.col_1}>대표</p>
              <p className={styles.col_2}>김지수</p>
            </div>
            <div className={styles.row}>
              <p className={styles.col_1}>사업정보</p>
              <p className={styles.col_2}>
                사업자등록 번호 459-81-01817 <br /> 통신판매업신고 제
                2022-부산해운대-0567 호
              </p>
            </div>
            <div className={styles.row}>
              <p className={styles.col_1}>고객지원</p>
              <p className={styles.col_2}>
                070-4469-0213 ~4 (평일 09:00 - 18:00, 점심시간 12:00 - 13:00,
                주말·공휴일 휴무)
              </p>
            </div>
            <div className={styles.row}>
              <p className={styles.col_1}>주소</p>
              <p className={styles.col_2}>
                서울특별시 관악구 호암로24길 6 서울대 캠퍼스타운 창업 HERE-RO 5
                4층 401,402호 (기업부설 연구소)
              </p>
            </div>
          </div>
        )}
        <div className={styles.termsPolicyWrapper}>
          <div className={styles.dividerWrapper}>
            <p onClick={() => { window.open('https://mapsea-navigation.super.site/terms-service') }}>이용약관</p>
            <div className={styles.divider}></div>
            <p onClick={() => { window.open('https://mapsea-navigation.super.site/terms-privacy') }}>개인정보처리방침</p>
            <div className={styles.divider}></div>
            <p onClick={() => { window.open('https://mapsea-navigation.super.site/terms-location') }}>위치기반 서비스 이용약관</p>
            <p onClick={() => { window.open('https://mapsea-navigation.super.site/terms-chart') }}>전자해도 이용약관</p>
            {/* <div className={styles.divider}></div> */}
            {/* <p onClick={() => window.open('')}>고객지원</p> */}
          </div>
          <div className={styles.copyrightWrapper}>
            <p>ⓒ 2023. MAPSEA Corp. all rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
