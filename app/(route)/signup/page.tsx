"use client"

import styles from "./page.module.css"
import { useEffect, useState } from "react"
import InputContainer from "../../_components/InputContainer"
import TermsPolicyCheckBox from "@/app/_components/TermsPolicyCheckBox"
import NiceApiInstance from "@/app/core/api/nice"
import { INiceApiTokenResult } from "@/app/core/interface/INiceApi.interface"
import { NICE_API_TYPE_ENUM } from "@/app/core/enum/niceApi.enum"
import { validationCheck } from "@/app/utils/validationCheck"
import { businessSignup, userSignup } from "@/app/service/signup"
import { businessVerification } from "@/app/service/businessVerification"
import AuthModal from "@/app/_components/AuthModal"
import { SSO_USER_TYPE } from "@/app/core/enum/sso.enum"

export default function SignupPage() {
  const [commonModal, setCommonModal] = useState<boolean>(false)
  const [termsPolicy, setTermsPolicy]: any = useState([])
  const [termsPolicyValid, setTermsPolicyValid] = useState(true)
  const [isBusinessVerified, setIsBusinessVerified] = useState<boolean>(false)
  const NiceApi = new NiceApiInstance()
  const [niceName, setNiceName] = useState<string>("")
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [tokenVersionId, setTokenVersionId] = useState<string>("")
  const [popup, setPopup] = useState<Window | null>()
  const [niceToken, setNiceToken] = useState<INiceApiTokenResult>({
    enc_data: "",
    integrity_value: "",
    token_version_id: "",
  })
  // type - true : 개인 / false : 기업
  const [userType, setUserType] = useState(true)
  const userTypeToggleHandler = (e: any) => {
    let type: boolean = e.target.id === "INDIVIDUAL" ? true : false
    setUserType(type)
  }

  // 비밀번호 show/hide
  const [pwIsVisible, setPwIsVisible] = useState(false) //비밀번호
  const [pwcIsVisible, setPwcIsVisible] = useState(false) //비밀번호 확인

  // input상태관리 - 휴대폰번호, 담당자명은 따로 관리
  const [values, setValues] = useState<{ [key: string]: string }>({
    email: "",
    password: "",
    passwordConfirm: "",
    businessNumber: "",
    businessStartDate: "",
    businessCEOName: "",
    businessName: "",
  })

  // input값 변경
  const handleChange = (e: any) => {
    if (
      e.target.name === "businessNumber" ||
      e.target.name === "businessStartDate" ||
      e.target.name === "businessCEOName" ||
      e.target.name === "businessName"
    ) {
      // 사업자 인증 후에 input필드 입력시 버튼 다시 활성화,
      setIsBusinessVerified(false)
    }
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
    setErrors({
      ...errors,
      [e.target.name]: "",
    })
  }

  // blur 이벤트
  const handleBlur = (e: any) => {
    let target = e.target
    let errorText = ""
    if (target.value === "") {
      switch (target.name) {
        case "email":
          errorText = "이메일을 입력해주세요."
          break
        case "password":
          errorText = "비밀번호를 입력해주세요."
          break
        case "passwordConfirm":
          errorText = "비밀번호가 일치하지 않습니다."
          break
        case "businessNumber":
          errorText = "사업자등록번호를 입력해주세요."
          break
        case "businessStartDate":
          errorText = "개업일자를 입력해주세요."
          break
        case "businessCEOName":
          errorText = "대표자명을 입력해주세요."
          break
        case "businessName":
          errorText = "기업명을 입력해주세요."
          break
        default:
          break
      }
      // 미입력 시 input필드 아래에 에러 던지기
      setErrors({
        ...errors,
        [target.name]: errorText,
      })
    }
  }

  // 에러 메세지 초기화
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
    name: "",
    termsPolicy: "",
    businessNumber: "",
    businessName: "",
    businessStartDate: "",
    businessCEOName: "",
  })

  // 약관 동의
  const termsPolicyHandler = (data: any) => {
    // 약관동의 값 초기화
    let termsInitialData: { [key: string]: boolean } = {
      terms_old: false,
      terms_service: false,
      terms_privacy: false,
      terms_electronic: false,
      terms_location: false,
      terms_marketing_email: false,
      terms_marketing_sms: false,
    }
    data.forEach((item: any) => {
      if (termsInitialData.hasOwnProperty(item.id)) {
        termsInitialData[item.id] = true
      }
    })
    setTermsPolicy(termsInitialData)
  }

  //사업자등록번호 인증
  const businessVerificationHandler = async () => {
    const isValid = await businessVerification(
      values.businessNumber,
      values.businessStartDate,
      values.businessCEOName,
      values.businessName,
    )
    if (!isValid) {
      setErrors({
        ...errors,
        businessNumber: "사업자등록번호를 입력해주세요",
        businessCEOName: "사업자등록번호를 입력해주세요",
        businessStartDate: "사업자등록번호를 입력해주세요",
        businessName: "사업자등록번호를 다시 확인해주세요",
      })
    } else {
      setErrors({
        ...errors,
        businessNumber: "",
        businessCEOName: "",
        businessStartDate: "",
        businessName: "",
      })
    }
    setIsBusinessVerified(isValid)
  }

  // 가입하기 버튼
  const submitHandler = async (e: any) => {
    e.preventDefault()
    const email: string = values.email || ""
    const password: string = values.password || ""
    const passwordConfirm: string = values.passwordConfirm || ""
    const name: string = niceName || ""
    const businessNumber: string = values.businessNumber || ""
    const businessStartDate: string = values.businessStartDate || ""
    const businessCEOName: string = values.businessCEOName || ""
    const businessName: string = values.businessName || ""

    // 기업회원일 때에만 추가 검사
    if (!userType) {
      // 사업자인증유효성 검사
      if (
        !businessNumber ||
        !businessStartDate ||
        !businessCEOName ||
        !businessName ||
        !isBusinessVerified
      ) {
        setErrors({
          ...errors,
          businessNumber: "사업자등록번호를 입력해주세요",
          businessCEOName: "사업자등록번호를 입력해주세요",
          businessStartDate: "사업자등록번호를 입력해주세요",
          businessName: "기업명을 입력해주세요",
        })
        return
      }
    }

    // 이메일 유효성 검사
    let isValidEmail = validationCheck("email", email)
    if (!isValidEmail) {
      // 이메일이 유효하지 않을 때
      setErrors({
        ...errors,
        email: "비밀번호 형식이 유효하지 않습니다.",
      })
      return
    }

    // 비밀번호 유효성 검사
    let isValidPassword = validationCheck("password", password)
    if (!isValidPassword) {
      // 비밀번호가 유효하지 않을 때
      setErrors({
        ...errors,
        password: "비밀번호 형식이 유효하지 않습니다.",
      })
      return
    } else {
      if (password != passwordConfirm) {
        // 유효한 비밀번호지만 비밀번호 재확인과 다를 때
        setErrors({
          ...errors,
          passwordConfirm: "비밀번호가 일치하지 않습니다.",
        })
        return
      }
    }

    // 휴대폰번호 본인인증 안했을 때
    if (niceName === "") {
      setErrors({
        ...errors,
        phoneNumber: "연락처 인증을 해주세요.",
      })
      return
    }

    // 약관동의 필수 선택 유효성 검사
    if (
      !termsPolicy.terms_old ||
      !termsPolicy.terms_privacy ||
      !termsPolicy.terms_electronic ||
      !termsPolicy.terms_service
    ) {
      // (필수) 전부 선택 안하면 에러 보여주기
      setTermsPolicyValid(false)
      return
    }

    // 약관동의 체크한 사항은 'Y', 아니면 'N'로 변경 작업
    for (let unit in termsPolicy) {
      if (termsPolicy[`${unit}`] === true) {
        termsPolicy[`${unit}`] = "Y"
      } else {
        termsPolicy[`${unit}`] = "N"
      }
    }

    // 가입하기
    if (userType) {
      // (최종)개인 회원가입 데이터
      const userData = {
        token_version_id: tokenVersionId,
        email,
        password,
        name,
        ...termsPolicy,
      }
      const getUserResult = await userSignup(userData)
      // 성공/실패 팝업창 옵션 설정
      setIsSuccess(getUserResult)
    } else if (!userType) {
      // (최종)기업 회원가입 데이터
      const businessData = {
        token_version_id: tokenVersionId,
        business_name: businessName,
        business_number: businessNumber,
        business_start_at: businessStartDate,
        representative_name: businessCEOName,
        email,
        password,
        name,
        ...termsPolicy,
      }
      const getBusinessResult = await businessSignup(businessData)
      setIsSuccess(getBusinessResult)
    }
    // 성공/실패 팝업창 열기
    setCommonModal(true)
  }

  const redirectHandler = () => {
    const form = document.forms.namedItem("nice_form")
    if (form) {
      niceApiPopupOpenHandler(form)
      setNiceToken({ enc_data: "", integrity_value: "", token_version_id: "" })
      setTokenVersionId(niceToken.token_version_id)
    }
  }

  useEffect(() => {
    // 제일 처음 나이스 API 토큰 가져오기
    getNiceApiEncryptedDataHandler()
    window.addEventListener("message", receiveMessageEvent, false)
    return () => {
      window.removeEventListener("message", receiveMessageEvent, false)
    }
  }, [])

  useEffect(() => {
    const popupCloseEvent = setInterval(() => {
      if (popup?.closed) {
        getNiceApiEncryptedDataHandler()
        setPopup(null)
      }
    }, 1000)
    return () => clearInterval(popupCloseEvent)
  }, [popup, niceToken])

  const receiveMessageEvent = (event: MessageEvent) => {
    const getMessage = event.data
    const origin = event.origin
    if (typeof getMessage === "string") {
      const data = JSON.parse(getMessage)
      // 이미 가입한 계정일 때
      if (data.pathname === "/fail") {
        console.log("it failed")
        setCommonModal(true)
        return
      }
      const { name } = data
      setNiceName(name)
    }
  }

  const getNiceApiEncryptedDataHandler = async () => {
    try {
      const getPassEncryptedDataParam = {
        userType: userType ? SSO_USER_TYPE.COMPANY : SSO_USER_TYPE.USER,
        reqType: NICE_API_TYPE_ENUM.SIGNUP,
      }
      const { enc_data, integrity_value, token_version_id } =
        await NiceApi.getPassEncryptedData(getPassEncryptedDataParam)
      setNiceToken({ enc_data, integrity_value, token_version_id })
    } catch (error) {
      console.error("getNiceApiEncryptedDataHandler Error : ", error)
    }
  }

  const niceApiPopupOpenHandler = (form: HTMLFormElement) => {
    const left = window.innerWidth / 2 - 500 / 2
    const top = window.innerHeight / 2 - 800 / 2
    const option = `status=no, menubar=no, toolbar=no, resizable=no, width=500, height=600, left=${left}, top=${top}`
    const popup = window.open("", "nicePopup", option)
    if (popup) {
      form.action = "https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb"
      form.target = "nicePopup"
      form.m.value = "service"
      form.token_version_id.value = niceToken.token_version_id
      form.enc_data.value = niceToken.enc_data
      form.integrity_value.value = niceToken.integrity_value
      form.submit()
      setPopup(popup)
    }
  }

  return (
    <div className={styles.signupContainer}>
      {/* 모달 */}
      {commonModal && (
        <AuthModal
          closeModalHandler={setCommonModal}
          userType={userType}
          isSuccess={isSuccess} //추가
          userEmail={""} //추가
          userName={""} //추가
          modalType={"SIGNUP"}
        />
      )}
      {/* input 필드 */}
      <form className={styles.signupWrapper}>
        <p className={styles.signupTitle}>회원가입</p>
        <div
          className={styles.loginTypeBtn}
          onClick={(e) => {
            userTypeToggleHandler(e)
          }}>
          <div
            id="INDIVIDUAL"
            className={`${styles.individual} ${userType && styles.isActive}`}>
            개인회원
          </div>
          <div
            id="BUSINESS"
            className={`${styles.business} ${!userType && styles.isActive}`}>
            기업회원
          </div>
        </div>
        {
          // 기업회원
          !userType && (
            <div className={styles.businessRegistraionContainer}>
              <InputContainer
                value={values.businessNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.businessNumber}
                title="사업자등록번호"
                placeholder="사업자등록번호를 입력해주세요 (숫자만입력)"
                type="number"
                name="businessNumber"
                notice=""
              />
              <InputContainer
                value={values.businessStartDate}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.businessStartDate}
                title="개업일자"
                placeholder="YYYY.MM.DD"
                type="text"
                name="businessStartDate"
                notice=""
              />
              <InputContainer
                value={values.businessCEOName}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.businessCEOName}
                title="대표자명"
                placeholder="대표자 성명을 입력해주세요"
                type="text"
                name="businessCEOName"
                notice=""
              />
              <InputContainer
                value={values.businessName}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.businessName}
                title="기업명"
                placeholder="기업명을 입력해주세요"
                type="text"
                name="businessName"
                notice=""
              />
              <div className={styles.phoneVerificationWrapper}>
                <button
                  className={`${styles.phoneVerificationButton} ${
                    isBusinessVerified ? styles.disabled : ""
                  }`}
                  onClick={businessVerificationHandler}
                  type="button"
                  disabled={isBusinessVerified}>
                  {isBusinessVerified ? "인증완료" : "인증"}
                </button>
                <p className={styles.notice}> </p>
              </div>
            </div>
          )
        }
        {/* 개인회원 */}
        <div className={styles.idPasswordContainer}>
          <InputContainer
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            errorText={errors.email}
            title="이메일"
            placeholder="email@mapsea.com"
            type="email"
            name="email"
            notice=""
          />
          <InputContainer
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            errorText={errors.password}
            title="비밀번호"
            placeholder="8~20자의 영문자, 숫자, 특수문자를 입력해주세요"
            type={pwIsVisible ? "text" : "password"}
            name="password"
            notice="8~20자의 영문자, 숫자, 특수문자를 입력해주세요"
            isIcon="1"
            isShow={pwIsVisible ? "1" : "0"}
            visibilityHandler={() => setPwIsVisible(!pwIsVisible)}
          />
          <InputContainer
            value={values.passwordConfirm}
            onChange={handleChange}
            onBlur={handleBlur}
            errorText={errors.passwordConfirm}
            title="비밀번호 재확인"
            placeholder="비밀번호를 한번 더 입력해주세요"
            type={pwcIsVisible ? "text" : "password"}
            name="passwordConfirm"
            notice=""
            isIcon="1"
            isShow={pwcIsVisible ? "1" : "0"}
            visibilityHandler={() => setPwcIsVisible(!pwcIsVisible)}
          />
        </div>
        {niceName ? (
          <div className={styles.phoneVerificationWrapper}>
            <p className={styles.title}>
              {userType ? "연락처" : "담당자 휴대폰번호"}
            </p>
            <div className={styles.phoneNumberWrapper}>
              <input
                className={styles.phoneNumber}
                value="01073248696"
                onClick={redirectHandler}
                type="number"
                disabled
              />
              <button
                className={styles.verificationBtn}
                type="button"
                onClick={redirectHandler}>
                재인증
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.phoneVerificationWrapper}>
            <p className={styles.title}>
              {userType ? "연락처" : "담당자 휴대폰번호"}
            </p>
            <button
              className={styles.phoneVerificationButton}
              onClick={redirectHandler}
              type="button">
              휴대폰번호로 본인인증
            </button>
            <p className={styles.notice}>{errors.phoneNumber} </p>
          </div>
        )}
        <InputContainer
          value={niceName}
          errorText={errors.name}
          title={userType ? "이름" : "담당자명"}
          placeholder="본인인증 시 자동 입력됩니다"
          type="text"
          name="name"
          notice="본인인증 시 자동 입력됩니다"
          disabled={true}
        />
        {/* 약관동의 */}
        <TermsPolicyCheckBox
          termsPolicyHandler={termsPolicyHandler}
          notice={termsPolicyValid}
        />
        <button className={styles.submitBtn} onClick={submitHandler}>
          가입하기
        </button>
      </form>
      {/* nice api용 */}
      <form name="nice_form" id="form">
        <input type="hidden" id="m" name="m" />
        <input type="hidden" id="token_version_id" name="token_version_id" />
        <input type="hidden" id="enc_data" name="enc_data" />
        <input type="hidden" id="integrity_value" name="integrity_value" />
      </form>
    </div>
  )
}
