import Image from "next/image"
import styles from "./InputContainer.module.css"
import eyeClosed_img from "/public/imgs/login/eyeClosed.svg"
import eyeOpened_img from "/public/imgs/login/eyeOpened.svg"

export default function InputContainer(props: any) {
  const {
    type, // (필수) text/number/file ... input 타입
    name, // (필수) 해당 input value 가져올 때 필수(폼 전송 시 name으로 DOM 조작)
    isShow, // (필수) input태그 안에 눈 icon조작으로 패스워드 보이기/숨기기 -> 패스워드 숨기기 = '0' / 보이기 = '1'
    isIcon, // (필수) input 태그 눈 icon 생성 : 1 / 삭제 : 0
    title, // (선택) input태그 위 input 이름
    placeholder, // (선택) input태그 안 예시/설명 텍스트
    errorText, // (선택) input태그 밑에 추가 설명 or 에러 메세지
    value, // input 값
    onChange, // input 변경값 동적 변경
    onBlur, // input 필드 방문 상태 관리
    visibilityHandler, // 눈 표시 보이기/숨기기 핸들러
    disabled,
  } = props

  return (
    <div className={styles.inputContainer}>
      <p className={styles.title}>{title}</p>
      <div className={styles.inputWrapper}>
        <input
          placeholder={placeholder}
          type={type}
          name={name}
          className={styles.input}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
        />
        {isIcon === "1" &&
          (isShow === "1" ? (
            <Image
              className={styles.eyeOpenImg}
              alt="eyeOpened_img"
              src={eyeOpened_img}
              onClick={visibilityHandler}
            />
          ) : (
            <Image
              className={styles.eyeClosedImg}
              alt="eyeClosed_img"
              src={eyeClosed_img}
              onClick={visibilityHandler}
            />
          ))}
      </div>
      <p className={styles.notice}>{errorText}</p>
    </div>
  )
}
