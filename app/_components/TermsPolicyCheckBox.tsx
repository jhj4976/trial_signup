"use client"
import React, { useCallback, useEffect, useState } from "react"
import styles from "./TermsPolicyCheckBox.module.css"

let dataLists: any = [
  { name: "(필수) 만 14세 이상입니다", id: "terms_old", link: '' },
  { name: "(필수) 서비스 이용약관", id: "terms_service", link: 'https://mapsea-navigation.super.site/terms-service' },
  { name: "(필수) 개인정보 수집 및 이용", id: "terms_privacy", link: 'https://mapsea-navigation.super.site/terms-privacy' },
  { name: "(필수) 전자해도 이용약관", id: "terms_electronic", link: 'https://mapsea-navigation.super.site/terms-chart' },
  {
    name: "(선택) 위치기반 서비스 이용약관",
    id: "terms_location",
    link: 'https://mapsea-navigation.super.site/terms-location'
  },
  {
    name: "(선택) 마케팅 정보 수신동의 - 이메일",
    id: "terms_marketing_email",
    link: 'https://mapsea-navigation.super.site/terms-marketing'
  },
  {
    name: "(선택) 마케팅 정보 수신동의 - SMS",
    id: "terms_marketing_sms",
    link: 'https://mapsea-navigation.super.site/terms-marketing'
  },
]

export default function TermsPolicyCheckBox({
  termsPolicyHandler,
  notice,
}: {
  termsPolicyHandler: any
  notice: any
}) {
  const [checkedList, setCheckedLists]: any = useState([])
  // 전체 체크 클릭
  useEffect(() => {
    termsPolicyHandler(checkedList)
  }, [checkedList])

  const onCheckedAll = useCallback(
    (checked: any) => {
      const checkedListArray: any = []
      if (checked) {
        dataLists.forEach((list: any) => checkedListArray.push(list))
        setCheckedLists(checkedListArray)
      } else {
        setCheckedLists(checkedListArray)
      }
    },
    [checkedList],
  )

  // 개별 체크 클릭
  const onCheckedElement = useCallback(
    (checked: any, list: any) => {
      if (checked) {
        setCheckedLists([...checkedList, list])
      } else {
        setCheckedLists(checkedList.filter((el: any) => el !== list))
      }
    },
    [checkedList],
  )

  return (
    <div className={styles.termsPolicyContainer}>
      <label className={styles.signupInputWrapper} htmlFor="allAgree">
        <input
          name="checkBox"
          className={styles.signupInput}
          id="allAgree"
          type="checkbox"
          onChange={(e) => onCheckedAll(e.target.checked)}
          checked={
            checkedList.length === 0
              ? false
              : checkedList.length === dataLists.length
                ? true
                : false
          }
        />
        <p className={styles.allAgreeText}>전체동의</p>
      </label>
      <p className={styles.agreeDesc}>선택 동의를 포함합니다</p>
      <>
        <div className={styles.termsPolicyWrapper}>
          {dataLists.map((list: any) => (
            <div className={styles.agreementBox} key={list.id}>
              <div className={styles.inputWrapper}>
                <input
                  name=""
                  id={list.id}
                  type="checkbox"
                  onChange={(e) => onCheckedElement(e.target.checked, list)}
                  checked={checkedList.includes(list) ? true : false}
                />
                <label htmlFor={list.id} className={styles.title}>
                  {list.name}
                </label>
              </div>
              {!(list.id === 'terms_old') &&
                <span className={styles.blueText} onClick={() => window.open(list.link)}>내용보기</span>
              }
            </div>
          ))}
        </div>
        {!notice && <p className={styles.notice}>필수 약관에 동의해주세요</p>}
      </>
    </div>
  )
}
